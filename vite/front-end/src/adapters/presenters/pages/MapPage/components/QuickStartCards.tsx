export type QuickStartId = 'niceia' | 'biografia' | 'fonte';

type QuickStartCard = {
    id: QuickStartId;
    icon: string;
    iconClassName: string;
    title: string;
    description: string;
    action: string;
};

const QUICK_START_CARDS: QuickStartCard[] = [
    {
        id: 'niceia',
        icon: 'explore',
        iconClassName: 'bg-secondary-fixed/50 text-secondary',
        title: 'Importar Exemplo',
        description: 'Do Século I a Niceia (325 d.C.)',
        action: 'Preencher Grafo',
    },
    {
        id: 'biografia',
        icon: 'person_book',
        iconClassName: 'bg-surface-container-high text-category-biography',
        title: 'Adicionar Biografia',
        description: 'Ex.: Paulo, Agostinho, Lutero, Tomás',
        action: 'Configurar Autor',
    },
    {
        id: 'fonte',
        icon: 'auto_stories',
        iconClassName: 'bg-secondary-container/40 text-category-scripture',
        title: 'Texto ou Fonte',
        description: 'Ex.: Carta aos Romanos, Confissões',
        action: 'Ancorar Cânon',
    },
];

type QuickStartCardsProps = {
    onSelect: (id: QuickStartId) => void;
};

export function QuickStartCards({ onSelect }: QuickStartCardsProps) {
    return (
        <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
            {QUICK_START_CARDS.map((card) => (
                <button
                    className="group p-4 text-left rounded-xl bg-surface-white/70 hover:bg-surface-white hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                    key={card.id}
                    onClick={() => onSelect(card.id)}
                    type="button"
                >
                    <div>
                        <div
                            className={`w-8 h-8 rounded-lg ${card.iconClassName} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
                        >
                            <span className="material-symbols-outlined text-[18px]">{card.icon}</span>
                        </div>
                        <p className="font-label-md text-label-md font-semibold text-text-ink mb-1 group-hover:text-primary transition-colors">
                            {card.title}
                        </p>
                        <p className="font-label-sm text-label-sm text-outline leading-snug">
                            {card.description}
                        </p>
                    </div>
                    <span className="mt-3 text-label-sm font-label-sm font-medium text-category-doctrine flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {card.action}
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </span>
                </button>
            ))}
        </div>
    );
}
