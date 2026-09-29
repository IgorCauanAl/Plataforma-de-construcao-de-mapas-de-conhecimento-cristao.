const DISABLED_TOOL_CLASS = 'p-2 rounded text-outline/50 hover:bg-transparent cursor-not-allowed flex items-center justify-center';

export function CanvasNavigationTools() {
    return (
        <div className="absolute bottom-6 left-6 z-20 flex items-center bg-surface-white/80 backdrop-blur-md rounded-xl shadow-sm p-1">
            <div className="flex items-center gap-0.5">
                <button className={DISABLED_TOOL_CLASS} disabled title="Zoom In (Desabilitado - mapa vazio)" type="button">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
                <span className="font-label-sm text-label-sm text-outline/60 px-2 select-none">100%</span>
                <button className={DISABLED_TOOL_CLASS} disabled title="Zoom Out (Desabilitado - mapa vazio)" type="button">
                    <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
            </div>

            <div className="w-px h-4 bg-parchment-border/60 mx-1" />

            <button className={DISABLED_TOOL_CLASS} disabled title="Centralizar Visualização" type="button">
                <span className="material-symbols-outlined text-[18px]">filter_center_focus</span>
            </button>
            <button className={DISABLED_TOOL_CLASS} disabled title="Grade Magnética" type="button">
                <span className="material-symbols-outlined text-[18px]">grid_4x4</span>
            </button>
        </div>
    );
}

export function CanvasLegend({ connectedNodes }: { connectedNodes: number }) {
    return (
        <div className="hidden sm:flex absolute bottom-6 right-6 z-20 items-center gap-space-sm px-3.5 py-1.5 rounded-full bg-surface-white/70 backdrop-blur-sm shadow-sm text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-category-doctrine" />
            <span className="font-label-sm text-label-sm text-outline">{connectedNodes} nós conectados</span>
            <span className="text-parchment-border">•</span>
            <span className="font-label-sm text-label-sm text-outline">Grafo Local</span>
        </div>
    );
}
