import { getChatList } from "@/lib/api/chat";
import { atom } from "jotai";
import { atomWithRefresh } from "jotai/utils";

export const chatListAtom = atomWithRefresh(async () => {
  const response = await getChatList();
  const data = response.data.data;
  return data as Chat[];
});

export const chatSelectedAtom = atom<Chat | null>(null);

export const chatMessagesAtom = atom<
  {
    messages: ChatMessage[];
    chatId: string;
  }[]
>([]);
