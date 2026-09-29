type WorkspaceToolbarProps = {
    onCreateNode: () => void;
};

export function WorkspaceToolbar({ onCreateNode }: WorkspaceToolbarProps) {
    return (
        <div className="w-full h-16 bg-surface-white/80 backdrop-blur-md px-space-lg flex items-center justify-between z-20 shadow-sm shrink-0">
            <div className="flex items-center gap-space-md">
                <div className="flex items-baseline gap-space-sm">
                    <h1 className="font-headline-md text-headline-md font-semibold text-text-ink tracking-tight">
                        Mapa
                    </h1>
                    <span className="font-label-md text-label-md text-outline">/</span>
                    <span className="font-headline-sm text-headline-sm text-secondary italic font-medium">
                        Meu Mapa de Estudos
                    </span>
                </div>

                <div className="hidden sm:flex items-center gap-space-xs px-2.5 py-1 rounded bg-secondary-fixed/40 text-on-secondary-fixed text-label-sm font-label-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-status-warning animate-pulse" />
                    <span>Modo Rascunho</span>
                </div>
            </div>

            <div className="flex items-center gap-space-md">
                <div className="relative w-64 md:w-80 opacity-60 cursor-not-allowed">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                        search
                    </span>
                    <input
                        className="w-full bg-surface-container-low pl-9 pr-3 py-1.5 rounded text-label-md font-label-md text-on-surface-variant cursor-not-allowed placeholder:text-outline"
                        disabled
                        placeholder="Buscar nó no grafo..."
                        type="text"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-label-sm font-label-sm px-1.5 py-0.5 rounded bg-surface-white text-outline shadow-sm">
                        ⌘K
                    </span>
                </div>

                <button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-category-doctrine hover:bg-terracotta-hover text-on-primary font-label-md text-label-md font-medium shadow-sm transition-all hover:shadow duration-150 active:scale-95"
                    onClick={onCreateNode}
                    type="button"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    <span>+ Criar Nó</span>
                </button>
            </div>
        </div>
    );
}
