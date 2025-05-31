"use server"

import { registerFormSchema } from "@/lib/rules";

export async function register(state, formData){

    //await new Promise ((resolve) => setTimeout(resolve,3000));
    const validatedFields = registerFormSchema.safeParse({
        email : formData.get('email'),
        password : formData.get('password'),
        confirmPassword : formData.get('confirmPassword')
    });

    if(!validatedFields.success){
        return {
            errors : validatedFields.error.flatten().fieldErrors,
            email : formData.get('email'),
        }
    }
    console.log(validatedFields)
}