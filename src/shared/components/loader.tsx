import { cn } from "../lib/css";

export function Loader({
  className,
  numberOfCircle = 3,
}: {
  className?: string;
  numberOfCircle?: number;
}) {
  return (
    <div className="flex absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-row gap-5">
      {Array.from({ length: numberOfCircle }).map((_, index) => (
        <div
          key={index}
          className={cn(
            className,
            "w-20 h-20 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]",
            `[animation-delay:${index * 3}s]`
          )}
        ></div>
      ))}
    </div>
  );
}
