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
- npm install react-hot-toast #for Pop up notification


## 🛠️ Package  I'm Using
- Jose (JWT)
- zod for Validation
- bcrypt
- react-hot-toast [Notification]


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

# @typescript - Type.ts in @lib
- a typescript for PostFormFields and PostFormError Response
- in the createPost i put the void first coz i check the user if login then redirect into home page
- The issue is that redirect() throws an exception, not returns a value — it never resolves the Promise normally.
- TypeScript sees that and complains because redirect() is not compatible with PostErrorResponse | void
- PostErrorResponse | void
- in TypeScript, never represents a function that never returns (e.g. throws an error or redirects). Since redirect() throws internally, never tells TypeScript "this line stops execution."
- Concept	Explanation interface vs type	Use [interface] for [objects], [type] for [flexibility] or [primitives]
 # @example [TS]
  interface User {
    id: string;
    name: string;
  }

  type ID = string | number;

  type UserWithRole = User & { role: string };

# Create Post
- i add typescript in server to make it safety and readability
- by adding post it is similar in register the only diff is to check if the user is logged in then he can insert data in DB then the userAuth from the session we can grab the userId to insert it in the post Table or Collections
- i create a components for BlogForm then the actionState is a dynamic using props in handler

# Read or Display Data [Posts]
- by passing props you must use {props} or else it will not get the data
- Why {}? Because props are just a JavaScript object under the hood
- When calling a regular JavaScript/TypeScript function, parameters are passed by position, not by object unless explicitly required.
- You only use {} if the function expects an object:
- sort({ $natural: -1 }) mongo db reverse array or in laravel .latest()

# Show Data by clicking specific Post
- by making the folder wrap into two array bracket [id] the [id] is a folder and inside it make a file page
- so in the url it will make params
- to get the url params you use a props params and this is a promise
- then grab the id params in the url or destructure it using {id} = await params;
- then get the collections from the mongodb atlas then find one query from mongodb filter by id
- then pass it in the PostCard components
- use ternary operator to check if the url params is valid
- I put a custom loading inside the app [loading.jsx] it will be default loading state

# Loading & suspense from react
- without loading file in the app/loading.jsx if you use suspense from react with fallback return loading <p>loading...<p> it will shows loading the p tags in that specific component you want to render if that components fetching data from the DB like mongoDB atlas
- suspense from react lets you display a fallback until its children have finished loading
- but if you use loading state or [loading.jsx] in the app/ it will wrap all children with this loading it will make a default loading file or animation

# nextjs Dynamic
- import dynamic from 'next/dynamic';

const PostCard = dynamic(() => import('@/components/PostCard'), {
  suspense: true
});
- Imported at runtime only when needed
- Supports code-splitting
- Allows Suspense fallback UI
- Reduces JS bundle size
- Great for heavy components (charts, modals, 3rd party libs)

# install react-hot-toast
- link https://react-hot-toast.com/
- npm i react-hot-toast
- then import { Toaster } from "react-hot-toast"; in your main layout
- then <Toaster position="top-center" /> inside you main div or anywhere you want
- please see full docs in the provided link

# adding toast Notification using redirect() with params from nextjs
- redirect('/?error=unauthorize')
- const searchParams = useSearchParams();
  const hasShown = useRef(false); // like a box that stores a value without causing re-renders.

  useEffect(() => {
    if (hasShown.current) return; // skip if already shown
    const error = searchParams.get('error');

    if (error === 'unauthorized') {
      toast.error("You can't edit this post that you don't own!");
      hasShown.current = true;
    }
  }, [searchParams]);
- but you can only use this in client side not in server

# Update Function
- use the components blog form then pass new params [post] into it and use that in the defaultFormData but make sure to put the state? first before that || post?.title to get the state form data first, ex. if you edit the title then you submit without content or empty it will stay the text that you added
- in the edit page with dynamic id by default of nextjs router you put a [params] in that component to use that or get that from the urlParams post/232sdsd
- then use an await to avoid error
- then destructure it and grab that id [name of the folder] posts/[id]
- then use a server function getCollection from MongoDB
- check if the id is length === 24 if true then query
- then convert the params id into a objectId by MongoDB coz when querying using id in MongoDB it must be an object then if you want to use it or compare it in the client side or server side it is advisable to convert that into a string .toString()
- i add a type type for a Message with two properties the {message, type : msgType } for promise Type that can be used in updating and adding a post
-

# ✅ When you do need to serialize: Server Data or from Mongo DB data into client component
- You need to JSON.parse(JSON.stringify(...)) only when:
- You're passing data from Server Component to Client Component via props
- You're using fetch/getServerSideProps/API route that sends JSON responses
- You want to store MongoDB data into localStorage or JSON.stringify it
- ✅ You didn’t need to convert post to JSON because both Home and PostCard are Server Components
- ❌ You must convert it (or at least serialize _id) if you're passing it to a Client Component
- 🔥 Rule of thumb: Anything going to the client must be serializable


# Result<T> -  discriminated union type or Result pattern
- in Typescript the function<T> is the parameters the type of parameters you want
- by Setting T it is a generic parameters which you can pass any type in this function when you didnt set any type of that
- example createPost<Post>(params) the <Post> is the type you want that this function params must be strict to accept that kind of type you set
- export default function convertToJSON<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

# !MongoDB database access Exp
- when its expires create another one name : admin_user
- then set put old password there
- all you need to choose in the form is the custom roles or built in role [atlas-admin]
- const client = new MongoClient(uri);
- await client.connect();
- when using that You’re opening a new connection every time. avoid using this
- convert it into a singleton connection pattern

| 🔍 Problem                             | 💡 Solution                                              |
| -------------------------------------- | -------------------------------------------------------- |
| Calling `client.connect()` every time  | Cached `clientPromise` ensures one persistent connection |
| Hot reload in dev creates many clients | Global variable prevents reconnecting on reload          |
| Risk of unclosed connections           | Connection is reused, never closed until app exit        |
- i Add NODE_ENV in the env for production or dev fro the DB configuration

 
# Hooks
- usePagination
# Components
- PostTable
- TableComponent

# Dashboard
- is a server components

# 🧠  Discoveries || Learnings
- you can use a client components in the server components
- ex: the PostTable components i use it in the dashboard which is a server components
- but note before you can pass a objects array from server components into a client it must be converted into JSON to avoid conflict or errors coz from the Mongodb the data is an object[objectId]
- in Mongo DB you must set the db config to Global when your environment is in [development] to avoid refetching the data from the mongo
- set into a global but in production avoid use global to avoid memory leaks
- revalidatedPath can only be use in the server component not in the client
- revalidatedPath refresh the cache data within specific routes
- the equiv. of revalidatedPath is the useRouter from react it will refetch the data into cache
- router.push or router.refresh


# Delete Post
- store postId in the hidden tag using form
- check if the user is the owner of this post
- check if this post is exist in db
- create a useStateAction from react and use that in the postTable for the pop up notification and disabling the button delete
- use a useStateHook from react to get and store the post id from the delete form if it is the same as in the selected delete button to target to disabled it when submitting the form
- form={action} is for server when you use a client side function it must be pass using onSubmit
- You're using a form action with a client-side function (handleDelete), which won’t work properly unless it’s marked as a server action using use server, or handled entirely via onSubmit.

- Since handleDelete is a client-side function, the correct way to handle it is to use onSubmit instead of action.
- 🔍 Why?
- form action={fn} is used for server actions in Next.js.
- Since handleDelete is a client function, it must be triggered via onSubmit.
