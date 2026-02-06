
export type DocumentType = 'text' | 'code' | 'checklist';

export interface BaseDocument {
    id: string;
    title: string;
    type: DocumentType;
    isDirty: boolean; // Has unsaved changes
}

export interface TextDocument extends BaseDocument {
    type: 'text';
    content: string;
}

export interface CodeDocument extends BaseDocument {
    type: 'code';
    content: string;
    language: string; // e.g., 'javascript', 'python'
}

export interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
    subtasks?: ChecklistItem[]; // Recursive subtasks
}

export interface ChecklistDocument extends BaseDocument {
    type: 'checklist';
    items: ChecklistItem[];
}

export type AppDocument = TextDocument | CodeDocument | ChecklistDocument;
