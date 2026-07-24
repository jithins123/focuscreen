import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FocusDashboard from "./FocusDashboard";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return <FocusDashboard />;
}