import {findCategory} from '../../../../../core/entities/NodeCategory';
import type {NodeCategoryId} from '../../../../../core/entities/NodeCategory';
import {SidePeekShell} from './SidePeekShell';
import type {SidePeekMetadataEntry} from './SidePeekShell';

type NotesSidePeekProps = {
    attributes: Record<string, string>;
    categoryId: NodeCategoryId;
    isExpanded: boolean;
    isOpen: boolean;
    notes: string;
    title: string;
    onClose: () => void;
    onExpandChange: (isExpanded: boolean) => void;
    onNotesChange: (notes: string) => void;
    onShare: () => void;
};

const NOTES_PLACEHOLDER = 'Comece a digitar seu estudo com formatação Markdown...';
const SYNC_LABEL = 'Sincronizado com TheoGraph Core';
const FALLBACK_WIKI_LINK_LABEL = 'Nó Teológico';
const UNTITLED_NODE_LABEL = 'Novo Nó';

function stripAccents(value: string): string {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

export function NotesSidePeek({
                                  attributes,
                                  categoryId,
                                  isExpanded,
                                  isOpen,
                                  notes,
                                  title,
                                  onClose,
                                  onExpandChange,
                                  onNotesChange,
                                  onShare,
                              }: NotesSidePeekProps) {
    const category = findCategory(categoryId);
    const displayTitle = title.trim() || UNTITLED_NODE_LABEL;

    const metadata: SidePeekMetadataEntry[] = [
        {icon: 'account_circle', label: 'Nó', value: displayTitle},
        {icon: 'tune', label: 'Classificação', value: category.panelBadge},
        ...category.fields
            .map((field) => ({icon: 'sell', label: field.label, value: attributes[field.id] ?? ''}))
            .filter((entry) => entry.value.trim() !== ''),
    ];

    return (
        <SidePeekShell
            accentColor={category.color}
            ariaLabel="Editor de anotações em Markdown"
            breadcrumb={[
                {label: 'Notas de Estudo'},
                {label: category.panelBadge},
                {label: stripAccents(category.label), hasIcon: true},
            ]}
            isExpanded={isExpanded}
            isOpen={isOpen}
            metadata={metadata}
            onChange={onNotesChange}
            onClose={onClose}
            onExpandChange={onExpandChange}
            onShare={onShare}
            placeholder={NOTES_PLACEHOLDER}
            shareTitle="Compartilhar nota"
            syncLabel={SYNC_LABEL}
            title={displayTitle}
            value={notes}
            wikiLinkFallback={title.trim() || FALLBACK_WIKI_LINK_LABEL}
        />
    );
}
