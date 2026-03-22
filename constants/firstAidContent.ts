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
  afogamento: {
    topicId: 'afogamento',
    title: 'Afogamento',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Afogamento é a entrada de líquido nas vias aéreas (traqueia, brônquios ou pulmões), causada por afundamento ou mergulho.',
          'Provoca falta de oxigênio no sangue afetando todos os órgãos e tecidos.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Crianças não devem ser deixadas sozinhas na banheira ou perto de reservatórios de água.',
          'Usar colete salva-vidas em passeios de barco.',
          'Não ingerir álcool ou drogas à beira de piscinas, lagos, rios ou em embarcações.',
          'Procurar locais onde haja salva-vidas e respeitar avisos de segurança.',
          'O acidente pode ocorrer de forma silenciosa; a prevenção é a melhor estratégia.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'Corpo de Bombeiros / orientação institucional de resgate aquático',
        body: [
          'Em caso de afogamento, acione imediatamente o serviço de resgate e evite entrar na água sem segurança ou preparo adequado.',
          'Se houver salva-vidas ou equipe especializada, priorize o acionamento rápido.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 193 em caso de afogamento, risco aquático, resgate em água ou necessidade imediata de salvamento.', number: '193', source: 'Corpo de Bombeiros' },
      { when: 'Ligar 192 se a vítima já foi retirada da água e permanece inconsciente, sem responder ou com quadro clínico grave.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
    ],
    references: [
      { label: 'Biblioteca Virtual em Saúde / Ministério da Saúde', url: 'https://bvsms.saude.gov.br/acidentes-por-afogamento/' },
      { label: 'Corpo de Bombeiros PR — Primeiros Socorros', url: 'https://www.bombeiros.pr.gov.br/Pagina/Primeiros-Socorros' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  avc: {
    topicId: 'avc',
    title: 'Acidente vascular cerebral (AVC)',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'O AVC decorre da alteração do fluxo de sangue ao cérebro.',
          'Pode se originar de uma obstrução de vasos sanguíneos (AVC isquêmico) ou de uma ruptura do vaso (AVC hemorrágico).',
        ],
      },
      symptoms: {
        title: 'Sintomas',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Dor de cabeça muito forte e súbita, especialmente com vômitos.',
          'Fraqueza ou dormência em face, braços ou pernas, geralmente de um lado do corpo.',
          'Paralisia.',
          'Perda súbita da fala ou dificuldade para compreender.',
          'Perda da visão ou dificuldade para enxergar.',
          'Tontura, perda de equilíbrio ou coordenação.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Controle de hipertensão, diabetes, tabagismo, álcool, colesterol e sedentarismo ajuda a reduzir risco.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'Diante de suspeita de AVC, procure ajuda médica com urgência e não espere os sintomas passarem.',
          'Leve a pessoa com urgência ao serviço de emergência ou acione o SAMU.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 imediatamente em caso de suspeita de AVC.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 apenas se houver contexto adicional de resgate/salvamento físico.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'Biblioteca Virtual em Saúde / Ministério da Saúde', url: 'https://bvsms.saude.gov.br/avc-acidente-vascular-cerebral/' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  'choque-anafilatico': {
    topicId: 'choque-anafilatico',
    title: 'Choque Anafilático',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'É a forma mais grave de reação de hipersensibilidade (alergia), desencadeada por agentes como drogas, alimentos e contrastes radiológicos.',
          'A avaliação e o tratamento imediatos são fundamentais para evitar a morte.',
        ],
      },
      symptoms: {
        title: 'Sintomas',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Sensação de desmaio.',
          'Pulso rápido.',
          'Dificuldade de respiração, chiado no peito e tosse.',
          'Náusea e vômito.',
          'Inchaço nos lábios, língua ou garganta.',
          'Placas altas com coceira na pele.',
          'Parada cardíaca em casos graves.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Bloquear o contato com os elementos que podem desencadear a reação alérgica.',
          'Se já teve reação grave, seguir orientação médica, portar identificação e kit prescrito.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'Situação de urgência e emergência. Buscar atendimento imediato.',
          'Se a pessoa possui kit de emergência prescrito e foi orientada por médico, seguir essa orientação até a chegada do atendimento.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de dificuldade respiratória, inchaço de garganta, perda de consciência ou suspeita de choque anafilático.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se houver necessidade de resgate físico/ambiental associada.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'Biblioteca Virtual em Saúde / Ministério da Saúde', url: 'https://bvsms.saude.gov.br/choque-anafilatico/' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  'intoxicacao-agrotoxicos': {
    topicId: 'intoxicacao-agrotoxicos',
    title: 'Intoxicação por Agrotóxicos',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Agrotóxicos são produtos químicos utilizados para combater pragas.',
          'Todos os agrotóxicos são potencialmente perigosos e podem causar danos à saúde, animais e meio ambiente.',
        ],
      },
      symptoms: {
        title: 'Sintomas',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Intoxicação aguda: náuseas, tonturas, vômitos, desorientação, dificuldade respiratória, sudorese e salivação excessiva, diarréia, podendo chegar ao coma e morte.',
          'Intoxicação crônica: irritabilidade, ansiedade, alteração do sono e atenção, depressão, dor de cabeça, fadiga e formigamentos.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Comprar agrotóxico somente com receita agronômica.',
          'Ler e seguir rigorosamente as recomendações do rótulo.',
          'Não armazenar junto com alimentos.',
          'Usar equipamentos de proteção adequados.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Na intoxicação cutânea, retirar as roupas sujas e lavar a pele com água corrente e sabão por no mínimo 10 minutos.',
          'Na intoxicação inalatória, remover a vítima para local fresco e ventilado e afrouxar as roupas.',
          'Na intoxicação oral, ler o rótulo do produto para ver se é recomendado provocar vômito.',
          'Após os primeiros socorros, procurar os serviços de saúde mais próximos levando o rótulo ou embalagem do agrotóxico.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de intoxicação com sintomas respiratórios, neurológicos, vômitos intensos ou piora clínica.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se houver resgate em ambiente de risco químico ou necessidade de apoio operacional no local.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'Biblioteca Virtual em Saúde / Ministério da Saúde', url: 'https://bvsms.saude.gov.br/intoxicacao-por-agrotoxicos/' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  'intoxicacao-metanol': {
    topicId: 'intoxicacao-metanol',
    title: 'Intoxicação por Metanol',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'A intoxicação por metanol é uma emergência de saúde grave, causada principalmente pela ingestão de bebidas alcoólicas adulteradas, produtos de limpeza ou solventes.',
          'O metanol é extremamente tóxico para o corpo humano e pode levar à cegueira permanente ou à morte.',
        ],
      },
      symptoms: {
        title: 'Sintomas',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Sintomas iniciais: dor de cabeça, tontura, sonolência, náuseas, vômitos e dor abdominal.',
          'Sintomas graves: confusão mental, alterações na visão, suor excessivo, taquicardia, convulsões e dificuldade para respirar.',
          'Em casos graves, pode levar a coma e morte.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Evite bebidas de origem duvidosa e prefira produtos com selo e rótulo, comprados em locais confiáveis.',
          'Fique atento a embalagens sem lacre, abertas ou alteradas.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Procure atendimento médico de urgência o mais rápido possível.',
          'Não use receitas caseiras.',
          'Informe aos profissionais de saúde o que foi consumido e avise outras pessoas que beberam o mesmo produto.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de suspeita de intoxicação por metanol ou sintomas compatíveis.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se houver contexto adicional de resgate/salvamento físico.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'Biblioteca Virtual em Saúde / Ministério da Saúde', url: 'https://bvsms.saude.gov.br/intoxicacao-por-metanol/' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
};
