import Image from "next/image";

const UserDisplay = ({
  username,
  isActive,
  noUsername,
  className,
  imgClassName,
}: {
  profilePic: string;
  username?: string;
  isActive?: boolean;
  noUsername?: boolean;
  className?: string;
  imgClassName?: string;
}) => {
  return (
    <div
      className={`grid aspect-square place-items-center hover:opacity-70 focus:opacity-80 active:opacity-50 ${className} `}
    >
      <picture
        className={`aspect-square h-full rounded-full bg-green-700 ${
          isActive ? "p-1" : ""
        }`}
      >
        <Image
          src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
          height={80}
          width={80}
          className={`h-full w-full rounded-full object-cover ${imgClassName}`}
          alt="profile"
        />
      </picture>

      {noUsername || (
        <span className="w-full truncate text-center text-lg">{username}</span>
      )}
    </div>
  );
};

export default UserDisplay;
