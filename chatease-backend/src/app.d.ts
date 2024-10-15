type PublicUser = {
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
