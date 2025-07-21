import { Label } from "@/shared/ui/label";

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
        <Label className="text-[26px]">{label}</Label>
        {actions}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">{children}</div>
    </>
  );
}
