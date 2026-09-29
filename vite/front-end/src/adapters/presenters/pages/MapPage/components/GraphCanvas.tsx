import { CanvasLegend, CanvasNavigationTools } from './CanvasOverlay';
import { GraphEmblem } from './GraphEmblem';
import { QuickStartCards } from './QuickStartCards';
import type { QuickStartId } from './QuickStartCards';

type GraphCanvasProps = {
    connectedNodes: number;
    onCreateNode: () => void;
    onSelectQuickStart: (id: QuickStartId) => void;
};

export function GraphCanvas({ connectedNodes, onCreateNode, onSelectQuickStart }: GraphCanvasProps) {
    return (
        <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center bg-parchment-canvas">
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern height="24" id="archival-dots" patternUnits="userSpaceOnUse" width="24">
                        <circle className="fill-parchment-border" cx="2" cy="2" r="1.1" />
                    </pattern>
                </defs>
                <rect fill="url(#archival-dots)" height="100%" width="100%" />
            </svg>

            <div className="absolute w-[500px] h-[500px] rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto px-6 py-8 flex flex-col items-center text-center">
                <GraphEmblem />

                <h2 className="font-display-lg text-display-lg text-text-ink font-semibold tracking-tight mb-2">
                    Seu mapa de estudos está vazio
                </h2>

                <p className="font-body-md text-body-md text-on-surface-variant max-w-[480px] mb-8 leading-relaxed">
                    Comece construindo o primeiro nó para mapear personagens históricos, textos
                    bíblicos, conceitos teológicos ou debates conciliares.
                </p>

                <button
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl bg-category-doctrine hover:bg-terracotta-hover text-on-primary font-label-lg text-label-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    onClick={onCreateNode}
                    type="button"
                >
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                    <span>+ Criar Primeiro Nó</span>
                </button>

                <QuickStartCards onSelect={onSelectQuickStart} />
            </div>

            <CanvasNavigationTools />
            <CanvasLegend connectedNodes={connectedNodes} />
        </div>
    );
}
