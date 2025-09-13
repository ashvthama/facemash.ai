import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/home/ui/views/home-view"
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const Page = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      redirect("/sign-in");
    }

    return <HomeView />;
  } catch (err) {
    console.error("Error fetching session:", err);
    redirect("/sign-in");
  }
};

export default Page;
