import {findCategory} from '../../../../../core/entities/NodeCategory';
import type {NodeCategoryId} from '../../../../../core/entities/NodeCategory';
import {findGraphNode, findRelationType, getRelationPrompt} from '../../../../../core/entities/NodeRelation';
import type {GraphNodeSummary, NodeRelation} from '../../../../../core/entities/NodeRelation';
import {SidePeekShell} from './SidePeekShell';
import type {SidePeekMetadataEntry} from './SidePeekShell';

type RelationSidePeekProps = {
    categoryId: NodeCategoryId;
    foundation: string;
    isExpanded: boolean;
    isOpen: boolean;
    nodes: GraphNodeSummary[];
    relation: NodeRelation;
    sourceTitle: string;
    onChange: (foundation: string) => void;
    onClose: () => void;
    onExpandChange: (isExpanded: boolean) => void;
    onShare: () => void;
};

const RELATION_LABEL = 'Fundamentação da Relação';
const SYNC_LABEL = 'Sincronizado com TheoGraph Core';
const FALLBACK_WIKI_LINK_LABEL = 'Nó Teológico';
const UNTITLED_SOURCE_LABEL = 'Novo Nó';
const UNTITLED_TARGET_LABEL = 'Nó não selecionado';
const PENDING_RELATION_LABEL = 'Relação ainda não definida';

export function RelationSidePeek({
                                     categoryId,
                                     foundation,
                                     isExpanded,
                                     isOpen,
                                     nodes,
                                     relation,
                                     sourceTitle,
                                     onChange,
                                     onClose,
                                     onExpandChange,
                                     onShare,
                                 }: RelationSidePeekProps) {
    const category = findCategory(categoryId);
    const relationType = findRelationType(relation.typeId);
    const targetNode = findGraphNode(nodes, relation.targetNodeId);
    const displayTitle = relationType
        ? `${relationType.label} · ${targetNode?.title ?? UNTITLED_TARGET_LABEL}`
        : PENDING_RELATION_LABEL;
    const sourceLabel = sourceTitle.trim() || UNTITLED_SOURCE_LABEL;

    const metadata: SidePeekMetadataEntry[] = [
        {icon: 'route', label: 'Relação', value: relationType?.label ?? PENDING_RELATION_LABEL},
        {icon: 'login', label: 'Nó de origem', value: sourceLabel},
        {icon: 'outbound', label: 'Nó relacionado', value: targetNode?.title ?? UNTITLED_TARGET_LABEL},
    ];

    if (targetNode) {
        metadata.push({
            icon: 'tune',
            label: 'Classificação do alvo',
            value: findCategory(targetNode.categoryId).panelBadge,
        });
    }

    return (
        <SidePeekShell
            accentColor={category.color}
            ariaLabel="Editor de fundamentação da relação em Markdown"
            breadcrumb={[
                {label: RELATION_LABEL},
                {label: relationType?.label ?? PENDING_RELATION_LABEL},
                {label: category.label, hasIcon: true},
            ]}
            isExpanded={isExpanded}
            isOpen={isOpen}
            metadata={metadata}
            onChange={onChange}
            onClose={onClose}
            onExpandChange={onExpandChange}
            onShare={onShare}
            placeholder={getRelationPrompt(relation)}
            shareTitle="Compartilhar fundamentação"
            syncLabel={SYNC_LABEL}
            title={displayTitle}
            value={foundation}
            wikiLinkFallback={targetNode?.title ?? FALLBACK_WIKI_LINK_LABEL}
        />
    );
}
