import { chatSelected } from "@/store/chat";
import { useAtomValue } from "jotai";

export default function ChatSection() {
  const chat = useAtomValue(chatSelected);

  if (!chat) {
    return (
      <p className="text-3xl font-semibold text-secondary-foreground h-full w-full grid place-items-center">
        Please select a chat!
      </p>
    );
  }

  return <>{JSON.stringify(chat)}</>;
}
