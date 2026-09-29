export type NodeSubmap = {
    id: string;
    label: string;
};

export const NODE_SUBMAPS: NodeSubmap[] = [
    { id: 'cristianismo-primitivo', label: 'Cristianismo Primitivo' },
    { id: 'reforma-protestante', label: 'Reforma Protestante' },
    { id: 'filosofia-e-fe', label: 'Filosofia e Fé' },
];

export function createSubmapLabel(existing: NodeSubmap[]): string {
    return `Novo Submapa ${existing.length + 1}`;
}

export function createSubmapId(existing: NodeSubmap[]): string {
    return `novo-submapa-${existing.length + 1}-${existing.length}`;
}
