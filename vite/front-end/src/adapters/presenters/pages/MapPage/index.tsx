import {useCallback, useState} from 'react';

import {createNodeDraft} from '../../../../core/entities/NodeDraft';
import type {NodeDraft} from '../../../../core/entities/NodeDraft';
import {GRAPH_NODE_INDEX, findRelationType} from '../../../../core/entities/NodeRelation';
import type {GraphNodeSummary} from '../../../../core/entities/NodeRelation';
import {NODE_SUBMAPS, createSubmapId, createSubmapLabel} from '../../../../core/entities/NodeSubmap';
import type {NodeSubmap} from '../../../../core/entities/NodeSubmap';
import {AppSidebar} from './components/AppSidebar';
import {AppTopBar} from './components/AppTopBar';
import {GraphCanvas} from './components/GraphCanvas';
import {NodeCreatorModal} from './components/NodeCreatorModal';
import {NotesSidePeek} from './components/NotesSidePeek';
import {RelationSidePeek} from './components/RelationSidePeek';
import {Toast} from './components/Toast';
import {WorkspaceToolbar} from './components/WorkspaceToolbar';
import {useToast} from './hooks/useToast';
import type {QuickStartId} from './components/QuickStartCards';

type QuickStartPrefill = Partial<Pick<NodeDraft, 'title' | 'category'>>;

const QUICK_START_PREFILL: Record<Exclude<QuickStartId, 'niceia'>, QuickStartPrefill> = {
    biografia: {title: 'Paulo de Tarso', category: 'biografia'},
    fonte: {title: 'Epístola aos Romanos', category: 'texto-biblico'},
};

export function MapPage() {
    const [activePath, setActivePath] = useState('mapa');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNotesOpen, setIsNotesOpen] = useState(false);
    const [isNotesExpanded, setIsNotesExpanded] = useState(false);
    const [isRelationOpen, setIsRelationOpen] = useState(false);
    const [isRelationExpanded, setIsRelationExpanded] = useState(false);
    const [draft, setDraft] = useState<NodeDraft>(createNodeDraft);
    const [submaps, setSubmaps] = useState<NodeSubmap[]>(NODE_SUBMAPS);
    const [nodes, setNodes] = useState<GraphNodeSummary[]>(GRAPH_NODE_INDEX);
    const {message, isVisible, showToast} = useToast();

    const openNodeCreatorModal = useCallback((prefill?: QuickStartPrefill) => {
        setDraft({...createNodeDraft(), ...prefill});
        setIsModalOpen(true);
    }, []);

    const closeNodeCreatorModal = useCallback(() => setIsModalOpen(false), []);

    const openNotes = useCallback(() => {
        setIsModalOpen(false);
        setIsNotesOpen(true);
    }, []);

    const closeNotes = useCallback(() => {
        setIsNotesExpanded(false);
        setIsNotesOpen(false);
        setIsModalOpen(true);
    }, []);

    const openRelationFoundation = useCallback(() => {
        setIsModalOpen(false);
        setIsRelationOpen(true);
    }, []);

    const closeRelationFoundation = useCallback(() => {
        setIsRelationExpanded(false);
        setIsRelationOpen(false);
        setIsModalOpen(true);
    }, []);

    const shareToClipboard = useCallback(
        (text: string, successMessage: string) => {
            const share = async () => {
                try {
                    await navigator.clipboard.writeText(text);
                    showToast(successMessage);
                } catch {
                    showToast('Não foi possível copiar o conteúdo.');
                }
            };

            void share();
        },
        [showToast],
    );

    const handleShareNotes = useCallback(() => {
        shareToClipboard(draft.notes, 'Anotações copiadas para a área de transferência.');
    }, [draft.notes, shareToClipboard]);

    const handleShareFoundation = useCallback(() => {
        const relationType = findRelationType(draft.relation.typeId);
        const label = relationType ? `Fundamentação (${relationType.label})` : 'Fundamentação da relação';

        shareToClipboard(
            draft.relation.foundation,
            `${label} copiada para a área de transferência.`,
        );
    }, [draft.relation, shareToClipboard]);

    const handleCreateSubmap = useCallback(() => {
        setSubmaps((current) => [
            ...current,
            {id: createSubmapId(current), label: createSubmapLabel(current)},
        ]);
    }, []);

    const handleSelectQuickStart = useCallback(
        (id: QuickStartId) => {
            if (id === 'niceia') {
                showToast('Importando modelo histórico: Século I a Niceia...');
                showToast('Grafo inicial preparado. Criando nó central: Concílio de Niceia (325).', 1200);
                return;
            }

            openNodeCreatorModal(QUICK_START_PREFILL[id]);
        },
        [openNodeCreatorModal, showToast],
    );

    const handleSubmitNode = useCallback(() => {
        const title = draft.title.trim() || 'Novo Nó';

        if (draft.title.trim() !== '') {
            setNodes((current) => [
                ...current,
                {
                    id: `node-${current.length}-${draft.title.trim().length}`,
                    title: draft.title.trim(),
                    categoryId: draft.category,
                },
            ]);
        }

        setIsModalOpen(false);
        setDraft(createNodeDraft());
        showToast(`Nó "${title}" posicionado no centro do mapa.`);
    }, [draft.category, draft.title, showToast]);

    return (
        <div className="bg-parchment-canvas font-body-md text-text-ink min-h-screen">
            <AppSidebar activePath={activePath} onNavigate={setActivePath}/>

            <div className="pl-[240px]">
                <AppTopBar/>

                <main className="w-full pt-16 bg-parchment-canvas min-h-screen">
                    <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden relative select-none">
                        <WorkspaceToolbar onCreateNode={() => openNodeCreatorModal()}/>

                        <GraphCanvas
                            connectedNodes={0}
                            onCreateNode={() => openNodeCreatorModal()}
                            onSelectQuickStart={handleSelectQuickStart}
                        />

                        <NodeCreatorModal
                            draft={draft}
                            isOpen={isModalOpen}
                            nodes={nodes}
                            onChange={setDraft}
                            onClose={closeNodeCreatorModal}
                            onCreateSubmap={handleCreateSubmap}
                            onOpenNotes={openNotes}
                            onOpenRelationFoundation={openRelationFoundation}
                            onSubmit={handleSubmitNode}
                            submaps={submaps}
                        />

                        <NotesSidePeek
                            attributes={draft.attributes}
                            categoryId={draft.category}
                            isExpanded={isNotesExpanded}
                            isOpen={isNotesOpen}
                            notes={draft.notes}
                            onClose={closeNotes}
                            onExpandChange={setIsNotesExpanded}
                            onNotesChange={(notes) => setDraft((current) => ({...current, notes}))}
                            onShare={handleShareNotes}
                            title={draft.title}
                        />

                        <RelationSidePeek
                            categoryId={draft.category}
                            foundation={draft.relation.foundation}
                            isExpanded={isRelationExpanded}
                            isOpen={isRelationOpen}
                            nodes={nodes}
                            onChange={(foundation) =>
                                setDraft((current) => ({
                                    ...current,
                                    relation: {...current.relation, foundation},
                                }))
                            }
                            onClose={closeRelationFoundation}
                            onExpandChange={setIsRelationExpanded}
                            onShare={handleShareFoundation}
                            relation={draft.relation}
                            sourceTitle={draft.title}
                        />

                        <Toast isVisible={isVisible} message={message}/>
                    </div>
                </main>
            </div>
        </div>
    );
}
