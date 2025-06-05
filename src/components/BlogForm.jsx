"use client"
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react"
import toast from "react-hot-toast";

export default function BlogForm({handler}){
    const [state, action , isPending] = useActionState(handler,undefined);
    const  router = useRouter();

  useEffect(() => {
    if (state?.message) {
        toast.success(state.message);
        setTimeout(() => {
            router.push('/');
        }, 1000);
    }
}, [state]);

    return (
        <form action={action} className="space-y-4">
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" defaultValue={state?.title} />
                {state?.errors?.title && (
                    <p className="error">{state.errors.title}</p>
                )}   
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <textarea name="content" className="" rows={6} defaultValue={state?.content}></textarea>
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