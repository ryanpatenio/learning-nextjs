import "server-only"

export type Result<T> = 
  | { data: T }           // success case
  | { error: string };    // error case


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