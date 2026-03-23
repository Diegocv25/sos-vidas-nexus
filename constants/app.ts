export const APP_NAME = 'SOS Vidas (Nexus Automação)';
export const APP_PRICE_LABEL = 'R$ 5,00 bimestral';
export const APP_BASE_URL = process.env.EXPO_PUBLIC_APP_BASE_URL ?? 'http://31.97.82.110:8090';
export const APP_LOGIN_REDIRECT_URL = `${APP_BASE_URL}/?screen=login`;
export const APP_RESET_REDIRECT_URL = `${APP_BASE_URL}/?screen=reset-password`;
export const KIWIFY_CHECKOUT_URL = process.env.EXPO_PUBLIC_KIWIFY_CHECKOUT_URL ?? '';

export const PAYMENT_BENEFITS = [
  'Mapas dos 10 locais de socorro mais próximos',
  'Números diretos de todas as emergências',
  'Primeiros socorros e orientações para pedir socorro',
];

export const EMERGENCY_DISCLAIMER = 'Este app organiza atalhos e conteúdos oficiais. Em emergências, ligue 192 (SAMU) ou 193 (Bombeiros). Não substitui avaliação, diagnóstico ou atendimento profissional.';

export const APP_SUPPORT_TEXT = 'SOS Vidas (Nexus Automação) foi criado para facilitar acesso rápido a conteúdo oficial, números de emergência e unidades de atendimento próximas.';
