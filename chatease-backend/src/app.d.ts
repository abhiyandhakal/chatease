type PublicUser = {
  id: string;
  fullName: string;
  username: string;
  profilePic: string | null;
};

type Chat = { id: string } & (
  | {
      type: "direct";
      user: PublicUser;
    }
  | {
      type: "group";
      name: string;
      owner: PublicUser;
      users: PublicUser[];
    }
);

type ChatMessage = {
  id: string;
  sender: User;
  content: string;
  createdAt: string;
  updatedAt: string | null;
};
