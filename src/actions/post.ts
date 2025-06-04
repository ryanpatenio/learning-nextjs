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


export async function createPost(_state : unknown, formdata : FormData): Promise< void | PostErrorResponse> {
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

    redirect('/'); //redirect to Home
}

export async function updatePost(_state: unknown, formdata : FormData): Promise < void | PostErrorResponse >{
    

}