/**
 * ============================================================================
 * Identificando Bichinhos - Banco de Dados Científico de Animais Peçonhentos e Vetores
 * Baseado em diretrizes do Ministério da Saúde, Fiocruz e Instituto Butantan
 * Autora: Anna Sophia
 * ============================================================================
 */

const ANIMAL_CATEGORIES = {
    barbeiros: {
        id: "barbeiros",
        name: "Barbeiros (Triatomíneos)",
        emoji: "🪲",
        color: "#B91C1C",
        bgLight: "#FEF2F2",
        description: "Insetos hematófagos transmissores do parasita Trypanosoma cruzi, causador da Doença de Chagas. Diferenciação crucial entre barbeiros e percevejos fitófagos.",
        riskLevel: "Vetor Biológico de Alta Gravidade"
    },
    cobras: {
        id: "cobras",
        name: "Cobras e Serpentes",
        emoji: "🐍",
        color: "#047857",
        bgLight: "#ECFDF5",
        description: "Serpentes peçonhentas (Bothrops, Crotalus, Lachesis, Micrurus) causadoras de acidentes ofídicos graves com necessidade de soroterapia rápida.",
        riskLevel: "Peçonha de Alta Toxicidade"
    },
    escorpioes: {
        id: "escorpioes",
        name: "Escorpiões",
        emoji: "🦂",
        color: "#D97706",
        bgLight: "#FFFBEB",
        description: "Aracnídeos da família Buthidae (Tityus serrulatus, T. bahiensis, T. stigmurus) responsáveis pela grande maioria das intoxicações por peçonha no Brasil.",
        riskLevel: "Alta Letalidade Pediátrica"
    },
    aranhas: {
        id: "aranhas",
        name: "Aranhas",
        emoji: "🕷️",
        color: "#6D28D9",
        bgLight: "#F5F3FF",
        description: "Aranhas de importância médica no Brasil: Armadeira (Phoneutria), Aranha-marrom (Loxosceles) e Viúva-negra (Latrodectus).",
        riskLevel: "Peçonha Necrosante ou Neurotóxica"
    }
};

const SPECIMENS_DATABASE = [
    // ------------------------------------------------------------------------
    // 1. BARBEIROS (TRIATOMÍNEOS) E PERCEVEJOS FITÓFAGOS
    // ------------------------------------------------------------------------
    {
        id: "triatoma_infestans",
        category: "barbeiros",
        scientificName: "Triatoma infestans",
        commonName: "Barbeiro bicudo (Bicho-de-parede)",
        isVenomousOrVector: true,
        urgencyLevel: "ALTA",
        vectorFor: "Doença de Chagas (Trypanosoma cruzi)",
        distribution: "Centro-Oeste, Sudeste, Sul e Nordeste (histórico de domiciliação)",
        habitat: "Frestas de paredes de pau-a-pique, atrás de quadros, colchões, peridomicílio (galinheiros)",
        keyIdentificationFeatures: [
            "Bico (rostro) reto, fino e de 3 artículos, que se dobra sob a cabeça e não ultrapassa o 1º par de pernas.",
            "Conexivo (borda do abdômen) com manchas amarelas e pretas bem nítidas.",
            "Cabeça afilada e cilíndrica com olhos grandes e escuros.",
            "Tamanho médio entre 21 e 29 mm."
        ],
        lookalikeDifferentiator: "Diferente de percevejos fitófagos: o barbeiro NUNCA tem bico longo que alcance o abdômen e NÃO tem bico curvo de percevejo predador assassino.",
        firstAidProtocol: "NÃO esmague o inseto com as mãos! Se picado, lave o local com água e sabão SEM COÇAR (as fezes do barbeiro entram pela lesão ou mucosas ao coçar). Recolha o inseto com um pote para envio ao posto de saúde/vigilância.",
        antivenomSerum: "Não aplicável (Tratamento etiológico com Benznidazol se infectado por T. cruzi)",
        imageSvg: "triatoma_infestans.svg"
    },
    {
        id: "panstrongylus_megistus",
        category: "barbeiros",
        scientificName: "Panstrongylus megistus",
        commonName: "Barbeiro-da-mata / Barbeiro-vermelho",
        isVenomousOrVector: true,
        urgencyLevel: "ALTA",
        vectorFor: "Doença de Chagas (Trypanosoma cruzi)",
        distribution: "Bioma Mata Atlântica e Cerrado (BA, MG, SP, RJ, PR, SC)",
        habitat: "Ocos de árvores, ninhos de gambás e roedores, invadindo casas atraído pela luz",
        keyIdentificationFeatures: [
            "Coloração preta dominante com manchas vermelho-vivas contrastantes no pronoto e conexivo.",
            "Cabeça curta e robusta, antenas inseridas próximas aos olhos.",
            "Porte grande: 28 a 34 mm de comprimento.",
            "Bico reto de 3 segmentos que repousa no sulco estridulatório sob o tórax."
        ],
        lookalikeDifferentiator: "Padrão vermelho e preto intenso; ataca agressivamente à noite quando as luzes se apagam.",
        firstAidProtocol: "Lave imediatamente o local com água e sabão. Não coce os olhos nem a picada. Acondicione o inseto vivo em frasco furado com papel higiênico e leve à Unidade Básica de Saúde.",
        antivenomSerum: "Não aplicável (Investigação laboratorial e Benznidazol se positivo)",
        imageSvg: "panstrongylus_megistus.svg"
    },
    {
        id: "percevejo_fitofago",
        category: "barbeiros",
        scientificName: "Acanthocephala / Leptoglossus spp.",
        commonName: "Percevejo fitófago inofensivo (Percevejo-de-planta)",
        isVenomousOrVector: false,
        urgencyLevel: "NENHUMA",
        vectorFor: "Nenhum (Totalmente inofensivo para humanos)",
        distribution: "Em todo o Brasil",
        habitat: "Árvores frutíferas, plantações, jardins e hortas",
        keyIdentificationFeatures: [
            "Bico (rostro) muito longo e fino, que ultrapassa facilmente o 1º e 2º pares de pernas, atingindo o meio do abdômen.",
            "Frequentemente possui expansões nas pernas traseiras parecendo 'folhas' (percevejo-pé-de-folha).",
            "Alimenta-se exclusivamente da seiva de plantas ou frutos.",
            "Exala cheiro forte característico ('maria-fedida') quando ameaçado."
        ],
        lookalikeDifferentiator: "O bico comprido que vai até a barriga elimina com 100% de certeza a hipótese de ser barbeiro!",
        firstAidProtocol: "Não há risco. Não precisa procurar hospital.",
        antivenomSerum: "Não necessário",
        imageSvg: "percevejo_fitofago.svg"
    },

    // ------------------------------------------------------------------------
    // 2. COBRAS E SERPENTES
    // ------------------------------------------------------------------------
    {
        id: "bothrops_jararaca",
        category: "cobras",
        scientificName: "Bothrops jararaca",
        commonName: "Jararaca (Jararaca-comum)",
        isVenomousOrVector: true,
        urgencyLevel: "EMERGÊNCIA",
        vectorFor: "Acidente Botrópico (70% a 85% dos acidentes com cobras no Brasil)",
        distribution: "Mata Atlântica, Cerrado e áreas de transição no Sul, Sudeste e Centro-Oeste",
        habitat: "Vegetação rasteira, beira de riachos, pilhas de lenha, entulhos e pastagens",
        keyIdentificationFeatures: [
            "Presença de Fosseta Loreal (orifício termorreceptor entre a narina e o olho) - marca de peçonha botrópica/crotálica.",
            "Cabeça triangular e achatada, recoberta por escamas pequenas e ásperas.",
            "Pupila vertical elíptica (olho de gato).",
            "Desenho dorsal com manchas triangulares escuras em forma de 'V' invertido ou trapézio.",
            "Cauda afinada lisa, SEM chocalho e sem espinho eriçado."
        ],
        lookalikeDifferentiator: "A fosseta loreal + cauda lisa fina diferencia a Jararaca da Cascavel e da Surucucu.",
        firstAidProtocol: "Lavar o local com água e sabão. Manter o membro elevado e em repouso absoluto. NUNCA faça torniquete ou garrote! NÃO corte o local! NÃO tente sugar o sangue! Leve a vítima ao hospital de referência imediatamente para aplicação do Soro Antibotrópico.",
        antivenomSerum: "Soro Antibotrópico (SAB) ou Soro Antibotrópico-Crotálico",
        imageSvg: "bothrops_jararaca.svg"
    },
    {
        id: "crotalus_durissus",
        category: "cobras",
        scientificName: "Crotalus durissus",
        commonName: "Cascavel (Cascavel-de-quatro-ventas)",
        isVenomousOrVector: true,
        urgencyLevel: "EMERGÊNCIA MÁXIMA",
        vectorFor: "Acidente Crotálico (Alta gravidade e letalidade sistêmica)",
        distribution: "Cerrado, Caatinga, campos abertos e pastagens em quase todo o país",
        habitat: "Regiões secas, pedregosas, pastos e áreas de capoeira (evita matas úmidas e densas)",
        keyIdentificationFeatures: [
            "Chocalho / guizo formado por anéis córneos na ponta da cauda que emite som característico quando ameaçada.",
            "Fosseta loreal evidente entre o olho e a narina.",
            "Desenho dorsal em losangos claros com bordas escuras.",
            "Coloração geral cinza-amarelada ou castanho-pálida.",
            "Veneno neurotóxico (ptose palpebral/fácies miastênica) e miotóxico (urina marrom escura por rabdomiólise)."
        ],
        lookalikeDifferentiator: "O guizo na ponta da cauda é único e exclusivo da Cascavel entre as serpentes brasileiras.",
        firstAidProtocol: "Emergência médica absoluta! A mioglobina liberada pode causar insuficiência renal aguda. Manter o paciente deitado e hidratado. NÃO garrotear. Administrar Soro Anticrotálico hospitalar o mais rápido possível.",
        antivenomSerum: "Soro Anticrotálico (SAC) ou Soro Antibotrópico-Crotálico",
        imageSvg: "crotalus_durissus.svg"
    },
    {
        id: "micrurus_corallinus",
        category: "cobras",
        scientificName: "Micrurus corallinus",
        commonName: "Coral-verdadeira",
        isVenomousOrVector: true,
        urgencyLevel: "EMERGÊNCIA CRÍTICA",
        vectorFor: "Acidente Elapídico (Parada respiratória por bloqueio neuromuscular)",
        distribution: "Mata Atlântica (litoral do Sul ao Sudeste do Brasil)",
        habitat: "Sob troncos caídos, serapilheira e tocas subterrâneas (hábito fossorial/noturno)",
        keyIdentificationFeatures: [
            "Anéis coloridos (vermelho, preto e branco/amarelo) que dão a volta COMPLETA por todo o abdômen e ventre.",
            "Olhos muito pequenos e pretos, cabeça arredondada contínua com o corpo (sem pescoço definido).",
            "NÃO tem fosseta loreal.",
            "Dentição proteróglifa (presas pequenas fixas na parte anterior da boca).",
            "Veneno neurotóxico fulminante que bloqueia a transmissão sináptica muscular em poucas horas."
        ],
        lookalikeDifferentiator: "Coral verdadeira tem anéis que dão a volta completa na barriga, pupila redonda e olhos minúsculos; falsas-corais costumam ter barriga esbranquiçada ou anéis imperfeitos no ventre.",
        firstAidProtocol: "Risco iminente de asfixia e parada respiratória por paralisia dos músculos do diafragma. Não perca tempo: transporte imediato a um pronto-socorro com respirador mecânico e Soro Antielapídico.",
        antivenomSerum: "Soro Antielapídico (SAE)",
        imageSvg: "micrurus_corallinus.svg"
    },
    {
        id: "falsa_coral",
        category: "cobras",
        scientificName: "Oxyrhopus guibei / Erythrolamprus spp.",
        commonName: "Falsa-coral inofensiva",
        isVenomousOrVector: false,
        urgencyLevel: "BAIXA",
        vectorFor: "Nenhum (Sem peçonha de risco médico para seres humanos)",
        distribution: "Presente em praticamente todo o Brasil",
        habitat: "Jardins, beiras de mata, plantações e hortas",
        keyIdentificationFeatures: [
            "Padrão de anéis vermelhos e pretos que NÃO completam a volta na região ventral (barriga clara ou manchada).",
            "Olhos proporcionais com pupila elíptica ou redonda bem visível.",
            "Dentição opistóglifa (dentes aumentados no fundo da garganta) ou áglifa (sem presas inoculadoras).",
            "Comportamento dócil e tímido."
        ],
        lookalikeDifferentiator: "Ventre sem os anéis perfeitos que circundam o corpo da coral verdadeira.",
        firstAidProtocol: "Lavar a picada com água e sabão. Como a diferenciação de corais pode ser perigosa para leigos, qualquer mordida de serpente anelada deve ser avaliada em ambiente médico.",
        antivenomSerum: "Geralmente desnecessário (observação clínica)",
        imageSvg: "falsa_coral.svg"
    },

    // ------------------------------------------------------------------------
    // 3. ESCORPIÕES
    // ------------------------------------------------------------------------
    {
        id: "tityus_serrulatus",
        category: "escorpioes",
        scientificName: "Tityus serrulatus",
        commonName: "Escorpião-amarelo",
        isVenomousOrVector: true,
        urgencyLevel: "EMERGÊNCIA CRÍTICA (Especialmente Crianças e Idosos)",
        vectorFor: "Acidente Escorpiônico Grave (Principal causa de óbito por peçonha no Brasil)",
        distribution: "Sudeste (SP, MG, RJ, ES), Centro-Oeste, Nordeste e Sul",
        habitat: "Entulhos de construção, redes de esgoto, galerias subterrâneas, frestas, sapatos e ralos",
        keyIdentificationFeatures: [
            "Tronco (cefalotórax e abdômen) castanho-escuro com pernas, pedipalpos (garras) e cauda amarelo-claros.",
            "Presença de serrilha (crista serrilhada de dentículos) na parte dorsal dos últimos segmentos da cauda (metassoma) - marca diagnóstica!",
            "Tamanho médio entre 6 e 7 cm.",
            "Reprodução por partenogênese (fêmeas geram filhotes sem necessidade de macho)."
        ],
        lookalikeDifferentiator: "A serrilha no final da cauda e pernas amarelas sem manchas o distinguem do escorpião-marrom.",
        firstAidProtocol: "Dor intensa e imediata no local. Fazer compressas com água MORNA para aliviar a dor (a água morna vasodilata e ajuda no alívio álgico; gelo piora!). NÃO amarre nem corte. Em crianças menores de 10 anos, correr imediatamente para a emergência para receber Soro Antiescorpiônico em até 2 horas.",
        antivenomSerum: "Soro Antiescorpiônico (SAEsc) ou Soro Antiaracnídico (SAAr)",
        imageSvg: "tityus_serrulatus.svg"
    },
    {
        id: "tityus_bahiensis",
        category: "escorpioes",
        scientificName: "Tityus bahiensis",
        commonName: "Escorpião-marrom",
        isVenomousOrVector: true,
        urgencyLevel: "ALTA",
        vectorFor: "Acidente Escorpiônico Moderado a Grave",
        distribution: "Sudeste, Sul e Centro-Oeste do Brasil",
        habitat: "Troncos podres, cascas de árvores, pastagens, frestas de muros e caixas de gordura",
        keyIdentificationFeatures: [
            "Coloração marrom-avermelhada escura generalizada.",
            "Pernas e pedipalpos com manchas escuras mescladas (não são amarelas homogêneas).",
            "NÃO possui a crista serrilhada no final da cauda (diferente do Tityus serrulatus).",
            "Tamanho entre 6 e 7.5 cm."
        ],
        lookalikeDifferentiator: "Manchas escuras nas pernas e ausência de serrilha dorsal na cauda.",
        firstAidProtocol: "Lavar com água e sabão, aplicar compressa de água morna para alívio da dor excruciante e encaminhar a atendimento médico hospitalar.",
        antivenomSerum: "Soro Antiescorpiônico (SAEsc) ou Soro Antiaracnídico (SAAr)",
        imageSvg: "tityus_bahiensis.svg"
    },

    // ------------------------------------------------------------------------
    // 4. ARANHAS
    // ------------------------------------------------------------------------
    {
        id: "phoneutria_nigriventer",
        category: "aranhas",
        scientificName: "Phoneutria nigriventer",
        commonName: "Aranha-armadeira (Aranha-da-banana)",
        isVenomousOrVector: true,
        urgencyLevel: "EMERGÊNCIA",
        vectorFor: "Acidente Ctenídico / Phoneutrismo (Dor extrema e estimulação autonômica)",
        distribution: "Sudeste, Centro-Oeste e Sul do Brasil",
        habitat: "Entulhos, bananeiras, folhas de palmeira, calçados guardados e cortinas",
        keyIdentificationFeatures: [
            "Postura de defesa clássica: ergue os 2 pares de pernas dianteiras na vertical em 90°, mostra as quelíceras e dá saltos para frente.",
            "Olhos dispostos em 3 filas (2 - 4 - 2), com 4 olhos centrais formando um trapézio.",
            "Quelíceras (ferrões) com cerdas alaranjadas ou avermelhadas vivas.",
            "Porte grande: corpo de 3 a 5 cm com envergadura de pernas podendo atingir 15 cm.",
            "Desenho em linhas de pequenos pontos claros ao longo do abdômen dorsal."
        ],
        lookalikeDifferentiator: "A postura agressiva 'armada' em pé + olhos 2-4-2 + pelos avermelhados nas quelíceras a separam de caranguejeiras e aranhas de jardim.",
        firstAidProtocol: "Dor lancinante imediata, taquicardia, sudorese intensa e priapismo (ereção dolorosa involuntária em meninos). Fazer compressa morna e procurar o pronto-socorro para bloqueio anestésico local e Soro Antiaracnídico se houver manifestações sistêmicas.",
        antivenomSerum: "Soro Antiaracnídico (SAAr)",
        imageSvg: "phoneutria_nigriventer.svg"
    },
    {
        id: "loxosceles_intermedia",
        category: "aranhas",
        scientificName: "Loxosceles intermedia / L. gaucho",
        commonName: "Aranha-marrom",
        isVenomousOrVector: true,
        urgencyLevel: "ALERTA CRÍTICO (Ação Lenta Necrosante)",
        vectorFor: "Acidente Loxoscélico (Necrose cutânea grave e forma hemolítica visceral)",
        distribution: "Sul (especialmente PR, SC, RS) e Sudeste do Brasil",
        habitat: "Atrás de quadros, rodapés, livros antigos, guarda-roupas, pilhas de telhas e roupas guardadas",
        keyIdentificationFeatures: [
            "Olhos: 6 olhos dispostos em 3 pares (díades em forma de semicírculo ou 'V'), ao invés de 8 olhos da maioria das aranhas.",
            "Desenho no cefalotórax lembrando a silhueta de um 'violino' com o braço apontando para trás.",
            "Corpo pequeno (1 a 1.5 cm) com pernas longas e finas desprovidas de espinhos grossos.",
            "Coloração marrom-clara homogênea e aparência delicada e tímida (não arma bote).",
            "Teia irregular algodonosa em frestas."
        ],
        lookalikeDifferentiator: "6 olhos em 3 pares + violino no cefalotórax + pernas lisas finas.",
        firstAidProtocol: "A picada é quase indolor e muitas vezes passa despercebida! Em 12 a 24 horas, o local fica endurecido, pálido no centro e violáceo na borda ('placa marmórea'), evoluindo para necrose preta que deixa úlcera profunda. Se suspeitar de contato, procure assistência médica precoce para Soro Antiloxoscélico ou Antiaracnídico.",
        antivenomSerum: "Soro Antiloxoscélico ou Soro Antiaracnídico (SAAr)",
        imageSvg: "loxosceles_intermedia.svg"
    },
    {
        id: "latrodectus_curacaviensis",
        category: "aranhas",
        scientificName: "Latrodectus curacaviensis",
        commonName: "Viúva-negra (Flamenguinha / Aranha-do-marmeleiro)",
        isVenomousOrVector: true,
        urgencyLevel: "ALTA",
        vectorFor: "Acidente Latrodéctico (Latrotoxina: espasmos musculares severos)",
        distribution: "Litoral do Rio de Janeiro, Nordeste (Caatinga) e restingas",
        habitat: "Vegetação rasteira, bromélias de praia, cercas velhas e plantações de algodão",
        keyIdentificationFeatures: [
            "Abdômen globoso, arredondado e preto brilhante com manchas vermelhas contrastantes no dorso ou ventre.",
            "Porte pequeno (fêmea com cerca de 1 a 1.5 cm de corpo).",
            "Teia tridimensional irregular muito resistente no solo ou vegetação baixa."
        ],
        lookalikeDifferentiator: "Abdômen esférico preto lustroso com desenhos vermelhos bem delimitados.",
        firstAidProtocol: "Dor local intensa que irradia para o abdômen causando abdome em tábua (espasmos musculares que simulam apendicite), tremores e sudorese. Procurar atendimento médico hospitalar para analgesia, relaxantes musculares e Soro Antilatrodéctico.",
        antivenomSerum: "Soro Antilatrodéctico (SALatr)",
        imageSvg: "latrodectus_curacaviensis.svg"
    },
    {
        id: "lycosa_erythrognatha",
        category: "aranhas",
        scientificName: "Lycosa erythrognatha",
        commonName: "Aranha-de-jardim (Aranha-lobo / Tarântula de grama)",
        isVenomousOrVector: false,
        urgencyLevel: "BAIXA",
        vectorFor: "Nenhum (Peçonha não tem relevância médica grave)",
        distribution: "Presente em todo o Brasil",
        habitat: "Gramados, jardins, pastagens e solos secos com tocas",
        keyIdentificationFeatures: [
            "Desenho no dorso do abdômen em formato de ponta de seta preta ou cinza.",
            "Quelíceras revestidas por pelos alaranjados.",
            "Foge rapidamente quando aproximada (não assume postura armada em pé como a Phoneutria).",
            "Fêmeas frequentemente carregam a ooteca (bolsa de ovos) presa às fiandeiras ou centenas de filhotes nas costas."
        ],
        lookalikeDifferentiator: "Desenho de seta dorsal + hábito de carregar filhotes no abdômen.",
        firstAidProtocol: "Dor local passageira de intensidade leve a moderada. Lavar com água e sabão e fazer compressa fria. Não requer soro antipeçonhento.",
        antivenomSerum: "Não necessário",
        imageSvg: "lycosa_erythrognatha.svg"
    }
];

// ----------------------------------------------------------------------------
// GUIA DE SOROS ANTIOFÍDICOS, ANTIESCORPIÔNICOS E ANTIARACNÍDICOS
// ----------------------------------------------------------------------------
const ANTIVENOM_GUIDE = [
    {
        name: "Soro Antibotrópico (SAB)",
        target: "Jararacas, Jararacuçus, Urutus, Caiçacas (Gênero Bothrops)",
        action: "Neutraliza peçonha proteolítica, hemorrágica e coagulante.",
        dosageInfo: "Leve (2 a 4 ampolas), Moderado (4 a 8 ampolas), Grave (12 ampolas IV)."
    },
    {
        name: "Soro Anticrotálico (SAC)",
        target: "Cascaveris (Gênero Crotalus)",
        action: "Neutraliza peçonha neurotóxica e miotóxica (evita lesão renal aguda).",
        dosageInfo: "Moderado (10 ampolas), Grave (20 ampolas IV)."
    },
    {
        name: "Soro Antielapídico (SAE)",
        target: "Corais-verdadeiras (Gênero Micrurus)",
        action: "Neutraliza neurotoxina pós e pré-sináptica contra paralisia respiratória.",
        dosageInfo: "10 ampolas IV imediatas em qualquer acidente suspeito confirmado."
    },
    {
        name: "Soro Antiescorpiônico (SAEsc)",
        target: "Escorpiões amarelos e marrons (Gênero Tityus)",
        action: "Neutraliza neurotoxinas escorpiônicas que causam edema pulmonar agudo.",
        dosageInfo: "Moderado (2 a 3 ampolas), Grave com sintomas sistêmicos (4 a 6 ampolas IV)."
    },
    {
        name: "Soro Antiaracnídico (SAAr)",
        target: "Aranhas-armadeiras (Phoneutria) e Aranhas-marrons (Loxosceles)",
        action: "Polivalente contra neurotoxinas de armadeira e esfingomielinase D de aranha-marrom.",
        dosageInfo: "Conforme gravidade clínica do loxoscelismo ou phoneutrismo."
    }
];

// ----------------------------------------------------------------------------
// CONTATOS E PROTOCOLOS DE EMERGÊNCIA
// ----------------------------------------------------------------------------
const EMERGENCY_CONTACTS = {
    ciatoxNational: "0800 722 6001 (Disque-Intoxicação Nacional - Gratuito 24h)",
    samu: "192 (Serviço de Atendimento Móvel de Urgência)",
    bombeiros: "193 (Resgate e captura de espécimes em risco residencial)",
    goldenRules: [
        "1. Mantenha a vítima em repouso absoluto. Acelerar os batimentos dispersa a peçonha mais rápido pelo corpo.",
        "2. Lave a ferida apenas com água e sabão neutro.",
        "3. Mantenha o membro picado elevado se possível.",
        "4. NUNCA faça torniquete ou garrote (aumenta o risco de gangrena e amputação).",
        "5. NUNCA corte, fure ou chupe o local da picada.",
        "6. Não aplique borra de café, querosene, folhas ou substâncias caseiras.",
        "7. Se seguro, fotografe o animal de longe para facilitar a escolha imediata do soro pelos médicos no hospital."
    ]
};

// Exportação universal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ANIMAL_CATEGORIES,
        SPECIMENS_DATABASE,
        ANTIVENOM_GUIDE,
        EMERGENCY_CONTACTS
    };
} else {
    window.BICHINHOS_DB = {
        ANIMAL_CATEGORIES,
        SPECIMENS_DATABASE,
        ANTIVENOM_GUIDE,
        EMERGENCY_CONTACTS
    };
}
