export type FirstAidTopic = {
  id: string;
  label: string;
  emoji: string;
  url: string;
  emergencyNumber: '192' | '193';
};

export const FIRST_AID_GENERAL_URL = 'https://bvsms.saude.gov.br/primeiros-socorros/';

export const FIRST_AID_TOPICS: FirstAidTopic[] = [
  { id: 'queimadura', label: 'Queimadura', emoji: '🔥', url: 'https://bvsms.saude.gov.br/queimaduras/', emergencyNumber: '192' },
  { id: 'engasgo', label: 'Engasgo', emoji: '😮', url: 'https://bvsms.saude.gov.br/engasgo/', emergencyNumber: '192' },
  { id: 'afogamento', label: 'Afogamento', emoji: '🌊', url: 'https://bvsms.saude.gov.br/acidentes-por-afogamento/', emergencyNumber: '193' },
  { id: 'infarto', label: 'Infarto', emoji: '❤️', url: 'https://bvsms.saude.gov.br/infarto-agudo-do-miocardio/', emergencyNumber: '192' },
  { id: 'avc', label: 'AVC', emoji: '🧠', url: 'https://bvsms.saude.gov.br/acidente-vascular-cerebral-avc/', emergencyNumber: '192' },
  { id: 'choque-eletrico', label: 'Choque Elétrico', emoji: '⚡', url: 'https://bvsms.saude.gov.br/choque-eletrico/', emergencyNumber: '193' },
  { id: 'sangramento', label: 'Sangramento', emoji: '🩸', url: 'https://bvsms.saude.gov.br/hemorragia/', emergencyNumber: '192' },
  { id: 'desmaio', label: 'Desmaio', emoji: '😵', url: 'https://bvsms.saude.gov.br/desmaio-sincope/', emergencyNumber: '192' },
  { id: 'intoxicacao', label: 'Intoxicação', emoji: '💊', url: 'https://bvsms.saude.gov.br/intoxicacao/', emergencyNumber: '192' },
  { id: 'picada', label: 'Picada', emoji: '🐍', url: 'https://bvsms.saude.gov.br/animais-peconhentos/', emergencyNumber: '192' },
  { id: 'fratura', label: 'Fratura', emoji: '🦴', url: 'https://bvsms.saude.gov.br/fraturas/', emergencyNumber: '192' },
  { id: 'convulsao', label: 'Convulsão', emoji: '😨', url: 'https://bvsms.saude.gov.br/convulsao/', emergencyNumber: '192' },
  { id: 'crianca', label: 'Acidente Criança', emoji: '👶', url: 'https://bvsms.saude.gov.br/acidentes-na-infancia/', emergencyNumber: '192' },
  { id: 'idoso', label: 'Queda Idoso', emoji: '👴', url: 'https://bvsms.saude.gov.br/quedas-de-idosos/', emergencyNumber: '192' },
  { id: 'alergica', label: 'Reação Alérgica', emoji: '😰', url: 'https://bvsms.saude.gov.br/alergia/', emergencyNumber: '192' },
  { id: 'parada-cardiaca', label: 'Parada Cardíaca', emoji: '🫀', url: 'https://bvsms.saude.gov.br/ressuscitacao-cardiopulmonar-rcp/', emergencyNumber: '192' },
  { id: 'febre', label: 'Febre Alta', emoji: '🤒', url: 'https://bvsms.saude.gov.br/febre/', emergencyNumber: '192' },
  { id: 'outros', label: 'Outros', emoji: '🩺', url: FIRST_AID_GENERAL_URL, emergencyNumber: '192' },
];
