import type { NodeSubmap } from '../../../../../core/entities/NodeSubmap';

type SubmapPickerProps = {
    submaps: NodeSubmap[];
    selectedIds: string[];
    onToggle: (submapId: string) => void;
    onCreate: () => void;
};

export function SubmapPicker({ submaps, selectedIds, onToggle, onCreate }: SubmapPickerProps) {
    return (
        <div className="space-y-2">
            <span className="font-label-md text-label-md text-text-ink font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">folder_open</span>
                Vincular aos Submapas
            </span>

            <div className="flex flex-wrap items-center gap-2">
                {submaps.map((submap) => {
                    const isSelected = selectedIds.includes(submap.id);

                    if (isSelected) {
                        return (
                            <button
                                aria-pressed="true"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-label-sm font-label-sm font-medium transition-colors"
                                key={submap.id}
                                onClick={() => onToggle(submap.id)}
                                style={{ backgroundColor: '#2E4A62', color: '#FFFFFF' }}
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[14px]">check</span>
                                {submap.label}
                            </button>
                        );
                    }

                    return (
                        <button
                            aria-pressed="false"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-label-sm font-label-sm text-text-ink transition-colors hover:bg-parchment-canvas"
                            key={submap.id}
                            onClick={() => onToggle(submap.id)}
                            style={{ backgroundColor: '#FFFFFF', border: '1px dashed #DCCDB6' }}
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[14px] text-outline">add</span>
                            {submap.label}
                        </button>
                    );
                })}

                <button
                    className="inline-flex items-center gap-1 px-2 py-1 text-label-sm font-label-sm text-primary hover:underline ml-1"
                    onClick={onCreate}
                    type="button"
                >
                    <span>+ Novo Submapa</span>
                </button>
            </div>
        </div>
    );
}
