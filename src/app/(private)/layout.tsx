import { sessionService } from "@/entities/user";
import { routes } from "@/kernel/routes";
import { Button } from "@/shared/ui/button";
import { redirect } from "next/navigation";
import React from "react";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = await sessionService.verifySession();

  return (
    <div>
      <header className="flex flex-row gap-4 justify-between items-center px-10 border-b fixed top-0 left-0 w-[100%] h-[80px] bg-[#030712] z-50">
        <form
          className="text-[20px]  hover:scale-125 transition-transform"
          action={async () => {
            "use server";
            redirect(routes.home());
          }}
        >
          <button
            type="submit"
            className="bg-transparent border-none cursor-pointer"
          >
            SUPER GAME
          </button>
        </form>
        <form
          className="flex gap-5 items-center"
          action={async () => {
            "use server";
            sessionService.deleteSession();
            redirect(routes.signIn());
          }}
        >
          <div className="text-[20px] mb-3">{String(session.login)}</div>
          <Button className="mt-4 border bg-red-500 text-white hover:bg-red-500/80 ">
            Sign out
          </Button>
        </form>
      </header>
      <div className="mt-[60px]">{children}</div>
    </div>
  );
}
