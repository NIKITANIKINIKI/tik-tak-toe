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
  const { session }  = await sessionService.verifySession();

  return (
    <div>
      <header className="flex flex-row gap-4 justify-between items-center px-10  border-b">
        <div className="text-[20px]">SUPER GAME</div>
        <form
          className="flex  gap-5 items-center"
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
      {children}
    </div>
  );
}
