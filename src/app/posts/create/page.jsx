import { createPost } from "@/actions/post";
import BlogForm from "@/components/BlogForm";

export default function Create(){
    return (
        <div className="container w-1/2">
            <h1 className="title">Create new post</h1>
            
            <BlogForm handler={createPost} />
        </div>
    )
}