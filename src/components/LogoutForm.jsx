"use client"

import { logout } from "@/actions/auth";
import { startTransition } from "react";

export default function logoutForm () { 

    const handleLogout = () =>{
        if(window.confirm("Are you sure you want to logout?")){
        startTransition(()=>{
            logout();
            });
        }      
    }

    return (    
        <button className="nav-link cursor-pointer" onClick={()=> handleLogout()}>Logout</button>
    );
}