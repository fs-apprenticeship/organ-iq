import { redirect } from "next/navigation";
import getCurrentAccount from "@/features/identity/api/get-current-account";

export default async function Home() {
  const isSignedIn = await getCurrentAccount();

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  redirect("/game");
}
