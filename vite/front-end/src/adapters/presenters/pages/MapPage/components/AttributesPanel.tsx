import { findCategory } from '../../../../../core/entities/NodeCategory';
import type { NodeCategoryId } from '../../../../../core/entities/NodeCategory';

type AttributesPanelProps = {
    categoryId: NodeCategoryId;
    values: Record<string, string>;
    onChange: (fieldId: string, value: string) => void;
};

const ATTRIBUTE_INPUT_CLASS =
    'w-full h-9 px-3 bg-surface-white rounded text-text-ink font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary';

export function AttributesPanel({ categoryId, values, onChange }: AttributesPanelProps) {
    const category = findCategory(categoryId);

    return (
        <div
            className="rounded-lg p-3 space-y-2.5"
            style={{ backgroundColor: '#F6EFE2', border: '1px solid #DCCDB6' }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-category-doctrine">tune</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-text-ink">
                        {category.panelTitle}
                    </span>
                </div>
                <span
                    className="font-label-sm text-label-sm px-2 py-0.5 rounded text-category-doctrine bg-surface-white font-medium"
                    style={{ border: '1px solid #DCCDB6' }}
                >
                    {category.panelBadge}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {category.fields.map((field) => (
                    <div className="space-y-1" key={field.id}>
                        <label
                            className="font-label-sm text-label-sm text-text-ink font-medium"
                            htmlFor={`node-attribute-${category.id}-${field.id}`}
                        >
                            {field.label}
                        </label>
                        <div className="relative">
                            <input
                                className={ATTRIBUTE_INPUT_CLASS}
                                id={`node-attribute-${category.id}-${field.id}`}
                                onChange={(event) => onChange(field.id, event.target.value)}
                                placeholder={field.placeholder}
                                style={{ border: '1px solid #DCCDB6' }}
                                type="text"
                                value={values[field.id] ?? ''}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
