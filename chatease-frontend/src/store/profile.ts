import { getOwnUserDetail } from "@/lib/api/user";
import { atom } from "jotai";

// Fetch user profile from the backend and store it in the atom
export const userAtom = atom(async () => {
  const response = await getOwnUserDetail();
  const data = response.data;
  return data as User;
});
