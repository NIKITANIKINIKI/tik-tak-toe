import { Label } from "@/shared/ui/label";
import { PropsWithChildren } from "react";

export function Layout({
  children,
  actions,
  label,
}: {
  children: React.ReactNode;
  actions: React.ReactNode;
  label: string;
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-between items-center">
        <Label  className="text-[26px]">{label}</Label>
        {actions}
      </div>
      <div className=" grid grid-cols-2 gap-4">{children}</div>
    </>
  );
}
