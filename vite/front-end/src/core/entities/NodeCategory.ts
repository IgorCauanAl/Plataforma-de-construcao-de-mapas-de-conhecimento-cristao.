export type NodeCategoryField = {
    id: string;
    label: string;
    placeholder: string;
};

export type NodeCategory = {
    id: string;
    label: string;
    color: string;
    icon: string;
    panelTitle: string;
    panelBadge: string;
    fields: NodeCategoryField[];
};

export const NODE_CATEGORIES = [
    {
        id: 'biografia',
        label: 'Biografia',
        color: '#2E4A62',
        icon: 'person',
        panelTitle: 'Atributos Biográficos',
        panelBadge: 'Biografia',
        fields: [
            { id: 'periodo', label: 'Período de Vida', placeholder: 'Ex.: 354 d.C. – 430 d.C.' },
            { id: 'tradicao', label: 'Tradição de Origem', placeholder: 'Ex.: Paulina / Ocidental' },
        ],
    },
    {
        id: 'debate',
        label: 'Debate',
        color: '#E8586A',
        icon: 'forum',
        panelTitle: 'Eixos do Debate',
        panelBadge: 'Debate',
        fields: [
            { id: 'questao', label: 'Questão Central', placeholder: 'Ex.: Predestinação e liberdade' },
            { id: 'confronto', label: 'Tradições em Confronto', placeholder: 'Ex.: Augustinianismo vs. Pelagianismo' },
        ],
    },
    {
        id: 'fonte-historica',
        label: 'Fonte Histórica',
        color: '#A8875A',
        icon: 'history_edu',
        panelTitle: 'Dados da Fonte',
        panelBadge: 'Fonte Histórica',
        fields: [
            { id: 'tipo', label: 'Tipo de Fonte', placeholder: 'Ex.: Primária / Secundária' },
            { id: 'autoria', label: 'Autoria e Data', placeholder: 'Ex.: Eusébio de Cesareia, 325 d.C.' },
        ],
    },
    {
        id: 'tradicao',
        label: 'Tradição',
        color: '#5F7A4B',
        icon: 'account_tree',
        panelTitle: 'Atributos da Tradição',
        panelBadge: 'Tradição / Movimento',
        fields: [
            { id: 'corrente', label: 'Corrente Teológica', placeholder: 'Ex.: Protestante' },
            { id: 'predominio', label: 'Período de Predomínio', placeholder: 'Ex.: séc. XVI – hoje' },
        ],
    },
    {
        id: 'doutrina',
        label: 'Doutrina',
        color: '#B5654F',
        icon: 'auto_stories',
        panelTitle: 'Atributos Doutrinários',
        panelBadge: 'Doutrina / Conceito',
        fields: [
            { id: 'tema', label: 'Tema Teológico Central', placeholder: 'Ex.: Soteriologia' },
            { id: 'tradicao', label: 'Tradição Associada', placeholder: 'Ex.: Paulina / Protestante' },
        ],
    },
    {
        id: 'geografia',
        label: 'Geografia',
        color: '#3F7C85',
        icon: 'explore',
        panelTitle: 'Dados Geográficos',
        panelBadge: 'Geografia Histórica',
        fields: [
            { id: 'regiao', label: 'Região / Império', placeholder: 'Ex.: Império Romano' },
            { id: 'local', label: 'Cidade ou Local', placeholder: 'Ex.: Hipona, Espanha' },
        ],
    },
    {
        id: 'concilio',
        label: 'Concílio',
        color: '#7A4A6B',
        icon: 'assured_workload',
        panelTitle: 'Atributos do Acontecimento',
        panelBadge: 'Concílio / Acontecimento',
        fields: [
            { id: 'data', label: 'Data do Evento', placeholder: 'Ex.: 325 d.C.' },
            { id: 'decisoes', label: 'Participantes / Decisões', placeholder: 'Ex.: 318 bispos, credo de Niceia' },
        ],
    },
    {
        id: 'texto-biblico',
        label: 'Texto Bíblico',
        color: '#6B4A3A',
        icon: 'menu_book',
        panelTitle: 'Referências Bíblicas',
        panelBadge: 'Texto Bíblico',
        fields: [
            { id: 'livro', label: 'Livro / Capítulo', placeholder: 'Ex.: Romanos 3' },
            { id: 'autoria', label: 'Autoria e Tradição', placeholder: 'Ex.: Paulo de Tarso' },
        ],
    },
] as const satisfies readonly NodeCategory[];

export type NodeCategoryId = (typeof NODE_CATEGORIES)[number]['id'];

export const DEFAULT_CATEGORY_ID: NodeCategoryId = 'doutrina';

export function findCategory(categoryId: string): NodeCategory {
    return NODE_CATEGORIES.find((category) => category.id === categoryId) ?? NODE_CATEGORIES[0];
}
