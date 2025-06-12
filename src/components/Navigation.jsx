import getAuthUser from "@/lib/getAuthUser"
import NavLink from "./NavLink"
import LogoutForm from './LogoutForm';

export default async function Navigation(){
  const authUser = await getAuthUser();
    return (
        <nav>
            <NavLink label="Home" href="/" />          
              {authUser
              ? ( <div className="flex items-center">
                    <NavLink label="Dashboard" href="/dashboard" />
                    <NavLink label="New Post" href="/posts/create" />
                    <LogoutForm />
                </div>  
               )
              :
              ( 
                <div>
                   <NavLink label="Register" href="/register" />
                    <NavLink label="Login" href="/login" />
                </div>
              )
              }
 
          </nav>
    )
}