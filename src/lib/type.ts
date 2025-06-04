import "server-only"

export interface PostFormFields{
    title : string;
    content : string;
}

export interface PostErrorResponse{
    errors : {
        title?: string[],
        content?: string[],
    },
    title?: string | null,
    content?: string | null
}