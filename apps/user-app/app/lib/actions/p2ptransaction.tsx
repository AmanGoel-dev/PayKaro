"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

const p2ptransaction = async (toperson_number: string, amount: number) => {
  const session = await getServerSession(authOptions);
  const frompersonId = session?.user?.id;
  if (!frompersonId) {
    return {
      message: "error while sending",
    };
  }
  const toUser = await prisma.user.findFirst({
    where: {
      number: toperson_number,
    },
  });
  if (!toUser) {
    return {
      message: "User Not Found",
    };
  }
  try {
    await prisma.$transaction(async (tx) => {
      //locking the row so that no one can send two transaction at same time
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(frompersonId)} FOR UPDATE`;
      const fromPersonBalance = await tx.balance.findUnique({
        where: {
          userId: Number(frompersonId),
        },
      });
      // checking for suffiecinet balance
      if (!fromPersonBalance || fromPersonBalance.amount < amount) {
        throw new Error("Insuffiecent funds");
      }

      await tx.balance.update({
        where: {
          userId: Number(frompersonId),
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });
      await tx.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });
      await tx.p2pTransactions.create({
        data: {
          toUserId: toUser.id,
          fromUserId: Number(frompersonId),
          timeStamp: new Date(),
          amount,
        },
      });
    });
  } catch (error) {
    console.log(error);
    return {
      message: "transaction failed",
    };
  }
  return {
    message: "payemnt success",
  };
};

export default p2ptransaction;
