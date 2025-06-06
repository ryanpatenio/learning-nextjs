"use server"
import Link from "next/link";

export default async function PostCard({post}){
    return (
        <div className="border border-slate-400  p-4 rounded-md shadow-lg h-full">
            <p className="text-slate-600 text-xs">
                {post._id.getTimestamp().toLocaleString()}
            </p>
            <Link href={`/posts/show/${post._id.toString()}`} className="block text-xl font-semibold mb-4">
                {post.title}
            </Link>
            <p className="text-sm">{post.content}</p>
        </div>
    )
}
// by default this component is a server side so that i can pass a server data into this component from Home.jsx[page.jsx]