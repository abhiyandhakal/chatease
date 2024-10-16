import { getChatList } from "@/lib/api/chat";
import { atom } from "jotai";
import { atomWithRefresh } from "jotai/utils";

export const chatList = atomWithRefresh(async () => {
  const response = await getChatList();
  const data = response.data.data;
  return data as Chat[];
});

export const chatSelected = atom<Chat | null>(null);
