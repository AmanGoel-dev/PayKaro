import { getServerSession } from "next-auth";
import SendCard from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function () {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  return (
    <div className=" w-full">
      <div className="text-4xl text-[#6a51a6] pt-6  font-bold">
        Transfer Money To Your Friend
      </div>
      <SendCard />
    </div>
  );
}
