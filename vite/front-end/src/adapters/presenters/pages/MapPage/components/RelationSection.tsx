import {useMemo, useRef, useState} from 'react';
import type {KeyboardEvent as ReactKeyboardEvent} from 'react';

import {findCategory} from '../../../../../core/entities/NodeCategory';
import {NODE_RELATION_TYPES, findGraphNode, findRelationType} from '../../../../../core/entities/NodeRelation';
import type {GraphNodeSummary, NodeRelation} from '../../../../../core/entities/NodeRelation';
import {countWords} from '../lib/markdownEditing';
import {filterGraphNodes} from '../lib/nodeSearch';

type RelationSectionProps = {
    nodes: GraphNodeSummary[];
    relation: NodeRelation;
    onChange: (relation: NodeRelation) => void;
    onOpenFoundation: () => void;
};

const RELATION_PANEL_STYLE = {
    backgroundColor: '#F6EFE2',
    border: '1px solid #DCCDB6',
} as const;

const FIELD_BORDER_STYLE = {border: '1px solid #DCCDB6'} as const;

const FOUNDATION_BUTTON_CLASS =
    'w-full mt-1 py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 font-medium font-body-sm text-[#2E4A62] bg-[#FAF8F5] transition-all hover:bg-[#F0EDE6] hover:border-[#BFA584] group';

const FOUNDATION_BUTTON_BORDER_STYLE = {border: '1.5px dashed #DCCDB6'} as const;

const NO_RESULTS_LABEL = 'Nenhum nó encontrado no mapa';
const CLEAR_TARGET_LABEL = 'Remover vínculo';
const LISTBOX_ID = 'relation-target-listbox';
const OPTION_ID_PREFIX = 'relation-target-option';

export function RelationSection({
                                    nodes,
                                    relation,
                                    onChange,
                                    onOpenFoundation,
                                }: RelationSectionProps) {
    const [query, setQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const relationType = findRelationType(relation.typeId);
    const targetNode = findGraphNode(nodes, relation.targetNodeId);
    const results = useMemo(() => filterGraphNodes(nodes, query), [nodes, query]);
    const hasQueryResults = results.length > 0;
    const isListboxVisible = isSearchOpen && (hasQueryResults || query.trim() !== '');

    const closeSearch = () => {
        setIsSearchOpen(false);
        setActiveIndex(0);
    };

    const handleSelectTarget = (node: GraphNodeSummary) => {
        onChange({...relation, targetNodeId: node.id});
        setQuery('');
        closeSearch();
    };

    const handleClearTarget = () => {
        onChange({...relation, targetNodeId: null});
        setQuery('');
        closeSearch();
        searchInputRef.current?.focus();
    };

    const handleSearchKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            event.stopPropagation();
            closeSearch();
            return;
        }

        if (!isListboxVisible || !hasQueryResults) {
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((current) => (current + 1) % results.length);
            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((current) => (current - 1 + results.length) % results.length);
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            const activeResult = results[activeIndex];

            if (activeResult) {
                handleSelectTarget(activeResult);
            }
        }
    };

    return (
        <div className="space-y-2.5 pt-2">
            <label className="font-label-md text-label-md text-text-ink font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">route</span>
                Estabelecer Relação
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg" style={RELATION_PANEL_STYLE}>
                <div className="space-y-1">
                    <label className="font-label-sm text-label-sm text-text-ink font-medium" htmlFor="relation-type">
                        Tipo de Relação
                    </label>
                    <div className="relative">
                        <select
                            className="w-full h-9 px-3 bg-surface-white rounded text-text-ink font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary appearance-none"
                            id="relation-type"
                            onChange={(event) => onChange({...relation, typeId: event.target.value})}
                            style={FIELD_BORDER_STYLE}
                            value={relation.typeId}
                        >
                            <option disabled value="">
                                Selecione a ação...
                            </option>
                            {NODE_RELATION_TYPES.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <span
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-outline pointer-events-none">
                            expand_more
                        </span>
                    </div>
                    {relationType && (
                        <p className="font-label-sm text-label-sm text-outline leading-snug">
                            {relationType.description}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <label className="font-label-sm text-label-sm text-text-ink font-medium" htmlFor="relation-target">
                        Nó Relacionado
                    </label>
                    <div className="relative">
                        <span
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[16px] text-outline">
                            search
                        </span>
                        <input
                            aria-activedescendant={
                                isListboxVisible && hasQueryResults
                                    ? `${OPTION_ID_PREFIX}-${activeIndex}`
                                    : undefined
                            }
                            aria-autocomplete="list"
                            aria-controls={LISTBOX_ID}
                            aria-expanded={isListboxVisible}
                            autoComplete="off"
                            className="w-full h-9 pl-8 pr-3 bg-surface-white rounded text-text-ink font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary"
                            id="relation-target"
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setIsSearchOpen(true);
                                setActiveIndex(0);
                            }}
                            onFocus={() => setIsSearchOpen(true)}
                            onKeyDown={handleSearchKeyDown}
                            placeholder="Buscar nó existente..."
                            ref={searchInputRef}
                            role="combobox"
                            style={FIELD_BORDER_STYLE}
                            type="text"
                            value={query}
                        />
                    </div>

                    {isSearchOpen && (
                        <>
                            <button
                                aria-hidden="true"
                                className="fixed inset-0 z-0 cursor-default"
                                onClick={closeSearch}
                                tabIndex={-1}
                                type="button"
                            />
                            <div className="relative z-10">
                                <ul
                                    className="absolute left-0 right-0 top-1 mt-1 max-h-52 overflow-y-auto rounded-lg bg-surface-white shadow-lg py-1"
                                    id={LISTBOX_ID}
                                    role="listbox"
                                    style={{border: '1px solid #DCCDB6'}}
                                >
                                    {hasQueryResults ? (
                                        results.map((node, index) => {
                                            const nodeCategory = findCategory(node.categoryId);

                                            return (
                                                <li
                                                    aria-selected={index === activeIndex}
                                                    className={index === activeIndex ? 'bg-surface-container-low' : undefined}
                                                    id={`${OPTION_ID_PREFIX}-${index}`}
                                                    key={node.id}
                                                    role="option"
                                                >
                                                    <button
                                                        className="w-full px-3 py-2 flex items-center gap-2 text-left transition-colors hover:bg-surface-container-low"
                                                        onClick={() => handleSelectTarget(node)}
                                                        onMouseEnter={() => setActiveIndex(index)}
                                                        type="button"
                                                    >
                                                        <span
                                                            className="w-2 h-2 rounded-full shrink-0"
                                                            style={{backgroundColor: nodeCategory.color}}
                                                        />
                                                        <span
                                                            className="font-body-sm text-body-sm text-text-ink truncate">
                                                            {node.title}
                                                        </span>
                                                        <span
                                                            className="ml-auto font-label-sm text-label-sm text-outline shrink-0">
                                                            {nodeCategory.label}
                                                        </span>
                                                    </button>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li className="px-3 py-2 font-body-sm text-body-sm text-outline">
                                            {NO_RESULTS_LABEL}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </>
                    )}

                    {targetNode && (
                        <div className="flex items-center gap-1.5 pt-0.5">
                            <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{backgroundColor: findCategory(targetNode.categoryId).color}}
                            />
                            <span className="font-label-sm text-label-sm text-text-ink font-medium truncate">
                                {targetNode.title}
                            </span>
                            <button
                                className="ml-auto text-outline hover:text-status-error transition-colors shrink-0"
                                onClick={handleClearTarget}
                                title={CLEAR_TARGET_LABEL}
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <button
                className={FOUNDATION_BUTTON_CLASS}
                id="btn-abrir-side-peek-relacao"
                onClick={onOpenFoundation}
                style={FOUNDATION_BUTTON_BORDER_STYLE}
                type="button"
            >
                <span>🔗</span>
                <span>Escreva a fundamentação da relação</span>
                <span
                    className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors ml-1">
                    open_in_new
                </span>
            </button>

            {relation.foundation.trim() !== '' && (
                <p className="font-label-sm text-label-sm text-outline text-right">
                    {countWords(relation.foundation)} palavras ·{' '}
                    {relation.foundation.length.toLocaleString('pt-BR')} caracteres escritos
                </p>
            )}
        </div>
    );
}
