export type EmergencyContact = {
  id: string;
  emoji: string;
  name: string;
  number: string;
  displayNumber?: string;
};

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { id: 'samu', emoji: '🚑', name: 'SAMU', number: '192' },
  { id: 'bombeiros', emoji: '🔥', name: 'Corpo de Bombeiros', number: '193' },
  { id: 'prf', emoji: '🚓', name: 'Polícia Rodoviária Federal', number: '191' },
  { id: 'pre', emoji: '🛣️', name: 'Polícia Rodoviária Estadual', number: '198' },
  { id: 'pm', emoji: '👮', name: 'Polícia Militar', number: '190' },
  { id: 'pc', emoji: '🚔', name: 'Polícia Civil', number: '197' },
  { id: 'defesa-civil', emoji: '🛡️', name: 'Defesa Civil', number: '199' },
  { id: 'saude', emoji: '☎️', name: 'Central de Regulação em Saúde', number: '136' },
  { id: 'disque100', emoji: '🧒', name: 'Disque Denúncia', number: '100' },
  { id: 'idoso', emoji: '👴', name: 'Disque Idoso', number: '0801970001', displayNumber: '080 197 0001' },
  { id: 'cvv', emoji: '💊', name: 'CVV', number: '188' },
  { id: 'ciatox', emoji: '🐍', name: 'CIATox', number: '1130813400', displayNumber: '(11) 3081-3400' },
];

export type MapCategory = {
  id: string;
  label: string;
  type?: string;
  keyword?: string;
  strategy?: 'nearby' | 'textsearch';
};

export const MAP_CATEGORIES: MapCategory[] = [
  { id: 'hospital', label: '🏥 Hospitais', keyword: 'hospital público aberto 24 horas', strategy: 'textsearch' },
  { id: 'upa', label: '🏨 UPAs 24h', keyword: 'Unidade de Pronto Atendimento UPA 24h' },
  { id: 'health', label: '🏢 Centros de Saúde (UBS)', type: 'health', keyword: 'centro de saude' },
  { id: 'maternity', label: '🤰 Maternidades', keyword: 'maternidade', strategy: 'textsearch' },
  { id: 'clinic', label: '🏥 Clínicas Hospitalares', keyword: 'clínica hospitalar', strategy: 'textsearch' },
  { id: 'vet', label: '🐾 Veterinárias', keyword: 'veterinária', strategy: 'textsearch' },
];
