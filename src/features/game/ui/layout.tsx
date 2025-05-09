import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ReactNode } from "react";

export function GameLayout({
  players,
  status,
  fields,
}: {
  players: ReactNode;
  status: ReactNode;
  fields: ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="border-b-[1px] border-gray-500">
        <CardTitle className="text-[28px] text-center ">
          Super game with X and O
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center flex-col text-center">
        {players}
        {fields}
        <div className="mt-5">{status}</div>
      </CardContent>
    </Card>
  );
}
