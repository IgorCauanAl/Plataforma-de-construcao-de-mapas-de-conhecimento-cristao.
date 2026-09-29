import { NODE_CATEGORIES } from '../../../../../core/entities/NodeCategory';
import type { NodeCategoryId } from '../../../../../core/entities/NodeCategory';

type CategoryPickerProps = {
    value: NodeCategoryId;
    onChange: (categoryId: NodeCategoryId) => void;
};

export function CategoryPicker({ value, onChange }: CategoryPickerProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {NODE_CATEGORIES.map((category) => {
                const isSelected = category.id === value;

                if (isSelected) {
                    return (
                        <button
                            aria-pressed="true"
                            className="flex items-center justify-between px-3 py-2 rounded-full text-left shadow-sm"
                            key={category.id}
                            onClick={() => onChange(category.id)}
                            style={{
                                backgroundColor: `${category.color}1F`,
                                border: `1.5px solid ${category.color}`,
                                boxShadow: `0 0 0 1px ${category.color}4D`,
                            }}
                            type="button"
                        >
                            <div className="flex items-center gap-1.5 min-w-0">
                                <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: category.color }}
                                />
                                <span
                                    className="material-symbols-outlined text-[15px]"
                                    style={{ color: category.color }}
                                >
                                    {category.icon}
                                </span>
                                <span
                                    className="font-label-sm text-label-sm font-semibold truncate"
                                    style={{ color: category.color }}
                                >
                                    {category.label}
                                </span>
                            </div>
                            <span
                                className="material-symbols-outlined text-[16px] shrink-0"
                                style={{ color: category.color }}
                            >
                                check_circle
                            </span>
                        </button>
                    );
                }

                return (
                    <button
                        aria-pressed="false"
                        className="flex items-center gap-1.5 px-2.5 py-2 rounded-full text-left transition-all hover:bg-surface-container"
                        key={category.id}
                        onClick={() => onChange(category.id)}
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #DCCDB6' }}
                        type="button"
                    >
                        <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: category.color }}
                        />
                        <span
                            className="material-symbols-outlined text-[15px]"
                            style={{ color: category.color }}
                        >
                            {category.icon}
                        </span>
                        <span className="font-label-sm text-label-sm text-text-ink truncate">
                            {category.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
