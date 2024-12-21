import { getServerSession } from "next-auth";
import SendCard from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { Getp2ptransactions } from "../../../components/Getp2ptransactions";

async function getBalance() {
  const session = await getServerSession(authOptions);

  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getp2ptransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransactions.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
    select: {
      toUser: true,
      amount: true,
      timeStamp: true,
    },
  });
  return txns.map((t) => ({
    time: t.timeStamp,
    amount: t.amount,
    ToUser: t.toUser.number,
  }));
}

export default async function () {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  const balance = await getBalance();
  const transactions = await getp2ptransactions();
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <SendCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <Getp2ptransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
