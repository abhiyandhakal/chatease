type User = {
  id: string;
  username: string;
  fullName: string;
  profilePic?: string | null;
  is_online?: boolean;
};

type Chat = { id: string } & (
  | {
      type: "direct";
      user: User;
    }
  | {
      type: "group";
      name: string;
      description: string;
      owner: User;
      users: User[];
    }
);

type ChatMessage = {
  id: string;
  sender: User;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  status?: "sending" | "failed" | "sent";
};
