// app/page.tsx
import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/home/ui/views/home-view";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getCaller } from "@/trpc/server"; // new import for tRPC caller

const Page = async () => {
  try {
    // keep your session code unchanged
    const session = await auth.api.getSession({
      headers: await headers(), // same as you had
    });

    if (!session) {
      redirect("/sign-in");
    }

    // new tRPC usage
    const caller = await getCaller();
    const data = await caller.hello({ text: "kedar" });

    return <p>{data.greeting}</p>;
    // or use <HomeView /> if you want:
    return <HomeView />;
  } catch (err) {
    console.error("Error fetching session:", err);
    redirect("/sign-in");
  }
};

export default Page;
