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
  'outros-queda-idoso': {
    topicId: 'outros-queda-idoso',
    title: 'Queda em Idoso',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'A queda é um evento bastante comum e devastador em idosos.',
          'Embora não seja consequência inevitável do envelhecimento, pode sinalizar o início de fragilidade ou indicar doença aguda.',
        ],
      },
      symptoms: {
        title: 'Sintomas e fatores de risco',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Idade avançada, sexo feminino, história prévia de quedas, imobilidade, baixa aptidão física, fraqueza muscular, alteração do equilíbrio e marcha lenta aumentam o risco.',
          'Também se associam alterações neurológicas, pressão arterial, visão, audição e uso de medicamentos.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Fazer exames oftalmológicos e físicos regularmente.',
          'Manter ingestão adequada de cálcio e vitamina D.',
          'Participar de programas de atividade física voltados para equilíbrio e força.',
          'Eliminar de casa tudo aquilo que provoque escorregões e instalar suportes e corrimãos.',
          'Usar sapatos com sola antiderrapante e manter atenção aos efeitos colaterais dos medicamentos.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'Se a queda resultar em dor intensa, suspeita de fratura, perda de consciência ou dificuldade de mobilização, acione ajuda médica de urgência.',
          'Evite movimentar a pessoa bruscamente até avaliação adequada, especialmente em suspeita de trauma importante.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de queda com dor intensa, suspeita de fratura, perda de consciência, confusão, mal súbito ou piora clínica.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se houver necessidade de resgate físico/ambiental associado.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'Biblioteca Virtual em Saúde / Ministério da Saúde', url: 'https://bvsms.saude.gov.br/quedas-de-idosos/' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  'outros-picada': {
    topicId: 'outros-picada',
    title: 'Picadas e Animais Peçonhentos',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Animais peçonhentos são aqueles que possuem glândulas de veneno e o injetam por dentes, ferrões ou aguilhões.',
          'Os acidentes com esses animais têm grande importância médica devido à gravidade e frequência.',
        ],
      },
      symptoms: {
        title: 'Sintomas',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Dor, formigamento, inchaço local e, em alguns casos, náuseas, vômitos, suor excessivo, tremores, salivação e alterações cardíacas.',
          'A gravidade varia conforme o animal e a vítima, especialmente em crianças e idosos.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Usar calçados e luvas em jardinagem e atividades rurais.',
          'Examinar calçados e roupas antes de usar.',
          'Evitar acúmulo de entulho e manter jardins e quintais limpos.',
          'Vedar frestas, ralos e soleiras, além de combater insetos que servem de alimento para escorpiões e aranhas.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Em caso de acidente, procurar atendimento médico para avaliação.',
          'Se possível, levar o animal ou uma foto para identificação, sem se colocar em risco.',
          'Em picadas de escorpião, limpar o local com água e sabão pode ajudar, desde que não atrase a ida ao serviço de saúde.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de sintomas intensos, piora rápida, vômitos, dificuldade respiratória, alteração do estado geral ou vítima vulnerável.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se houver necessidade de apoio de resgate/salvamento ou risco ambiental associado.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'Biblioteca Virtual em Saúde / Ministério da Saúde', url: 'https://bvsms.saude.gov.br/picadas-de-insetos-e-animais-peconhentos-parte-1/' },
      { label: 'Biblioteca Virtual em Saúde / Ministério da Saúde — Escorpião', url: 'https://bvsms.saude.gov.br/picada-de-escorpiao-saiba-os-cuidados-e-o-que-fazer-em-caso-de-acidente-2/' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  'outros-acidente-crianca': {
    topicId: 'outros-acidente-crianca',
    title: 'Acidente com Criança',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros',
        body: [
          'Acidentes domésticos são uma das principais causas de mortalidade na faixa etária de 1 a 14 anos no Brasil.',
          'Crianças e adolescentes em casa exigem atenção redobrada em ambientes como cozinha, banheiro e áreas com móveis e objetos de risco.',
        ],
      },
      symptoms: {
        title: 'Situações mais comuns',
        source: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros',
        body: [
          'As situações de emergência abordadas no guia incluem engasgos, asfixia, queimaduras, intoxicação, escoriações, fraturas, hemorragias, desmaios, convulsões, ataques por animais peçonhentos e choque elétrico.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros',
        body: [
          'Manter objetos cortantes, produtos químicos e itens quentes fora do alcance das crianças.',
          'Fixar móveis que possam tombar e proteger quinas.',
          'Observar a temperatura do banho de bebês e crianças pequenas.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros',
        body: [
          'Diante de acidente com criança, procure o tema específico correspondente dentro do app quando souber identificar a situação.',
          'Em caso de gravidade, dificuldade respiratória, trauma importante, intoxicação, queimadura extensa, convulsão ou dúvida, acione imediatamente o serviço de emergência.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de criança com dificuldade respiratória, desmaio, convulsão, intoxicação, queimadura importante, trauma, ou outro quadro de urgência.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se houver incêndio, afogamento, choque elétrico com risco no ambiente ou necessidade de salvamento.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros', url: 'https://www.gov.br/mdh/pt-br/assuntos/noticias/2020-2/abril/ministerio-publica-guia-de-prevencao-a-acidentes-domesticos-e-primeiros-socorros' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  'outros-choque-eletrico': {
    topicId: 'outros-choque-eletrico',
    title: 'Choque Elétrico',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
        body: [
          'Acidentes por eletricidade podem causar queimaduras, lesões internas, parada cardiorrespiratória e outras complicações graves.',
          'Situações com eletricidade exigem atenção ao risco para a vítima e para quem tenta ajudar.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros',
        body: [
          'Evitar instalações improvisadas e contato com fios desencapados.',
          'Redobrar cuidado com crianças, tomadas, eletrodomésticos e ambientes molhados.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'Corpo de Bombeiros PR',
        body: [
          'Antes de tocar na vítima, interrompa a fonte de energia se for possível fazer isso com segurança.',
          'Se houver risco no ambiente, não se exponha. Acione o serviço de emergência imediatamente.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 193 em caso de acidente elétrico com risco no ambiente, fio energizado, incêndio ou necessidade de resgate.', number: '193', source: 'Corpo de Bombeiros' },
      { when: 'Ligar 192 se a vítima estiver inconsciente, com queimaduras, sem responder, com dor importante ou quadro clínico grave após o choque.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
    ],
    references: [
      { label: 'Corpo de Bombeiros PR', url: 'https://www.bombeiros.pr.gov.br/Pagina/Primeiros-Socorros' },
      { label: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros', url: 'https://www.gov.br/mdh/pt-br/assuntos/noticias/2020-2/abril/ministerio-publica-guia-de-prevencao-a-acidentes-domesticos-e-primeiros-socorros' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  'outros-parada-cardiaca': {
    topicId: 'outros-parada-cardiaca',
    title: 'Parada Cardiorrespiratória',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'A parada cardiorrespiratória é uma emergência extrema e exige acionamento imediato do atendimento pré-hospitalar móvel.',
          'O atendimento precoce é essencial para reduzir risco de morte e sequelas.',
        ],
      },
      symptoms: {
        title: 'Sinais de gravidade',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'Vítima inconsciente, sem responder, com ausência de sinais vitais aparentes ou dificuldade respiratória grave exige acionamento imediato do serviço de urgência.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'Chame o SAMU 192 imediatamente e siga as orientações repassadas durante a ligação.',
          'O atendimento pré-hospitalar móvel existe justamente para orientar e encaminhar a vítima o mais rápido possível ao serviço adequado.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 imediatamente em caso de parada cardiorrespiratória ou suspeita de parada.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se houver contexto de resgate associado, como afogamento, incêndio, soterramento ou choque elétrico com risco ambiental.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
      { label: 'Corpo de Bombeiros PR', url: 'https://www.bombeiros.pr.gov.br/Pagina/Primeiros-Socorros' },
    ],
  },
  'outros-sangramento': {
    topicId: 'outros-sangramento',
    title: 'Sangramento / Hemorragia',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros',
        body: [
          'Hemorragias fazem parte das situações de emergência doméstica e traumática que exigem atenção rápida.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'Corpo de Bombeiros PR',
        body: [
          'Em caso de sangramento importante, procure atendimento com urgência e evite atrasar o acionamento do serviço de emergência.',
          'Em situações traumáticas ou quando houver grande perda de sangue, a avaliação profissional é essencial.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de sangramento importante, perda significativa de sangue, tontura, fraqueza ou piora do estado geral.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se o sangramento estiver associado a acidente com necessidade de resgate.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'Corpo de Bombeiros PR', url: 'https://www.bombeiros.pr.gov.br/Pagina/Primeiros-Socorros' },
      { label: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros', url: 'https://www.gov.br/mdh/pt-br/assuntos/noticias/2020-2/abril/ministerio-publica-guia-de-prevencao-a-acidentes-domesticos-e-primeiros-socorros' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  'outros-desmaio': {
    topicId: 'outros-desmaio',
    title: 'Desmaio / Mal súbito',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'Desmaios e mal súbito podem estar relacionados a diferentes causas clínicas e exigem avaliação rápida do contexto e da gravidade.',
          'Quando a pessoa perde a consciência, não responde ou apresenta piora do quadro, a situação deve ser tratada como urgência.',
        ],
      },
      symptoms: {
        title: 'Sinais de alerta',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'Perda de consciência, confusão, dificuldade de responder, fraqueza intensa, mal-estar súbito, tontura importante ou outros sinais de agravamento pedem atenção imediata.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros',
        body: [
          'Manter observação cuidadosa de crianças, idosos e pessoas vulneráveis em casa ajuda a perceber precocemente alterações importantes.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'Em caso de desmaio ou mal súbito, acione o SAMU se houver perda de consciência, dificuldade respiratória, convulsão, trauma associado ou dúvida sobre a gravidade.',
          'Evite dar água ou forçar movimentos até orientação adequada quando a pessoa estiver inconsciente ou sem responder normalmente.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de desmaio, perda de consciência, mal súbito ou qualquer piora clínica importante.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se houver necessidade de resgate físico/ambiental associada ao episódio.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
      { label: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros', url: 'https://www.gov.br/mdh/pt-br/assuntos/noticias/2020-2/abril/ministerio-publica-guia-de-prevencao-a-acidentes-domesticos-e-primeiros-socorros' },
    ],
  },
  'outros-fratura': {
    topicId: 'outros-fratura',
    title: 'Fratura / suspeita de osso quebrado',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros',
        body: [
          'Fraturas fazem parte das situações traumáticas que podem ocorrer em acidentes domésticos e exigem cuidado para evitar agravamento.',
        ],
      },
      symptoms: {
        title: 'Sinais de alerta',
        source: 'Corpo de Bombeiros PR',
        body: [
          'Dor intensa, incapacidade de movimentar, deformidade aparente, inchaço ou trauma importante podem indicar fratura e precisam de avaliação adequada.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros',
        body: [
          'Organizar o ambiente doméstico, evitar superfícies escorregadias e reduzir riscos de queda ajuda a prevenir fraturas.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'Corpo de Bombeiros PR',
        body: [
          'Em suspeita de fratura, evitar movimentar o membro ou a vítima sem necessidade.',
          'Acione atendimento de urgência quando houver dor intensa, trauma relevante, dificuldade de locomoção, fratura exposta ou dúvida sobre a gravidade.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de dor intensa, fratura exposta, trauma importante, perda de mobilidade ou piora clínica.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se a fratura estiver associada a acidente com necessidade de resgate ou salvamento.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'Corpo de Bombeiros PR', url: 'https://www.bombeiros.pr.gov.br/Pagina/Primeiros-Socorros' },
      { label: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros', url: 'https://www.gov.br/mdh/pt-br/assuntos/noticias/2020-2/abril/ministerio-publica-guia-de-prevencao-a-acidentes-domesticos-e-primeiros-socorros' },
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
    ],
  },
  'outros-febre-alta': {
    topicId: 'outros-febre-alta',
    title: 'Febre Alta',
    blocks: {
      whatIs: {
        title: 'O que é',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'Febre alta isolada não define, por si só, a causa do problema, mas pode acompanhar quadros clínicos que exigem avaliação, especialmente em crianças, idosos e pessoas vulneráveis.',
        ],
      },
      symptoms: {
        title: 'Sinais de alerta',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'Febre alta associada a convulsão, dificuldade respiratória, sonolência excessiva, desmaio, confusão, rigidez, piora importante do estado geral ou outros sinais graves pede atenção imediata.',
        ],
      },
      prevention: {
        title: 'Prevenção',
        source: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros',
        body: [
          'Diante de criança ou pessoa vulnerável doente em casa, observação cuidadosa e busca precoce de ajuda são medidas importantes.',
        ],
      },
      firstAid: {
        title: 'Primeiros socorros',
        source: 'SAMU 192 / Ministério da Saúde',
        body: [
          'Quando houver sinais de gravidade, não espere o quadro piorar para pedir ajuda.',
          'Se a febre vier acompanhada de convulsão, desmaio, dificuldade respiratória ou alteração importante do comportamento, o caso deve ser tratado como urgência.',
        ],
      },
    },
    emergencyRules: [
      { when: 'Ligar 192 em caso de febre alta com sinais de gravidade, convulsão, desmaio, falta de ar ou importante piora clínica.', number: '192', source: 'SAMU 192 / Ministério da Saúde' },
      { when: 'Ligar 193 se houver contexto de resgate associado, o que não é o mais comum na febre isolada.', number: '193', source: 'Corpo de Bombeiros' },
    ],
    references: [
      { label: 'SAMU 192 / Ministério da Saúde', url: 'https://www.gov.br/saude/pt-br/composicao/saes/samu-192' },
      { label: 'MDH / Guia de prevenção a acidentes domésticos e primeiros socorros', url: 'https://www.gov.br/mdh/pt-br/assuntos/noticias/2020-2/abril/ministerio-publica-guia-de-prevencao-a-acidentes-domesticos-e-primeiros-socorros' },
    ],
  },
};
