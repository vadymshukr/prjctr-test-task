export interface NotesType {
    title: string;
    content: string;
    id: number | null;
}

export type RouterContextType  = {
    navigate: (route: string) => void
    getId: () => string | undefined
}
