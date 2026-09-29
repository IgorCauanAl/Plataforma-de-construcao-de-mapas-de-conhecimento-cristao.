import {useEffect, useRef} from 'react';

import {SUMMARY_MAX_LENGTH, TITLE_MAX_LENGTH} from '../../../../../core/entities/NodeDraft';
import type {NodeDraft} from '../../../../../core/entities/NodeDraft';
import type {GraphNodeSummary} from '../../../../../core/entities/NodeRelation';
import type {NodeSubmap} from '../../../../../core/entities/NodeSubmap';
import {countWords} from '../lib/markdownEditing';
import {AttributesPanel} from './AttributesPanel';
import {CategoryPicker} from './CategoryPicker';
import {RelationSection} from './RelationSection';
import {SubmapPicker} from './SubmapPicker';

type NodeCreatorModalProps = {
    draft: NodeDraft;
    isOpen: boolean;
    nodes: GraphNodeSummary[];
    submaps: NodeSubmap[];
    onChange: (draft: NodeDraft) => void;
    onClose: () => void;
    onCreateSubmap: () => void;
    onOpenNotes: () => void;
    onOpenRelationFoundation: () => void;
    onSubmit: () => void;
};

const TITLE_INPUT_CLASS =
    'w-full h-11 px-3.5 bg-surface-white rounded-lg text-text-ink font-body-md text-body-md transition-all outline-none';

const SUMMARY_TEXTAREA_CLASS =
    'w-full px-3.5 py-2.5 bg-surface-white rounded-lg text-text-ink font-body-sm text-body-sm transition-all outline-none resize-none focus:ring-1 focus:ring-primary';

function FieldHeading({
                          htmlFor,
                          hint,
                          isRequired,
                          label,
                      }: {
    htmlFor: string;
    hint: string;
    isRequired?: boolean;
    label: string;
}) {
    return (
        <div className="flex items-center justify-between">
            <label
                className="font-label-md text-label-md text-text-ink font-semibold flex items-center gap-1"
                htmlFor={htmlFor}
            >
                {label}
                {isRequired && <span className="text-status-error">*</span>}
            </label>
            <span className="font-label-sm text-label-sm text-outline">{hint}</span>
        </div>
    );
}

export function NodeCreatorModal({
                                     draft,
                                     isOpen,
                                     nodes,
                                     submaps,
                                     onChange,
                                     onClose,
                                     onCreateSubmap,
                                     onOpenNotes,
                                     onOpenRelationFoundation,
                                     onSubmit,
                                 }: NodeCreatorModalProps) {
    const titleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        titleInputRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            aria-labelledby="node-creator-title"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pl-[248px] overflow-y-auto"
            onClick={onClose}
            role="dialog"
            style={{backgroundColor: 'rgba(46, 74, 98, 0.40)', backdropFilter: 'blur(2px)'}}
        >
            <div
                className="relative w-full max-w-[640px] bg-surface-white rounded-[12px] my-auto flex flex-col max-h-[942px]"
                onClick={(event) => event.stopPropagation()}
                style={{boxShadow: '0 16px 40px rgba(27, 42, 56, 0.18)', border: '1px solid #DCCDB6'}}
            >
                <div
                    className="px-space-lg pt-6 pb-4 flex items-start justify-between shrink-0"
                    style={{borderBottom: '1px solid #DCCDB6'}}
                >
                    <div className="space-y-1">
                        <div className="flex items-center gap-space-sm">
                            <span className="w-2.5 h-2.5 rounded-full bg-category-doctrine"/>
                            <h2
                                className="font-headline-md text-headline-md font-bold text-text-ink tracking-tight"
                                id="node-creator-title"
                            >
                                Criar Nó
                            </h2>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Adicione uma nova entidade ao seu grafo de estudos teológicos
                        </p>
                    </div>
                    <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-text-ink hover:bg-parchment-canvas transition-colors"
                        onClick={onClose}
                        title="Fechar modal (Esc)"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                <div className="px-space-lg py-5 overflow-y-auto space-y-5 flex-1">
                    <div className="space-y-1.5">
                        <FieldHeading
                            hint={`${draft.title.length}/${TITLE_MAX_LENGTH}`}
                            htmlFor="node-title"
                            isRequired
                            label="Título do Nó"
                        />
                        <div className="relative rounded-lg shadow-sm">
                            <input
                                className={TITLE_INPUT_CLASS}
                                id="node-title"
                                maxLength={TITLE_MAX_LENGTH}
                                onChange={(event) => onChange({...draft, title: event.target.value})}
                                placeholder="Ex: Justificação pela Fé, Agostinho, Concílio de Nicéia..."
                                ref={titleInputRef}
                                style={{
                                    border: '1.5px solid #2E4A62',
                                    boxShadow: '0 0 0 2px rgba(191, 165, 132, 0.35)',
                                }}
                                type="text"
                                value={draft.title}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span
                                className="font-label-md text-label-md text-text-ink font-semibold flex items-center gap-1">
                                Classificação
                                <span className="text-status-error">*</span>
                            </span>
                            <span className="font-label-sm text-label-sm text-outline">
                                Selecione uma categoria principal
                            </span>
                        </div>
                        <CategoryPicker
                            onChange={(category) => onChange({...draft, category, attributes: {}})}
                            value={draft.category}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <FieldHeading
                            hint={`${draft.summary.length}/${SUMMARY_MAX_LENGTH}`}
                            htmlFor="node-summary"
                            label="Resumo Curto"
                        />
                        <textarea
                            className={SUMMARY_TEXTAREA_CLASS}
                            id="node-summary"
                            maxLength={SUMMARY_MAX_LENGTH}
                            onChange={(event) => onChange({...draft, summary: event.target.value})}
                            placeholder="Forneça uma sinopse concisa da entidade para rápida consulta no grafo..."
                            rows={3}
                            style={{border: '1px solid #DCCDB6'}}
                            value={draft.summary}
                        />
                    </div>

                    <AttributesPanel
                        categoryId={draft.category}
                        onChange={(fieldId, value) =>
                            onChange({...draft, attributes: {...draft.attributes, [fieldId]: value}})
                        }
                        values={draft.attributes}
                    />

                    <div className="space-y-1.5">
                        <button
                            className="w-full py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 font-medium font-body-sm text-[#2E4A62] bg-[#FAF8F5] transition-all hover:bg-[#F0EDE6] border-[1.5px] border-dashed border-[#DCCDB6] hover:border-[#BFA584] group"
                            onClick={onOpenNotes}
                            type="button"
                        >
                            <span>📝</span>
                            <span>Escrever suas anotações</span>
                            <span
                                className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary transition-colors ml-1">
                                open_in_new
                            </span>
                        </button>
                        {draft.notes.trim() !== '' && (
                            <p className="font-label-sm text-label-sm text-outline text-right">
                                {countWords(draft.notes)} palavras ·{' '}
                                {draft.notes.length.toLocaleString('pt-BR')} caracteres escritos
                            </p>
                        )}
                    </div>

                    <RelationSection
                        nodes={nodes}
                        onChange={(relation) => onChange({...draft, relation})}
                        onOpenFoundation={onOpenRelationFoundation}
                        relation={draft.relation}
                    />

                    <SubmapPicker
                        onCreate={onCreateSubmap}
                        onToggle={(submapId) =>
                            onChange({
                                ...draft,
                                submapIds: draft.submapIds.includes(submapId)
                                    ? draft.submapIds.filter((id) => id !== submapId)
                                    : [...draft.submapIds, submapId],
                            })
                        }
                        selectedIds={draft.submapIds}
                        submaps={submaps}
                    />
                </div>

                <div
                    className="px-space-lg py-4 flex items-center justify-between shrink-0 bg-parchment-canvas/40 rounded-b-[12px]"
                    style={{borderTop: '1px solid #DCCDB6'}}
                >
                    <a
                        className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors group"
                        href="#"
                        onClick={(event) => event.preventDefault()}
                    >
                        <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-primary">
                            help_outline
                        </span>
                        <span className="underline decoration-parchment-border underline-offset-4">
                            Guia de classificação taxonômica
                        </span>
                    </a>

                    <div className="flex items-center gap-3">
                        <button
                            className="h-10 px-5 rounded-lg font-label-md text-label-md font-semibold transition-colors hover:bg-parchment-canvas"
                            onClick={onClose}
                            style={{
                                backgroundColor: 'transparent',
                                border: '1px solid #2E4A62',
                                color: '#2E4A62',
                            }}
                            type="button"
                        >
                            Cancelar
                        </button>
                        <button
                            className="h-10 px-6 rounded-lg font-label-md text-label-md font-semibold text-surface-white flex items-center gap-2 shadow-sm transition-colors bg-category-doctrine hover:bg-terracotta-hover"
                            onClick={onSubmit}
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[18px]">check</span>
                            <span>Salvar Nó</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
