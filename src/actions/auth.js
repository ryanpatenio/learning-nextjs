"use server"

import bcrypt from 'bcrypt';
import { getCollection } from "@/lib/db";
import { loginFormSchema, registerFormSchema } from "@/lib/rules";
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/sessions';

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
        email,
        password : hashedPassword,
    });

    //create session
    await createSession(results.insertedId.toString());
    //redirect
    redirect('/dashboard');
}

export async function login(state, formData){

    //Validated Form Fields
    const validatedFields = loginFormSchema.safeParse({
        email : formData.get('email'),
        password : formData.get('password')
    });

    //if any form fields invalid
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            email: formData.get('email'),
        }
    }
    //extract validated data
    const { email, password} = validatedFields.data;

    //check if email is exist in DB
    const userCollection  = await getCollection('users');
    if( ! userCollection ){
        return {
            errors: { email : "server error!"}
        };
    }
    const existingUser = await userCollection.findOne({email});
    if(! existingUser ) return {errors : {email : 'Invalid credentials'}};

    //match the password
    const matchedPassword = await bcrypt.compare(password,existingUser.password);
    if(!matchedPassword) return {errors : {email : "Invalid credentials"}};

    //create session
    await createSession(existingUser._id.toString());
    console.log(existingUser)

    //redirect 
    redirect('/dashboard');
}