import { BrandLogo } from './BrandLogo';

export function AppTopBar() {
    return (
        <header className="fixed top-0 left-[240px] right-0 h-16 bg-parchment-canvas/90 backdrop-blur-md z-40 border-b border-parchment-border">
            <div className="w-full h-16 px-space-lg flex items-center justify-between">
                <div className="flex items-center gap-space-md">
                    <BrandLogo />
                    <span className="font-headline-sm text-headline-sm text-text-ink">TheoGraph</span>
                    <span className="font-label-sm text-label-sm px-space-sm py-0.5 rounded-full bg-parchment-border/50 text-text-ink border border-parchment-border">
                        Grafo Teológico
                    </span>
                </div>

                <div className="flex items-center gap-space-md">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
