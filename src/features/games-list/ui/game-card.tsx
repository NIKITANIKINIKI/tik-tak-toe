import { Card, CardContent, CardTitle } from "@/shared/ui/card";

export function GameCard({ login, rating }: { login: string; rating: number }) {
  return (
    <Card>
      <CardTitle className="px-6">Игрок: {login}</CardTitle>
      <CardContent>Рейтинг: {rating}</CardContent>
    </Card>
  );
}
