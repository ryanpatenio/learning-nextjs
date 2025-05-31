"use client"

import { register } from "@/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function Register(){
    const [state , action , isPending] = useActionState(register, undefined);

    return (       
        <div className="container w-1/2">
            <h1 className="title">Register</h1>
            
            <form action={action} className="space-y-4">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"  />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" />
                </div>
                <div className="flex items-end gap-4">
                    <button disabled={isPending} className="btn-primary">
                        {isPending ? "Loading..." : "Register"}
                    </button>
                    <Link href="/login"className="text-link" >or Login here!</Link>
                </div>
            </form>
        </div>
    );  
}