import {useCallback, useEffect, useRef, useState} from 'react';

import {applyFormat, countWords, estimateReadingMinutes} from '../lib/markdownEditing';
import type {FormatAction} from '../lib/markdownEditing';

export type SidePeekMetadataEntry = {
    icon: string;
    label: string;
    value: string;
};

export type SidePeekBreadcrumbSegment = {
    label: string;
    hasIcon?: boolean;
};

type SidePeekShellProps = {
    accentColor: string;
    ariaLabel: string;
    breadcrumb: SidePeekBreadcrumbSegment[];
    isExpanded: boolean;
    isOpen: boolean;
    metadata: SidePeekMetadataEntry[];
    onChange: (value: string) => void;
    onClose: () => void;
    onExpandChange: (isExpanded: boolean) => void;
    onShare: () => void;
    placeholder: string;
    shareTitle: string;
    syncLabel: string;
    title: string;
    value: string;
    wikiLinkFallback: string;
};

const TOOLBAR_BUTTON_CLASS =
    'w-7 h-7 rounded flex items-center justify-center hover:bg-surface-container text-text-ink transition-colors';

const AUTOSAVE_DELAY_MS = 700;

export function SidePeekShell({
                                  accentColor,
                                  ariaLabel,
                                  breadcrumb,
                                  isExpanded,
                                  isOpen,
                                  metadata,
                                  onChange,
                                  onClose,
                                  onExpandChange,
                                  onShare,
                                  placeholder,
                                  shareTitle,
                                  syncLabel,
                                  title,
                                  value,
                                  wikiLinkFallback,
                              }: SidePeekShellProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [savedValue, setSavedValue] = useState(value);

    const wordCount = countWords(value);
    const charCount = value.length;
    const isSaving = isOpen && savedValue !== value;

    const applyToTextarea = useCallback(
        (action: FormatAction) => {
            const textarea = textareaRef.current;

            if (!textarea) {
                return;
            }

            const result = applyFormat(
                value,
                textarea.selectionStart,
                textarea.selectionEnd,
                action,
            );
            onChange(result.value);

            requestAnimationFrame(() => {
                textarea.focus();
                textarea.setSelectionRange(result.selectionStart, result.selectionEnd);
            });
        },
        [onChange, value],
    );

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            if (!(event.ctrlKey || event.metaKey)) {
                return;
            }

            const key = event.key.toLowerCase();

            if (key !== 'b' && key !== 'i') {
                return;
            }

            if (!textareaRef.current) {
                return;
            }

            event.preventDefault();
            applyToTextarea({type: 'wrap', marker: key === 'b' ? '**' : '*'});
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [applyToTextarea, isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const timeout = setTimeout(() => setSavedValue(value), AUTOSAVE_DELAY_MS);

        return () => clearTimeout(timeout);
    }, [isOpen, value]);

    return (
        <>
            <div
                aria-hidden="true"
                className={`fixed inset-0 top-16 left-[240px] bg-primary-dark/50 backdrop-blur-[3px] z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />

            <aside
                aria-hidden={!isOpen}
                aria-label={ariaLabel}
                className={`fixed top-0 right-0 h-screen bg-surface-white z-50 flex flex-col justify-between shadow-[-12px_0_36px_rgba(27,42,56,0.16)] transition-[transform,width] duration-300 ${
                    isExpanded ? 'w-full' : 'w-[60vw]'
                } ${isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
            >
                <header
                    className="px-10 py-5 bg-surface-white flex items-center justify-between shrink-0 shadow-sm z-20">
                    <div className="flex flex-col min-w-0 pr-space-md">
                        <div className="flex items-center gap-space-sm text-outline mb-1">
                            {breadcrumb.map((segment, index) => (
                                <span className="flex items-center gap-space-sm" key={segment.label}>
                                    {index > 0 && <span className="text-parchment-border">•</span>}
                                    {segment.hasIcon ? (
                                        <span
                                            className="font-label-sm text-label-sm uppercase tracking-widest font-semibold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[13px]">
                                                tag
                                            </span>
                                            {segment.label}
                                        </span>
                                    ) : (
                                        <span
                                            className={
                                                index === 0
                                                    ? 'font-label-sm text-label-sm uppercase tracking-widest font-semibold'
                                                    : 'font-label-sm text-label-sm text-on-surface-variant'
                                            }
                                            style={index === 0 ? {color: accentColor} : undefined}
                                        >
                                            {segment.label}
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                        <h1 className="font-headline-lg text-headline-lg text-text-ink font-semibold tracking-tight truncate">
                            {title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-space-md shrink-0">
                        <div
                            className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-low text-status-success font-label-sm text-label-sm">
                            <span
                                className={`w-2 h-2 rounded-full bg-status-success ${isSaving ? 'animate-pulse' : ''}`}
                            />
                            <span className="font-medium text-text-ink/80">
                                {isSaving ? 'Salvando...' : 'Salvo automaticamente'}
                            </span>
                        </div>

                        <div className="flex items-center gap-space-xs text-on-surface-variant">
                            <button
                                aria-pressed={isExpanded}
                                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container text-text-ink transition-colors"
                                onClick={() => onExpandChange(!isExpanded)}
                                title={isExpanded ? 'Restaurar painel lateral' : 'Expandir para tela cheia'}
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    {isExpanded ? 'close_fullscreen' : 'open_in_full'}
                                </span>
                            </button>
                            <button
                                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container text-text-ink transition-colors"
                                onClick={onShare}
                                title={shareTitle}
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[20px]">ios_share</span>
                            </button>
                            <button
                                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-status-error/10 hover:text-status-error text-text-ink transition-colors ml-1"
                                onClick={onClose}
                                title="Fechar painel (Esc)"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="px-10 py-2.5 bg-surface-bright flex items-center justify-between shrink-0 shadow-sm">
                    <div className="flex items-center gap-0.5 bg-surface-white px-2 py-1 rounded-lg shadow-sm">
                        <button
                            className={`${TOOLBAR_BUTTON_CLASS} font-bold text-[13px]`}
                            onClick={() => applyToTextarea({type: 'wrap', marker: '**'})}
                            title="Negrito (Ctrl+B)"
                            type="button"
                        >
                            B
                        </button>
                        <button
                            className={`${TOOLBAR_BUTTON_CLASS} italic font-serif text-[14px]`}
                            onClick={() => applyToTextarea({type: 'wrap', marker: '*'})}
                            title="Itálico (Ctrl+I)"
                            type="button"
                        >
                            I
                        </button>
                        <button
                            className={`${TOOLBAR_BUTTON_CLASS} font-headline-sm text-[15px]`}
                            onClick={() => applyToTextarea({type: 'prefix', prefix: '## '})}
                            title="Título (H2)"
                            type="button"
                        >
                            H
                        </button>

                        <div className="w-px h-4 bg-surface-dim mx-1"/>

                        <button
                            className={TOOLBAR_BUTTON_CLASS}
                            onClick={() => applyToTextarea({type: 'prefix', prefix: '> '})}
                            title="Citação"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[16px]">format_quote</span>
                        </button>
                        <button
                            className={TOOLBAR_BUTTON_CLASS}
                            onClick={() => applyToTextarea({type: 'wrap', marker: '`'})}
                            title="Código"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[16px]">code</span>
                        </button>
                        <button
                            className={TOOLBAR_BUTTON_CLASS}
                            onClick={() => applyToTextarea({type: 'link'})}
                            title="Inserir hiperlink"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[16px]">link</span>
                        </button>
                        <button
                            className={TOOLBAR_BUTTON_CLASS}
                            onClick={() => applyToTextarea({type: 'prefix', prefix: '- '})}
                            title="Lista com marcadores"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
                        </button>
                        <button
                            className={TOOLBAR_BUTTON_CLASS}
                            onClick={() => applyToTextarea({type: 'wikiLink', fallback: wikiLinkFallback})}
                            title="Vincular ao Nó Teológico"
                            type="button"
                        >
                            <span className="material-symbols-outlined text-[16px]" style={{color: accentColor}}>
                                share_location
                            </span>
                        </button>
                    </div>

                    <div className="flex items-center gap-space-md text-outline font-label-sm text-label-sm">
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">history_edu</span>
                            <span>
                                {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'}
                            </span>
                        </span>
                        <span className="text-parchment-border">•</span>
                        <span>{charCount.toLocaleString('pt-BR')} caracteres</span>
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto px-12 py-8 bg-surface-white">
                    <div className="max-w-3xl mx-auto space-y-6 flex flex-col h-full">
                        <div
                            className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-sm shrink-0">
                            <div className="grid grid-cols-2 gap-space-md">
                                {metadata.map((entry) => (
                                    <div className="flex items-center gap-space-sm" key={entry.label}>
                                        <span className="material-symbols-outlined text-[18px] text-outline">
                                            {entry.icon}
                                        </span>
                                        <span className="font-label-sm text-label-sm text-outline">
                                            {entry.label}:
                                        </span>
                                        <span
                                            className="font-label-md text-label-md text-text-ink font-semibold truncate">
                                            {entry.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <textarea
                            className="w-full h-full min-h-[300px] resize-none outline-none font-body-lg text-body-lg text-text-ink bg-transparent"
                            onChange={(event) => onChange(event.target.value)}
                            placeholder={placeholder}
                            ref={textareaRef}
                            value={value}
                        />
                    </div>
                </main>

                <footer
                    className="px-10 py-3 bg-surface-bright flex items-center justify-between shrink-0 shadow-sm text-outline font-label-sm text-label-sm">
                    <div className="flex items-center gap-space-md">
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                            <span>Tempo de leitura: ~{estimateReadingMinutes(wordCount)} min</span>
                        </span>
                        <span className="text-parchment-border">•</span>
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-primary">cloud_done</span>
                            <span>{syncLabel}</span>
                        </span>
                    </div>

                    <div
                        className="hidden xl:flex items-center gap-space-sm text-on-surface-variant font-mono text-[11px]">
                        <span className="px-1 rounded bg-surface-container"># Título</span>
                        <span className="px-1 rounded bg-surface-container">**negrito**</span>
                        <span className="px-1 rounded bg-surface-container">*itálico*</span>
                        <span className="px-1 rounded bg-surface-container">{'> citação'}</span>
                        <span className="px-1 rounded bg-surface-container">[[Link]]</span>
                    </div>
                </footer>
            </aside>
        </>
    );
}
