import { BrandLogo } from './BrandLogo';

type NavItem = {
    id: string;
    label: string;
    icon: string;
};

const NAVIGATION: NavItem[] = [
    { id: 'mapa', label: 'Mapa', icon: 'hub' },
    { id: 'corpus-textual', label: 'Fontes e Cânon', icon: 'menu_book' },
    { id: 'configuracoes', label: 'Configurações', icon: 'settings' },
];

type AppSidebarProps = {
    activePath: string;
    onNavigate: (path: string) => void;
};

export function AppSidebar({ activePath, onNavigate }: AppSidebarProps) {
    return (
        <aside className="fixed left-0 top-0 h-full w-[240px] bg-primary-container z-50 flex flex-col justify-between shadow-[0_8px_24px_rgba(27,42,56,0.12)]">
            <div className="flex flex-col">
                <div className="h-16 px-space-md flex items-center justify-between border-b border-parchment-border/20">
                    <div className="flex items-center gap-space-sm">
                        <BrandLogo />
                        <span className="font-headline-sm text-headline-sm font-semibold tracking-wide text-on-primary">
                            Theo<span className="text-secondary-fixed">Graph</span>
                        </span>
                    </div>
                    <button
                        className="text-on-primary-container hover:text-on-primary transition-colors p-space-xs"
                        title="Recolher menu"
                        type="button"
                    >
                        <span className="material-symbols-outlined text-[18px]">first_page</span>
                    </button>
                </div>

                <div className="px-space-md pt-space-md pb-space-xs">
                    <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container/70">
                        Navegação
                    </p>
                </div>

                <nav className="flex flex-col gap-space-xs px-space-sm">
                    {NAVIGATION.map((item) => {
                        const isActive = item.id === activePath;

                        return (
                            <a
                                key={item.id}
                                aria-current={isActive ? 'page' : undefined}
                                className={
                                    isActive
                                        ? 'flex items-center gap-space-md px-space-md py-space-sm rounded transition-colors bg-surface-white/10 text-on-primary font-label-md border-l-[3px] border-secondary-fixed'
                                        : 'flex items-center gap-space-md px-space-md py-space-sm rounded text-on-primary-container font-label-md text-label-md hover:bg-surface-white/5 hover:text-on-primary transition-colors'
                                }
                                data-path={item.id}
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    onNavigate(item.id);
                                }}
                            >
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                <span>{item.label}</span>
                            </a>
                        );
                    })}
                </nav>
            </div>

            <div className="p-space-md border-t border-parchment-border/20 bg-primary-dark/40">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-sm min-w-0">
                        <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md flex items-center justify-center font-semibold shrink-0">
                            TC
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-label-md text-label-md text-on-primary font-medium truncate">
                                Prof. Teodoro
                            </p>
                            <p className="font-label-sm text-label-sm text-on-primary-container/80 truncate">
                                Estudioso
                            </p>
                        </div>
                    </div>
                    <a
                        className="text-on-primary-container hover:text-status-error transition-colors p-space-xs shrink-0"
                        data-path="login"
                        href="#"
                        onClick={(event) => event.preventDefault()}
                        title="Sair"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                    </a>
                </div>
            </div>
        </aside>
    );
}
