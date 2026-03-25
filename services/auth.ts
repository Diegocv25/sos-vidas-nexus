import { APP_RESET_REDIRECT_URL } from '@/constants/app';
import { getSupabase } from '@/services/supabase';

type SignUpPayload = {
  nome_completo: string;
  cpf: string;
  email: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  senha: string;
};

export async function signUpWithProfile(payload: SignUpPayload) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.senha,
    options: {
      data: {
        nome_completo: payload.nome_completo,
        cpf: payload.cpf,
        email: payload.email,
        cep: payload.cep,
        logradouro: payload.logradouro,
        numero: payload.numero,
        bairro: payload.bairro,
        cidade: payload.cidade,
        estado: payload.estado,
        is_subscribed: false,
        subscription_status: 'pending',
      },
      emailRedirectTo: undefined,
    },
  });

  if (error) throw error;
  if (!data.user?.id) throw new Error('Usuário não criado');

  return data;
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function getOwnProfile(userId: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) throw error;
  return data;
}

export async function verifyEmailCode(email: string, token: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.verifyOtp({
    email: email.trim().toLowerCase(),
    token: token.trim(),
    type: 'signup',
  });
  if (error) throw error;
  return data;
}

export async function resendSignupCode(email: string) {
  const supabase = getSupabase();
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email.trim().toLowerCase(),
  });
  if (error) throw error;
}

export async function resetPasswordForEmail(email: string) {
  const supabase = getSupabase();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: APP_RESET_REDIRECT_URL,
  });
  if (error) throw error;
}

export async function verifyResetCode(email: string, token: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.verifyOtp({
    email: email.trim().toLowerCase(),
    token: token.trim(),
    type: 'recovery',
  });
  if (error) throw error;
  return data;
}
