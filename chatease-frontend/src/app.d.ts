type User = {
  username: string;
  fullName: string;
  profilePic?: string | null;
};

type Chat =
  | {
      type: "direct";
      user: User;
    }
  | {
      type: "group";
      name: string;
      owner: User;
      users: User[];
    };

type ChatMessage = {
  id: string;
  chat: Chat;
  sender: User;
  content: string;
  createdAt: string;
  updatedAt: string;
};
