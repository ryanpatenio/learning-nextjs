import { getCollection } from "@/lib/db";
import getAuthUser from "@/lib/getAuthUser";
import { ObjectId } from "mongodb";
import PostsTable from "@/components/PostTable";
import convertToJSON from "@/utils/convertToJSON";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getAuthUser();
  const userId = user?.userId;
  
  if(!userId) return redirect('/');

  const postCollection = await getCollection("posts");
  const userPosts = await postCollection
        ?.find({ userId: ObjectId.createFromHexString(userId) })
        .sort({ $natural: -1 })
        .toArray();
    
    if(!userPosts) return <p>Failed to fetch the data...</p>
    if(userPosts.length === 0) return <p>You don't have a post yet!</p>

    const postData = convertToJSON(userPosts);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>   
        <PostsTable posts={postData} />
    </div>
  );
}
