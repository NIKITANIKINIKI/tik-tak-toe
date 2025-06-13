import { useEffect, useState } from "react";

export function useEventSource<T>(url: string, onData?: (data: T) => void) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(url);

    const handleMessage = (message: MessageEvent) => {
      try {
        const parsed = JSON.parse(message.data);
        setData(parsed);
        setIsError(false);
        setIsLoading(false);
        onData?.(parsed);
      } catch {
        setIsError(true);
      }
    };

    const handleError = () => {
      setIsError(true);
    };

    eventSource.addEventListener("message", handleMessage);
    eventSource.addEventListener("error", handleError);

    return () => {
      eventSource.removeEventListener("message", handleMessage);
      eventSource.removeEventListener("error", handleError);
      eventSource.close();
    };
  }, []);

  return { data, isLoading, isError };
}
