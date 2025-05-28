import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user }} = await supabase.auth.getUser();
  if(user) {
    redirect("/chats");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-700">
      <h1 className="text-5xl font-bold text-white">Welcome to the <span className="text-black">Chat Application</span></h1>
      <Button className="mt-4 font-bold shadow-2xl" variant="secondary">
        <Link href="/signup">Get started...</Link>
      </Button>
    </div>
  );
}
