import { type MouseEventHandler } from "react";
import Image from "next/image";

const UserDisplayBtn = ({
  username,
  isActive,
  noUsername,
  onClick,
  type,
}: {
  profilePic: string;
  username?: string;
  isActive?: boolean;
  noUsername?: boolean;
  onClick?: MouseEventHandler;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      onClick={onClick}
      className="grid place-items-center hover:opacity-70 focus:opacity-80 active:opacity-50"
      type={type}
    >
      <picture
        className={`aspect-square rounded-full bg-green-700 ${
          isActive ? "p-1" : ""
        }`}
      >
        <Image
          src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
          height={80}
          width={80}
          className="h-full w-full rounded-full object-cover "
          alt="profile"
        />
      </picture>

      {noUsername || (
        <span className="w-full truncate text-center text-lg">{username}</span>
      )}
    </button>
  );
};

export default UserDisplayBtn;
