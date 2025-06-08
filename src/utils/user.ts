// utils/user.ts
import { getCollection } from "@/lib/db";
import { Result } from "@/lib/type";

import { ObjectId } from "mongodb";

type CreateUserInput = {
  username: string;
  email: string;
};

export async function createUser(input: CreateUserInput): Promise<Result<{ id: string }>> {
  try {
    const userCollection = await getCollection("users");
    
    const result = await userCollection.insertOne({
      ...input,
      createdAt: new Date(),
    });

    return { data: { id: result.insertedId.toString() } };
  } catch (error) {
    return { error: "Failed to create user." };
  }
}
