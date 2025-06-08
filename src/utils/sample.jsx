
// 'use client';

// import { useActionState } from "react";
// import { createUser } from "@/utils/user";

// import { useEffect } from "react";
// import toast from "react-hot-toast";
// import { Result } from "@/lib/type";

// async function handleCreateUser(_: unknown, formData: FormData): Promise<Result<{ id: string }>> {
//   const username = formData.get("username") as string;
//   const email = formData.get("email") as string;

//   return await createUser({ username, email });
// }

// export default function SignUpPage() {
//   const [state, formAction] = useActionState(handleCreateUser, null);

//   useEffect(() => {
//     if (state?.data) {
//       toast.success("User created successfully!");
//     }
//     if (state?.error) {
//       toast.error(state.error);
//     }
//   }, [state]);

//   return (
//     <form action={formAction} className="space-y-4">
//       <input name="username" placeholder="Username" className="border p-2 block w-full" />
//       <input name="email" type="email" placeholder="Email" className="border p-2 block w-full" />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
//     </form>
//   );
// }

// TypeScript Generic Type Placeholder
// type Post = {
//   _id: string;
//   title: string;
//   content: string;
// };

// const postFromDb = {
//   _id: new ObjectId().toString(),
//   title: 'Hello',
//   content: 'World',
// };

// const safePost = convertToJSON<Post>(postFromDb); // 💡 T is Post
