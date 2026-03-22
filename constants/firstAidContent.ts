export type FirstAidContentSection = {
  title: string;
  body: string[];
};

export type FirstAidContent = {
  topicId: string;
  title: string;
  officialUrl: string;
  officialSource: string;
  sections: FirstAidContentSection[];
};

export const FIRST_AID_CONTENT: Record<string, FirstAidContent> = {
  engasgo: {
    topicId: 'engasgo',
    title: 'Engasgo',
    officialUrl: 'https://bvsms.saude.gov.br/engasgo/',
    officialSource: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
    sections: [
      {
        title: 'O que é',
        body: [
          'O engasgo é uma manifestação do organismo para expelir alimento ou objeto que toma um “caminho errado”, durante a deglutição (ato de engolir).',
          'O engasgo é considerado uma emergência, e em casos graves, pode levar a pessoa à morte por asfixia ou deixá-la inconsciente por um tempo. Sendo assim, agir rapidamente evita complicações.',
        ],
      },
      {
        title: 'Como agir em caso de engasgo por corpo estranho',
        body: [
          'Posicione-se por trás e enlace a vítima com os braços ao redor do abdome (se for uma criança, ajoelhe-se primeiro), caso ela esteja consciente.',
          'Uma das mãos permanece fechada sobre a chamada “boca do estômago” (região epigástrica). A outra mão comprime a primeira, ao mesmo tempo em que empurra a “boca do estômago” para dentro e para cima, como se quisesse levantar a vítima do chão.',
          'Faça movimentos de compressão para dentro e para cima (como uma letra “J”), até que a vítima elimine o corpo estranho.',
        ],
      },
      {
        title: 'Como agir em caso de engasgo em bebês',
        body: [
          'Coloque o bebê de bruços em cima do seu braço e faça cinco compressões entre as escápulas.',
          'Vire o bebê de barriga para cima em seu braço e efetue mais cinco compressões sobre o esterno, na altura dos mamilos.',
          'Se não conseguir, repita as compressões até a chegada a um serviço de emergência.',
        ],
      },
      {
        title: 'Aviso oficial',
        body: [
          'Somente médicos e cirurgiões-dentistas devidamente habilitados podem diagnosticar doenças, indicar tratamentos e receitar remédios. As informações disponíveis possuem apenas caráter educativo.',
        ],
      },
    ],
  },
  queimadura: {
    topicId: 'queimadura',
    title: 'Queimadura',
    officialUrl: 'https://bvsms.saude.gov.br/queimaduras/',
    officialSource: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
    sections: [
      {
        title: 'O que é',
        body: [
          'Queimadura é toda lesão provocada pelo contato direto com alguma fonte de calor ou frio, produtos químicos, corrente elétrica, radiação, ou mesmo alguns animais e plantas.',
        ],
      },
      {
        title: 'Tipos de queimaduras',
        body: ['térmicas', 'químicas', 'por eletricidade'],
      },
      {
        title: 'Quanto à profundidade',
        body: ['1º grau', '2º grau', '3º grau'],
      },
      {
        title: 'Primeiros socorros',
        body: [
          'Colocar a parte queimada debaixo da água corrente fria, com jato suave, por aproximadamente dez minutos.',
          'Compressas úmidas e frias também são indicadas.',
          'No caso de queimaduras em grandes extensões do corpo, por substâncias químicas ou eletricidade, a vítima necessita de cuidados médicos urgentes.',
        ],
      },
      {
        title: 'Nunca fazer',
        body: [
          'Nunca toque a queimadura com as mãos.',
          'Nunca fure bolhas.',
          'Nunca tente descolar tecidos grudados na pele queimada.',
          'Nunca retire corpos estranhos ou graxa do local queimado.',
          'Nunca coloque manteiga, pó de café, creme dental ou qualquer outra substância.',
        ],
      },
      {
        title: 'Aviso oficial',
        body: [
          'Somente médicos e cirurgiões-dentistas devidamente habilitados podem diagnosticar doenças, indicar tratamentos e receitar remédios. As informações disponíveis possuem apenas caráter educativo.',
        ],
      },
    ],
  },
  avc: {
    topicId: 'avc',
    title: 'Acidente vascular cerebral (AVC)',
    officialUrl: 'https://bvsms.saude.gov.br/avc-acidente-vascular-cerebral/',
    officialSource: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
    sections: [
      {
        title: 'O que é',
        body: [
          'O AVC decorre da alteração do fluxo de sangue ao cérebro. Responsável pela morte de células nervosas da região cerebral atingida, o AVC pode se originar de uma obstrução de vasos sanguíneos, o chamado acidente vascular isquêmico, ou de uma ruptura do vaso, conhecido por acidente vascular hemorrágico.',
          'Acidente vascular isquêmico ou infarto cerebral: responsável por 80% dos casos de AVC.',
          'Acidente vascular hemorrágico: o rompimento dos vasos sanguíneos se dá na maioria das vezes no interior do cérebro.',
        ],
      },
      {
        title: 'Sintomas e sinais de alerta',
        body: [
          'Dor de cabeça muito forte, de início súbito, sobretudo se acompanhada de vômitos.',
          'Fraqueza ou dormência na face, nos braços ou nas pernas, geralmente afetando um dos lados do corpo.',
          'Paralisia (dificuldade ou incapacidade de se movimentar).',
          'Perda súbita da fala ou dificuldade para se comunicar e compreender o que se diz.',
          'Perda da visão ou dificuldade para enxergar com um ou ambos os olhos.',
          'Outros sintomas podem incluir tontura, perda de equilíbrio ou de coordenação.',
        ],
      },
      {
        title: 'Emergência',
        body: [
          'O AVC é uma emergência médica. Se achar que você ou outra pessoa está tendo um, é preciso dirigir-se com urgência ao serviço de emergência do hospital mais próximo para um diagnóstico completo e tratamento.',
        ],
      },
      {
        title: 'Fatores de risco',
        body: [
          'Hipertensão, diabetes, tabagismo, consumo frequente de álcool e drogas, estresse, colesterol elevado, doenças cardiovasculares, sedentarismo e doenças do sangue.',
        ],
      },
      {
        title: 'Aviso oficial',
        body: [
          'Somente médicos e cirurgiões-dentistas devidamente habilitados podem diagnosticar doenças, indicar tratamentos e receitar remédios. As informações disponíveis em Dicas em Saúde possuem apenas caráter educativo.',
        ],
      },
    ],
  },
  'choque-anafilatico': {
    topicId: 'choque-anafilatico',
    title: 'Choque Anafilático',
    officialUrl: 'https://bvsms.saude.gov.br/choque-anafilatico/',
    officialSource: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
    sections: [
      {
        title: 'O que é',
        body: [
          'É a forma mais grave de reação de hipersensibilidade (alergia), desencadeada por diversos agentes como drogas, alimentos e contrastes radiológicos.',
          'Os sinais e sintomas podem ter início após segundos à exposição ao agente ou até uma hora depois. A avaliação e o tratamento imediatos são fundamentais para evitar a morte.',
        ],
      },
      {
        title: 'Principais causas',
        body: [
          'Venenos: abelhas, marimbondos, vespas, etc.',
          'Medicamentos: alguns antibióticos, antiinflamatórios, anestésicos, contrastes contendo iodo, insulina, entre outros.',
          'Alimentos: camarão, mariscos, frutos do mar, amendoim, dentre outros.',
          'Látex: derivados da borracha, como luvas.',
        ],
      },
      {
        title: 'Sintomas',
        body: [
          'Sensação de desmaio.',
          'Pulso rápido.',
          'Dificuldade de respiração, incluindo chiados no peito, tosse.',
          'Náusea e vômito.',
          'Dor no estômago.',
          'Inchaço nos lábios, língua ou garganta.',
          'Placas altas e com coceira na pele (urticária).',
          'Pele pálida, fria e úmida.',
          'Tontura, confusão mental, perda da consciência.',
          'Parada cardíaca.',
        ],
      },
      {
        title: 'Tratamento e prevenção',
        body: [
          'O tratamento do choque anafilático deve ser iniciado com rapidez nos serviços de saúde de urgência e emergência.',
          'A principal medida para prevenir a anafilaxia é bloquear o contato com os elementos que podem desencadear a reação alérgica, como alimentos, medicamentos, produtos químicos ou insetos.',
        ],
      },
      {
        title: 'Aviso oficial',
        body: [
          'Somente médicos e cirurgiões-dentistas devidamente habilitados podem diagnosticar doenças, indicar tratamentos e receitar remédios. As informações disponíveis em Dicas em Saúde possuem apenas caráter educativo.',
        ],
      },
    ],
  },
  'intoxicacao-agrotoxicos': {
    topicId: 'intoxicacao-agrotoxicos',
    title: 'Intoxicação por Agrotóxicos',
    officialUrl: 'https://bvsms.saude.gov.br/intoxicacao-por-agrotoxicos/',
    officialSource: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
    sections: [
      {
        title: 'O que é',
        body: [
          'Agrotóxicos são produtos químicos utilizados para combater pragas. Também são chamados de praguicidas, pesticidas, defensivos agrícolas, agroquímicos ou biocidas.',
          'Todos os agrotóxicos são potencialmente perigosos, podem causar danos à saúde de pessoas, animais e ao meio ambiente. É a classe de produto que mais leva a óbito.',
        ],
      },
      {
        title: 'Formas de intoxicação',
        body: [
          'Contato direto: no preparo, aplicação ou qualquer tipo de manuseio com o produto.',
          'Contato indireto: contaminação de água e alimentos ingeridos.',
          'Os venenos entram no corpo por meio de contato com a pele, mucosa, pela respiração e ingestão.',
        ],
      },
      {
        title: 'Sintomas',
        body: [
          'Intoxicação aguda: náuseas, tonturas, vômitos, desorientação, dificuldade respiratória, sudorese e salivação excessiva, diarréia, chegando até coma e morte.',
          'Intoxicação crônica: distúrbios comportamentais como irritabilidade, ansiedade, alteração do sono e da atenção, depressão, dor de cabeça, cansaço e formigamentos.',
        ],
      },
      {
        title: 'Primeiros socorros',
        body: [
          'Na intoxicação cutânea, retirar as roupas sujas e lavar bem a pele contaminada com água corrente e sabão por, no mínimo, 10 minutos.',
          'Na intoxicação inalatória, remover a vítima para local fresco e ventilado e afrouxar as roupas.',
          'Na intoxicação oral, ler o rótulo do produto para ver se é recomendado provocar vômito.',
          'Após os primeiros socorros deve-se procurar os serviços de saúde mais próximos, levando o rótulo ou embalagem do agrotóxico e o receituário agronômico.',
        ],
      },
      {
        title: 'Aviso oficial',
        body: [
          'Somente médicos e cirurgiões-dentistas devidamente habilitados podem diagnosticar doenças, indicar tratamentos e receitar remédios. As informações disponíveis em Dicas em Saúde possuem apenas caráter educativo.',
        ],
      },
    ],
  },
  'intoxicacao-metanol': {
    topicId: 'intoxicacao-metanol',
    title: 'Intoxicação por Metanol',
    officialUrl: 'https://bvsms.saude.gov.br/intoxicacao-por-metanol/',
    officialSource: 'Biblioteca Virtual em Saúde / Ministério da Saúde',
    sections: [
      {
        title: 'O que é',
        body: [
          'A intoxicação por metanol é uma emergência de saúde grave, causada principalmente pela ingestão de bebidas alcoólicas adulteradas, produtos de limpeza ou solventes.',
          'O metanol é extremamente tóxico para o corpo humano e pode levar à cegueira permanente ou à morte.',
        ],
      },
      {
        title: 'Sintomas',
        body: [
          'Sintomas iniciais: dor de cabeça, tontura, sonolência, náuseas, vômitos e dor abdominal.',
          'Sintomas graves: confusão mental, alterações na visão, suor excessivo, taquicardia, convulsões e dificuldade para respirar.',
          'Em casos graves, a intoxicação pode levar a coma e à morte.',
        ],
      },
      {
        title: 'Como se proteger e o que fazer',
        body: [
          'Nunca consuma bebidas de origem duvidosa. Sempre prefira produtos com selo de qualidade, comprados em locais confiáveis e que tenham embalagens lacradas e rótulos intactos.',
          'Em caso de suspeita de intoxicação, procure atendimento médico de urgência.',
          'Não use receitas caseiras. O tratamento deve ser feito por profissionais de saúde.',
          'Informe os profissionais de saúde sobre o que foi consumido e avise outras pessoas que beberam o mesmo produto para que também procurem ajuda médica.',
        ],
      },
      {
        title: 'Aviso oficial',
        body: [
          'O diagnóstico e o tratamento só podem ser feitos por profissionais de saúde. Não tente usar remédios caseiros ou esperar os sintomas desaparecerem sozinhos.',
        ],
      },
    ],
  },
};
