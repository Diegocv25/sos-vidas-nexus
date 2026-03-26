import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

type Payload = {
  latitude?: number;
  longitude?: number;
  type?: string;
  keyword?: string;
  strategy?: "nearby" | "textsearch";
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const apiKey = Deno.env.get("GOOGLE_MAPAS_SOS_API_KEY");
  if (!apiKey) return json({ error: "Missing GOOGLE_MAPAS_SOS_API_KEY" }, 500);

  const body = await req.json().catch(() => null) as Payload | null;
  if (!body) return json({ error: "Invalid JSON body" }, 400);

  const latitude = Number(body.latitude);
  const longitude = Number(body.longitude);
  const type = body.type?.trim();
  const keyword = body.keyword?.trim();
  const strategy = body.strategy ?? "nearby";

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return json({ error: "Latitude/longitude inválidas" }, 400);
  }

  const url = new URL(
    strategy === "textsearch"
      ? "https://maps.googleapis.com/maps/api/place/textsearch/json"
      : "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
  );

  if (strategy === "textsearch") {
    url.searchParams.set("location", `${latitude},${longitude}`);
    url.searchParams.set("radius", "70000");
    url.searchParams.set("query", keyword || type || "hospital público");
  } else {
    url.searchParams.set("location", `${latitude},${longitude}`);
    url.searchParams.set("rankby", "distance");
    if (type) url.searchParams.set("type", type);
    if (keyword) url.searchParams.set("keyword", keyword);
  }

  url.searchParams.set("key", apiKey);

  const resp = await fetch(url.toString());
  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) return json({ error: "Falha ao consultar Google Places", detail: data }, 502);
  if (data.status && data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    return json({ error: "Google Places retornou erro", detail: data }, 502);
  }

  const baseResults = (data.results ?? []).slice(0, 15);
  const results = await Promise.all(baseResults.map(async (item: any) => {
    const lat = item.geometry?.location?.lat ?? latitude;
    const lng = item.geometry?.location?.lng ?? longitude;
    const address = item.vicinity ?? item.formatted_address ?? "Endereço não disponível";
    let phone = undefined;

    try {
      if (item.place_id) {
        const detailsUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json");
        detailsUrl.searchParams.set("place_id", item.place_id);
        detailsUrl.searchParams.set("fields", "formatted_phone_number");
        detailsUrl.searchParams.set("key", apiKey);
        const detailsResp = await fetch(detailsUrl.toString());
        const details = await detailsResp.json().catch(() => ({}));
        phone = details?.result?.formatted_phone_number;
      }
    } catch {
      phone = undefined;
    }

    return {
      id: item.place_id,
      name: item.name,
      address,
      distanceKm: Number(distanceKm(latitude, longitude, lat, lng).toFixed(1)),
      mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item.name} ${address}`)}`,
      phone,
    };
  }));

  let filtered = results;
  if ((keyword || '').toLowerCase().includes('unidade de pronto atendimento upa 24h')) {
    filtered = results.filter((item: any) => {
      const name = String(item.name || '').toLowerCase();
      return name.includes('upa') || name.includes('unidade de pronto atendimento');
    });
  }

  if ((keyword || '').toLowerCase().includes('hospital público aberto 24 horas')) {
    filtered = results.filter((item: any) => {
      const name = String(item.name || '').toLowerCase();
      return name.includes('hospital');
    });
  }

  if (
    (keyword || '').toLowerCase().includes('centro de saúde') ||
    (keyword || '').toLowerCase().includes('ubs') ||
    (keyword || '').toLowerCase().includes('unidade básica de saúde')
  ) {
    filtered = results.filter((item: any) => {
      const name = String(item.name || '').toLowerCase();
      return name.includes('ubs') || name.includes('unidade básica de saúde') || name.includes('centro de saúde');
    });
  }

  if ((keyword || '').toLowerCase().includes('clínica hospitalar') || (keyword || '').toLowerCase().includes('clinica hospitalar')) {
    filtered = results.filter((item: any) => {
      const name = String(item.name || '').toLowerCase();
      return name.includes('clinica') || name.includes('clínica');
    });
  }

  if ((keyword || '').toLowerCase().includes('veterinária') || (keyword || '').toLowerCase().includes('veterinaria')) {
    filtered = results.filter((item: any) => {
      const name = String(item.name || '').toLowerCase();
      return name.includes('veterinári') || name.includes('veterinari');
    });
  }

  if ((keyword || '').toLowerCase().includes('maternidade')) {
    filtered = results.filter((item: any) => {
      const name = String(item.name || '').toLowerCase();
      return name.includes('maternidade');
    });
  }

  if ((keyword || '').toLowerCase().includes('borracharia')) {
    filtered = results.filter((item: any) => String(item.name || '').toLowerCase().includes('borracharia'));
  }

  if ((keyword || '').toLowerCase().includes('pedágios') || (keyword || '').toLowerCase().includes('pedagios')) {
    filtered = results.filter((item: any) => {
      const name = String(item.name || '').toLowerCase();
      return name.includes('pedágio') || name.includes('pedagio');
    });
  }

  if ((keyword || '').toLowerCase().includes('posto de gasolina')) {
    filtered = results.filter((item: any) => {
      const name = String(item.name || '').toLowerCase();
      return name.includes('posto') || name.includes('gasolina') || name.includes('combust');
    });
  }

  if ((keyword || '').toLowerCase().includes('mecânica automotiva') || (keyword || '').toLowerCase().includes('mecanica automotiva')) {
    filtered = results.filter((item: any) => {
      const name = String(item.name || '').toLowerCase();
      return name.includes('mecânic') || name.includes('mecanic') || name.includes('auto center') || name.includes('auto elétrica') || name.includes('auto eletrica');
    });
  }

  if ((keyword || '').toLowerCase().includes('mecânica de moto') || (keyword || '').toLowerCase().includes('mecanica de moto')) {
    filtered = results.filter((item: any) => {
      const name = String(item.name || '').toLowerCase();
      return name.includes('moto') || name.includes('motocic');
    });
  }

  if ((keyword || '').toLowerCase().includes('guincho')) {
    filtered = results.filter((item: any) => String(item.name || '').toLowerCase().includes('guincho'));
  }

  return json({ results: filtered.sort((a: any, b: any) => a.distanceKm - b.distanceKm) });
});
