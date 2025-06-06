
import { updatePost } from "@/actions/post";
import BlogForm from "@/components/BlogForm";
import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

export default async function Edit({ params }){
     const { id } = await params;
     const user = await getAuthUser(); // from Cookies
    
     const postCollection = await getCollection('posts');
     let post;
     if(id.length === 24 && postCollection){
        post =  await postCollection.findOne({
            _id : ObjectId.createFromHexString(id)
        });
        post = JSON.parse(JSON.stringify(post));
        //auto redirect if the user want to edit post not his own
        if(user.userId !== post.userId) return redirect('/'); //Home
          
    }else{
        post = null;
     }

    return (
        <div className="container w-1/2">
            <h1 className="title"> Edit you post</h1>
            {post ? <BlogForm handler={updatePost} post={post}  />
                : <p>Failed to fetch the data...</p>
            }
        </div>
    )
}