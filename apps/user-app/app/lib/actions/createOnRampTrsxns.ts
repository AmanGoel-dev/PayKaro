"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  //token has to come from bank but i dont have acces to bank so a random token
  const token = Math.random().toString();
  const userId = session.user.id;
  if (!userId) {
    return {
      message: " User not Logged in",
    };
  }
  await prisma.onRampTransaction.create({
    data: {
      provider,
      userId: Number(userId),
      amount: amount,
      startTime: new Date(),
      status: "Processing",
      token,
    },
  });
  return {
    message: " onramptransactions Successfull",
  };
}
