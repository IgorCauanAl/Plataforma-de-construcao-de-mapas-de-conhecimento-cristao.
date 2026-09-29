import type {NodeCategoryId} from './NodeCategory';

export type NodeRelationType = {
    id: string;
    label: string;
    icon: string;
    description: string;
};

export const NODE_RELATION_TYPES = [
    {
        id: 'fundamenta',
        label: 'Fundamenta',
        icon: 'foundation',
        description: 'Serve de base textual ou lógica para a outra afirmação.',
    },
    {
        id: 'instruiu',
        label: 'Instruiu',
        icon: 'menu_book',
        description: 'Orienta a prática, a conduta ou a leitura do nó relacionado.',
    },
    {
        id: 'critica',
        label: 'Critica / Opõe-se a',
        icon: 'balance',
        description: 'Contesta, tensiona ou contrapõe-se ao nó relacionado.',
    },
    {
        id: 'influenciou',
        label: 'Influenciou',
        icon: 'trending_up',
        description: 'Exercitou influência histórica ou receptiva sobre o nó relacionado.',
    },
    {
        id: 'interpreta',
        label: 'Interpreta',
        icon: 'rate_review',
        description: 'Oferece uma leitura exegética ou hermenêutica do nó relacionado.',
    },
] as const satisfies readonly NodeRelationType[];

export type NodeRelationTypeId = (typeof NODE_RELATION_TYPES)[number]['id'];

export type GraphNodeSummary = {
    id: string;
    title: string;
    categoryId: NodeCategoryId;
};

export type NodeRelation = {
    typeId: string;
    targetNodeId: string | null;
    foundation: string;
};

export const EMPTY_RELATION: NodeRelation = {
    typeId: '',
    targetNodeId: null,
    foundation: '',
};

export const RELATION_PROMPT: Record<string, string> = {
    fundamenta: 'Descreva a base textual ou lógica que sustenta esta afirmação...',
    instruiu: 'Registre como este nó orienta a prática ou a leitura do outro...',
    critica: 'Descreva os pontos de tensão com o nó relacionado...',
    influenciou: 'Descreva a trajetória e os meios desta influência...',
    interpreta: 'Descreva a chave de leitura proposta sobre o nó relacionado...',
};

export const FALLBACK_RELATION_PROMPT =
    'Descreva a fundamentação que sustenta esta relação entre os nós...';

export const GRAPH_NODE_INDEX: GraphNodeSummary[] = [
    {id: 'epistola-romanos', title: 'Epístola aos Romanos', categoryId: 'texto-biblico'},
    {id: 'justificacao-fe', title: 'Justificação pela Fé', categoryId: 'doutrina'},
    {id: 'concilio-niceia', title: 'Concílio de Niceia', categoryId: 'concilio'},
    {id: 'paulo-tarso', title: 'Paulo de Tarso', categoryId: 'biografia'},
    {id: 'agostinho-hipona', title: 'Agostinho de Hipona', categoryId: 'biografia'},
    {id: 'pecado-original', title: 'Pecado Original', categoryId: 'doutrina'},
    {id: 'predestinacao', title: 'Predestinação', categoryId: 'debate'},
    {id: 'reforma-protestante-trad', title: 'Reforma Protestante', categoryId: 'tradicao'},
    {id: 'imperio-romano', title: 'Império Romano', categoryId: 'geografia'},
    {id: 'eusebio-cesareia', title: 'Eusébio de Cesareia', categoryId: 'fonte-historica'},
];

export function findRelationType(typeId: string): NodeRelationType | undefined {
    return NODE_RELATION_TYPES.find((relationType) => relationType.id === typeId);
}

export function findGraphNode(
    nodes: GraphNodeSummary[],
    nodeId: string | null,
): GraphNodeSummary | undefined {
    if (nodeId === null) {
        return undefined;
    }

    return nodes.find((node) => node.id === nodeId);
}

export function getRelationPrompt(relation: NodeRelation): string {
    return RELATION_PROMPT[relation.typeId] ?? FALLBACK_RELATION_PROMPT;
}
