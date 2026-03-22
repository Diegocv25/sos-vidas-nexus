export type FirstAidTopic = {
  id: string;
  label: string;
  emoji: string;
  url: string;
  emergencyNumber: '192' | '193';
  group: 'respiracao' | 'trauma' | 'clinico' | 'toxico' | 'outros';
  note?: string;
};

export const FIRST_AID_GENERAL_URL = 'https://bvsms.saude.gov.br/primeiros-socorros/';

export const FIRST_AID_TOPICS: FirstAidTopic[] = [
  { id: 'engasgo', label: 'Engasgo', emoji: '😮', url: 'https://bvsms.saude.gov.br/engasgo/', emergencyNumber: '192', group: 'respiracao' },
  { id: 'afogamento', label: 'Afogamento', emoji: '🌊', url: 'https://bvsms.saude.gov.br/acidentes-por-afogamento/', emergencyNumber: '193', group: 'respiracao' },
  { id: 'convulsao', label: 'Convulsão', emoji: '😨', url: 'https://bvsms.saude.gov.br/convulsao/', emergencyNumber: '192', group: 'clinico' },
  { id: 'avc', label: 'AVC', emoji: '🧠', url: 'https://bvsms.saude.gov.br/avc-acidente-vascular-cerebral/', emergencyNumber: '192', group: 'clinico' },
  { id: 'choque-anafilatico', label: 'Choque Anafilático', emoji: '😰', url: 'https://bvsms.saude.gov.br/choque-anafilatico/', emergencyNumber: '192', group: 'clinico' },
  { id: 'queimadura', label: 'Queimadura', emoji: '🔥', url: 'https://bvsms.saude.gov.br/queimaduras/', emergencyNumber: '192', group: 'trauma' },
  { id: 'intoxicacao-agrotoxicos', label: 'Intoxicação por Agrotóxicos', emoji: '☠️', url: 'https://bvsms.saude.gov.br/intoxicacao-por-agrotoxicos/', emergencyNumber: '192', group: 'toxico' },
  { id: 'intoxicacao-metanol', label: 'Intoxicação por Metanol', emoji: '🧪', url: 'https://bvsms.saude.gov.br/intoxicacao-por-metanol/', emergencyNumber: '192', group: 'toxico' },
  { id: 'outros-desmaio', label: 'Desmaio / mal súbito', emoji: '😵', url: FIRST_AID_GENERAL_URL, emergencyNumber: '192', group: 'outros', note: 'Atalho temporário até encontrarmos link oficial específico.' },
  { id: 'outros-sangramento', label: 'Sangramento / hemorragia', emoji: '🩸', url: FIRST_AID_GENERAL_URL, emergencyNumber: '192', group: 'outros', note: 'Atalho temporário até encontrarmos link oficial específico.' },
  { id: 'outros-fratura', label: 'Fratura / suspeita de osso quebrado', emoji: '🦴', url: FIRST_AID_GENERAL_URL, emergencyNumber: '192', group: 'outros', note: 'Atalho temporário até encontrarmos link oficial específico.' },
  { id: 'outros-choque-eletrico', label: 'Choque elétrico', emoji: '⚡', url: FIRST_AID_GENERAL_URL, emergencyNumber: '193', group: 'outros', note: 'Atalho temporário até encontrarmos link oficial específico.' },
  { id: 'outros-acidente-crianca', label: 'Acidente com criança', emoji: '👶', url: FIRST_AID_GENERAL_URL, emergencyNumber: '192', group: 'outros', note: 'Atalho temporário até encontrarmos link oficial específico.' },
  { id: 'outros-queda-idoso', label: 'Queda em idoso', emoji: '👴', url: FIRST_AID_GENERAL_URL, emergencyNumber: '192', group: 'outros', note: 'Atalho temporário até encontrarmos link oficial específico.' },
  { id: 'outros-picada', label: 'Picada / animal peçonhento', emoji: '🐍', url: FIRST_AID_GENERAL_URL, emergencyNumber: '192', group: 'outros', note: 'Atalho temporário até encontrarmos link oficial específico.' },
  { id: 'outros-febre-alta', label: 'Febre alta', emoji: '🤒', url: FIRST_AID_GENERAL_URL, emergencyNumber: '192', group: 'outros', note: 'Atalho temporário até encontrarmos link oficial específico.' },
  { id: 'outros-parada-cardiaca', label: 'Parada cardiorrespiratória', emoji: '🫀', url: FIRST_AID_GENERAL_URL, emergencyNumber: '192', group: 'outros', note: 'Atalho temporário até encontrarmos link oficial específico.' },
];
