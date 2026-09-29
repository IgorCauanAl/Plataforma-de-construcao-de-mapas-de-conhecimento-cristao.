import type {GraphNodeSummary} from '../../../../../core/entities/NodeRelation';

export const NODE_SEARCH_RESULT_LIMIT = 6;

function normalize(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export function filterGraphNodes(
    nodes: GraphNodeSummary[],
    query: string,
    limit: number = NODE_SEARCH_RESULT_LIMIT,
): GraphNodeSummary[] {
    const term = normalize(query);

    if (term === '') {
        return nodes.slice(0, limit);
    }

    return nodes
        .filter((node) => normalize(node.title).includes(term))
        .slice(0, limit);
}
