"use client"

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react"
import toast from "react-hot-toast";

export default function BlogForm({handler , post}){
    const [state, action , isPending] = useActionState(handler,undefined);
    const  router = useRouter();

    useEffect(() => {
        if (state?.message) {
            if (state.type === 'error') {
            toast.error(state.message);
            } else {
            toast.success(state.message);
            router.push('/dashboard');
        
          }
        }
    }, [state]);

    return (
        <form action={action} className="space-y-4">
            <input type="hidden" name="postId"  defaultValue={post?._id} />
            <div>
                <label htmlFor="title">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    defaultValue={state?.title || post?.title}
                />
                {state?.errors?.title && (
                    <p className="error">{state.errors.title}</p>
                )}   
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <textarea name="content" className="" rows={6} defaultValue={state?.content || post?.content}></textarea>
                  {state?.errors?.content && (
                    <p className="error">{state.errors.content}</p>
                )}  
            </div>
            <div className="flex items-end">
                <button disabled={isPending} className="btn-primary">
                    {isPending ? "Loading..." : "Submit"}
                </button>
            </div>
        </form>
    )
}