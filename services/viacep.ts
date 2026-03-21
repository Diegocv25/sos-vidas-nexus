import { onlyDigits } from '@/services/validators';

export type ViaCepResponse = {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
};

export async function fetchAddressByCep(cep: string): Promise<ViaCepResponse> {
  const clean = onlyDigits(cep);
  const resp = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
  if (!resp.ok) throw new Error('Falha ao consultar ViaCEP');
  const data = (await resp.json()) as ViaCepResponse;
  if (data.erro) throw new Error('CEP não encontrado');
  return data;
}
