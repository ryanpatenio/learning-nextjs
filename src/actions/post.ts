"use server"

import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { PostFormSchema } from "@/lib/rules";
import { PostErrorResponse, PostFormFields } from "@/lib/type";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

type Post = {
  title: string;
  content: string;
  userId: ObjectId;
};

type Message = {
    message: string;
    type : 'success' | 'error';
}


export async function createPost(_state : unknown, formdata : FormData): Promise<PostErrorResponse | Message> {
    //Check if user is logged in
    const user = await getAuthUser();
    if(!user){
        redirect("/");
    }

    //fields data
    const rawTitle = formdata.get('title');
    const rawContent = formdata.get('content');

    //Validated Form Fields
    const validatedFields = PostFormSchema.safeParse({
        title : rawTitle,
        content : rawContent
    });
    //if any form fields invalid
    if(!validatedFields.success){
        return {
            errors : validatedFields.error.flatten().fieldErrors,
            title : rawTitle as string,
            content : rawContent as string
        };
    }

    //extract validated fields
    const { title , content } = validatedFields.data as PostFormFields;
    
    //save in DB
    try {
        const postCollection = await getCollection('posts');
        //prepared data 
        const post: Post = {
            title : title,
            content : content,
            userId : new ObjectId(user.userId)
        }
        await postCollection.insertOne(post);

    } catch (error) {
        return {
            errors: {
                title: [ error instanceof Error ? error.message : 'Unknown server error.'],
            },
        };
    }

    //return a message
    return {
        message : "Post created successfully!",
        type : 'success'
    };
}

export async function updatePost(_state: unknown, formdata : FormData): Promise <PostErrorResponse | Message >{
    const user = await getAuthUser(); // from cookies
    if(!user){
        redirect("/"); //redirect to dashboard
    }

    //fields data
    const rawTitle = formdata.get('title');
    const rawContent = formdata.get('content');
    const postIdRaw = formdata.get('postId');

    // Ensure postId is a string
    if (typeof postIdRaw !== 'string') {
        return {
            errors:{
                title : ["Invalid Post id"]
            }
        }
    }
    //Validated Form Fields
    const validatedFields = PostFormSchema.safeParse({
        title : rawTitle,
        content : rawContent
    });
    //if any form fields invalid
    if(!validatedFields.success){
        return {
            errors : validatedFields.error.flatten().fieldErrors,
            title : rawTitle as string,
            content : rawContent as string
        };
    }

    //find the post
    const postCollection = await getCollection('posts');
    const post = await postCollection.findOne({
        _id : new ObjectId(postIdRaw),

    })

    if (!post) {
        return {
            message: "Post not found.",
            type: "error",
        };
    }
    
    //Post Ownership check
    if(user.userId !== post.userId.toString()){
        return {
            message: "You don't own this post! Only the owner can edit this",
            type : "error"
        };
    }

    //Update in DB
    try {
         await postCollection.findOneAndUpdate(
        { _id : post._id},
        {
           $set: {
                title : rawTitle,
                content : rawContent 
           },
        }
    );
    } catch (error) {
        return {
            message : "Failed to update the post. Please try again later.",
            type : "error"
        };
    }
    //return success message
    return {
        message : "Post updated successfully!",
        type : 'success'
    };
}