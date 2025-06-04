# 🚀 Learning Nextjs with MongoDB, JWT (Jose), Zod (validations) & bcrypt

## Course
-  [✅] App Structure
-  [✅] Pages
-  [✅] Layouts
-  [✅] Routes
-  [✅] Forms
-  [✅] Cookies
-  [✅] Sessions
-  [✅] Database - Mongo DB
-  [✅] Fonts
-  [✅] Active Links
-  [✅] Authentication
-  [] CRUD actions



## Steps by Steps Installation
- [✅] npx create-next-app@latest
- [✅] Change the .Js into Jsx coz we render html

## Terminal 
- npm run dev -- to start development

## 🛠️ Package  I'm Using
- Jose (JWT)
- zod for Validation
- bcrypt


## 🧠 Notes & Learnings
--
# Day 1
- in next js routing the name it must be pages and layout @example if i will create new dir Dashboard/page.jsx it must be inside this folder is Page otherwise next would not recognize it and it will shows 404
- & if you put a layout.jsx inside in that folder that dashboard page will use  that layout inside that you set
- if you want to create another folder inside the dashboard if you want to access it you must put @example localhost::3000/dashboard/user the [user] is the name of that folder
- to avoid browser request using a tags you must use the Link of next js just like the inertia with has a param of href and you can also use className inside
- @use server and @use client @more strict
- use server only use in server while the use client is only in the client this involve the react hooks that only use in client
- 
# Day 2
- (auth) by using this in folder it will skip the dir auth and the dir will be the same as register this will helps when you have multi folder structure
- useActionState - this state is from react then it has 3 [state,action,isPending] = useStateAction(register,undefined)
- action is where you put in the form tags action ={action}
- then the register in the first param in the actionState is a function name in the actions server
- isPending is a boolean, when you submit a form the isPending will be true and after you submit it will be back false after submission
- by using the react hooks useActionState it will get an error if you dont put a [use client] in that page or file coz you can only use react hooks in the client only
- then in the server you must put ['user server'] on the top that will all the function must be run in the server only not in the client
- when using "user server" in the server action you must put all function into async coz it all function in the server must be asynchronous and you must wait the server

# Day 3
- server only actions
- in nextjs 15 components by default is server components
- by putting [use client] directives it will make a client components
- by putting use client in the client components then the component from the server you use use server then when you call that in client it will get an error
- async and await are not yet supported in client components
- @note all server component must be asynchronous
- it will work to render a server component when you put that inside useEffect then use async function inside useEffect then put the component you want to use or render
- @more strict the import "server-only"
- the method above will get an error if you use component from the server into a client components
- one example to use the server-only in our db.js and session.js

# @form Validation with package zod
- installing zod package [npm i zod] in the terminal
- create a folder lib in src/lib then you can create rules.js there or rules.ts for typescript
- you can create a registerFormSchema for validation of the register form
- to make it clear just read the docs of zod validations https://zod.dev/basics
- console.log(validatedFields) //if we use this, the validatedFields if not success, it will expect a getter thats why se use validatedFields.error.flatten.fieldErrors to convert it into text in a array
- in the useStateAction when submitting the form the [state] is the state of the form then you can grab the errors you set in your rules
- in that state you can grab errors or data that you set to return in the client side like when it got an error you can return the old email and grab that using the state of useStateAction of react
- @Note zod validatedFields provide object data [formData.data] if success in validation

 # @DB integration --Mongo DB
 - set up mongodb atlas
 - first create an account in there website https://www.mongodb.com/atlas
 - fill up the forms or sign up using google account
 - create new clusters then select free for learning
 - set up -database access- name -admin_user authentication-method SCRAM mongoDB roles -atlasAdmin -all resources [default] read the instruction, set up by default to access all resources
 - set duration to 1 week
 - network access = set to ip address to allow anywhere since im using local dev
 - go back to your cluster then click connect then select drivers since im using node js version 6.7 latest 
 - then install mongodb [npm i mongodb]
 - then copy the provided db password then create an .env.local then you store that in there also the password
 - create a file inside the lib/db.js then check if the DB_URI in the env. is exist then all function will follow
 - note change the require(mongodb) into es17 from require to [from]
 - then copy the server api in the cluster -connect -driver - view full code sample then copy the server api
 - then make sure that the [ServerApiVersion] is installed
- after set up the db test it in your auth const userCollection = getCollection('users'); then console.log it
- if success then it must show connected to DB

# @installing bcrypt
- [npm i bcrypt] for password

# Redirect
- next js has redirect function you must import it from next/navigation

# Installing Jose (JWT) for cookies and session (stateless session)
- [npm i jose]
- create session in lib[session.js]
- create a secret key in .env use [openssl rand -base64 32] to generate random key
- in your session file get the secret key from .env then make that a encodedKey from the js new TextEncoder
- then create a  function that will encrypt by using JWT from jose with Sign using your secret key that already change into encodedKey with algorithms of [HS256]
- after that create a @decrypt function that will decrypt the encrypted session
- create a function that will createSession using that encrypt function bind with your first arguments [userId] and store in cookies()
- it will store jwt tokens in your cookies that name [session]

# Implement own local fonts [google font]
[
    import localFont from 'next/font/local';

const myFont = localFont({ 
  src : [
      {
        path : "../fonts/Poppins-Bold.ttf",
        weight : "600",
        style : 'bold'
      },
      {
        path : "../fonts/Poppins-Light.ttf",
        weight : "200",
        style : 'light'
      },

    ] 
});
] - this is how to use local font
- using google font download from [fonts.google.com/specimen/Poppins]
- create a folder fonts in src/fonts then put the font you like
- then go to your layout then const myFont = localFont({ src : '../fonts/Poppins-Bold.ttf'}); use this
- then put in your body tags className= {myFont.className} to implement your own local font you want to use
- if you have diff fonts you want to use you can pass an object array in the 2nd args in
-  you can use font Poppins from next/font/google from nextjs

# Active Links
- usePathName from next/navigation [reacthooks] when using react hooks you must put directives above [useclient]
- i set the navlink into a reusable components with two props [label,href]
- then create a navigation components then put all the nav there coz in the future we use getAuth to not show login and register if the user is already login or register

# Login system
- create another action state login
- create loginFormSchema it is just like in laravel formRequest to validate the request then returns an error by using zod validation
- by matching the password you must use bcrypt compare(plainPassword, hashPassword from the collection or DB)
- don't forget to convert it into string .string() to store _id in session coz by default from mongodb it is an object
- then create a session