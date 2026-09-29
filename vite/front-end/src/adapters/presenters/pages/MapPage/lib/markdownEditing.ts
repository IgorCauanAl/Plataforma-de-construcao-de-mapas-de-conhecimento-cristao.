export type FormatAction =
    | { type: 'wrap'; marker: string }
    | { type: 'prefix'; prefix: string }
    | { type: 'link' }
    | { type: 'wikiLink'; fallback: string };

export type FormatResult = {
    value: string;
    selectionStart: number;
    selectionEnd: number;
};

const FALLBACK_TEXT = 'texto';

export function countWords(source: string): number {
    const matches = source.trim().match(/\S+/g);

    return matches ? matches.length : 0;
}

export function estimateReadingMinutes(wordCount: number): number {
    return Math.max(1, Math.round(wordCount / 200));
}

export function applyFormat(
    value: string,
    selectionStart: number,
    selectionEnd: number,
    action: FormatAction,
): FormatResult {
    const before = value.slice(0, selectionStart);
    const after = value.slice(selectionEnd);
    const selected = value.slice(selectionStart, selectionEnd);

    if (action.type === 'wrap') {
        const insert = selected || FALLBACK_TEXT;
        const cursor = selectionStart + action.marker.length;

        return {
            value: `${before}${action.marker}${insert}${action.marker}${after}`,
            selectionStart: cursor,
            selectionEnd: cursor + insert.length,
        };
    }

    if (action.type === 'prefix') {
        const source = selected || FALLBACK_TEXT;
        const block = source
            .split('\n')
            .map((line) => `${action.prefix}${line}`)
            .join('\n');

        return {
            value: `${before}${block}${after}`,
            selectionStart,
            selectionEnd: selectionStart + block.length,
        };
    }

    if (action.type === 'wikiLink') {
        const insert = selected || action.fallback;
        const cursor = selectionStart + 2;

        return {
            value: `${before}[[${insert}]]${after}`,
            selectionStart: cursor,
            selectionEnd: cursor + insert.length,
        };
    }

    const insert = selected || 'texto do link';
    const cursor = selectionStart + 1;

    return {
        value: `${before}[${insert}](https://)${after}`,
        selectionStart: cursor,
        selectionEnd: cursor + insert.length,
    };
}
