"use server"

import bcrypt from 'bcrypt';
import { getCollection } from "@/lib/db";
import { registerFormSchema } from "@/lib/rules";
import { redirect } from 'next/navigation';

export async function register(state, formData){
    //await new Promise ((resolve) => setTimeout(resolve,3000));

    //Validated Form Fields
    const validatedFields = registerFormSchema.safeParse({
        email : formData.get('email'),
        password : formData.get('password'),
        confirmPassword : formData.get('confirmPassword')
    });

    //if any form fields invalid
    if(!validatedFields.success){
        return {
            errors : validatedFields.error.flatten().fieldErrors,
            email : formData.get('email'),
        }
    }

    //extract validated data 
    const { email, password} = validatedFields.data;

    //check if email is already exist
    const userCollection = await getCollection('users'); //collection users it just like a table users [putting this it will create a users collections then get this]
    if (!userCollection) return { errors : { email : "Server Error!"}};
    
    const existingUser = await userCollection.findOne({email});
    if (existingUser) {
        return { 
            errors : { 
                email : "Email is already exist in our database!"
            },
        };
    }  

    //hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // save in DB
    const results = await userCollection.insertOne({
        email , password : hashedPassword
    });

    //create session

    //redirect
    redirect('/dashboard');
}