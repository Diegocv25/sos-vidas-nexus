export type FirstAidAttributedBlock = {
  title: string;
  body: string[];
  source: string;
};

export type FirstAidEmergencyRule = {
  when: string;
  number: '192' | '193';
  source: string;
};

export type FirstAidReference = {
  label: string;
  url: string;
};

export type FirstAidContent = {
  topicId: string;
  title: string;
  blocks: {
    whatIs?: FirstAidAttributedBlock;
    symptoms?: FirstAidAttributedBlock;
    prevention?: FirstAidAttributedBlock;
    firstAid?: FirstAidAttributedBlock;
  };
  emergencyRules: FirstAidEmergencyRule[];
  references: FirstAidReference[];
};

export const FIRST_AID_CONTENT: Record<string, FirstAidContent> = {
  engasgo: {
    topicId: 'engasgo',
    title: 'Engasgo',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'O engasgo é uma manifestação do organismo para expelir alimento ou objeto que toma um “caminho errado”, durante a deglutição (ato de engolir).',
          'O engasgo é considerado uma emergência, e em casos graves, pode levar a pessoa à morte por asfixia ou deixá-la inconsciente por um tempo. Sendo assim, agir rapidamente evita complicações.',
        ],
      },
      symptoms: {
        title: 'Sintomas',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Dificuldade ou incapacidade de respirar normalmente.',
          'Sinais de sufocação após ingestão de alimento ou objeto.',
          'Em casos graves, risco de asfixia e perda de consciência.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Atenção com alimentos e objetos pequenos, especialmente com crianças.',
          'Evitar situações em que o alimento ou objeto possa ser aspirado ou engolido de forma inadequada.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Posicione-se por trás e enlace a vítima com os braços ao redor do abdome (se for uma criança, ajoelhe-se primeiro), caso ela esteja consciente.',
          'Uma das mãos permanece fechada sobre a chamada “boca do estômago” (região epigástrica). A outra mão comprime a primeira, ao mesmo tempo em que empurra a “boca do estômago” para dentro e para cima, como se quisesse levantar a vítima do chão.',
          'Faça movimentos de compressão para dentro e para cima (como uma letra “J”), até que a vítima elimine o corpo estranho.',
          'No caso de bebês, coloque-o de bruços em seu braço, faça cinco compressões entre as escápulas e depois cinco compressões sobre o esterno.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de dificuldade respiratória, sufocação persistente ou risco de asfixia.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se houver necessidade de resgate/salvamento ou contexto associado de acidente com risco físico.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'Biblioteca Virtual em Saúde / Ministério da Saúde', url: 'https://bvsms.saude.gov.br/engasgo/' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  queimadura: {
    topicId: 'queimadura',
    title: 'Queimadura',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Queimadura é toda lesão provocada pelo contato direto com alguma fonte de calor ou frio, produtos químicos, corrente elétrica, radiação, ou mesmo alguns animais e plantas.',
        ],
      },
      symptoms: {
        title: 'Sintomas',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Lesões que podem variar conforme a profundidade em 1º, 2º e 3º graus.',
          'Dor, bolhas, destruição de tecidos e outras manifestações dependendo da gravidade.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'Fiocruz / Manual de Primeiros Socorros',
        body: [
          'Redobrar atenção com fontes de calor, eletricidade, produtos químicos e superfícies quentes.',
          'Manter crianças longe de líquidos quentes, fogo e tomadas sem proteção adequada.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Colocar a parte queimada debaixo da água corrente fria, com jato suave, por aproximadamente dez minutos.',
          'Compressas úmidas e frias também são indicadas.',
          'No caso de queimaduras em grandes extensões do corpo, por substâncias químicas ou eletricidade, a vítima necessita de cuidados médicos urgentes.',
          'Nunca toque a queimadura com as mãos. Nunca fure bolhas. Nunca tente descolar tecidos grudados. Nunca coloque manteiga, pó de café, creme dental ou outra substância.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de queimadura extensa, comprometimento importante da pele, dor intensa ou necessidade de atendimento urgente.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 em caso de incêndio, explosão, resgate ou risco estrutural/ambiental associado.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'Biblioteca Virtual em Saúde / Ministério da Saúde', url: 'https://bvsms.saude.gov.br/queimaduras/' },
      { label: 'Fiocruz / Manual de Primeiros Socorros', url: 'https://fiocruz.br/biosseguranca/Bis/manuais/biosseguranca/manualdeprimeirossocorros.pdf' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  convulsao: {
    topicId: 'convulsao',
    title: 'Convulsão',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Convulsão é a contratura involuntária da musculatura, que provoca movimentos desordenados. Geralmente é acompanhada pela perda da consciência.',
          'As convulsões acontecem quando há a excitação da camada externa do cérebro.',
        ],
      },
      symptoms: {
        title: 'Sintomas',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Espasmos incontroláveis.',
          'Lábios azulados.',
          'Olhos virados para cima.',
          'Inconsciência.',
          'Salivação abundante.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Em crianças com febre alta, atenção imediata e procura por atendimento adequado.',
          'Ter sempre à mão os números de atendimento de emergência da sua cidade.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Coloque a pessoa deitada de costas, em lugar confortável, retirando de perto objetos com que ela possa se machucar.',
          'Introduza um pedaço de pano ou um lenço entre os dentes para evitar mordidas na língua.',
          'Levante o queixo para facilitar a passagem de ar.',
          'Afrouxe as roupas.',
          'Caso a pessoa esteja babando, mantenha-a deitada com a cabeça voltada para o lado, evitando que ela se sufoque com a própria saliva.',
          'Quando a crise passar, deixe a pessoa descansar.',
          'Nunca segure a pessoa. Não dê tapas. Não jogue água sobre ela.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de convulsão, inconsciência, dificuldade respiratória, repetição da crise ou qualquer dúvida clínica grave.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 quando houver necessidade de resgate físico/ambiental associado.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'Biblioteca Virtual em Saúde / Ministério da Saúde', url: 'https://bvsms.saude.gov.br/convulsao/' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
};
