type PublicUser = {
  fullName: string;
  username: string;
  profilePic: string | null;
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
