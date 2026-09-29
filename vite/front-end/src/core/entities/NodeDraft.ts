import {DEFAULT_CATEGORY_ID} from './NodeCategory';
import type {NodeCategoryId} from './NodeCategory';
import {EMPTY_RELATION} from './NodeRelation';
import type {NodeRelation} from './NodeRelation';

export const TITLE_MAX_LENGTH = 150;
export const SUMMARY_MAX_LENGTH = 500;

export type NodeDraft = {
    title: string;
    category: NodeCategoryId;
    summary: string;
    notes: string;
    attributes: Record<string, string>;
    submapIds: string[];
    relation: NodeRelation;
};

export const DEFAULT_SUBMAP_IDS: string[] = ['cristianismo-primitivo', 'reforma-protestante'];

export function createNodeDraft(): NodeDraft {
    return {
        title: '',
        category: DEFAULT_CATEGORY_ID,
        summary: '',
        notes: '',
        attributes: {},
        submapIds: [...DEFAULT_SUBMAP_IDS],
        relation: {...EMPTY_RELATION},
    };
}
