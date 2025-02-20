type PublicUser = {
  id: string;
  fullName: string;
  username: string;
  profilePic: string | null;
  is_online: boolean;
};

type Chat = { id: string } & (
  | {
      type: "direct";
      user: PublicUser;
    }
  | {
      type: "group";
      name: string;
      description: string;
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
