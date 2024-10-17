import Image from "next/image";

export default function User({ user }: { user: User }) {
  return (
    <div className="flex gap-2 w-full py-2">
      <Image
        src={user.profilePic || "/default-profile.webp"}
        alt={user.fullName}
        height={40}
        width={40}
        className="aspect-square rounded-full w-14 h-fit"
      />
      <div className="flex flex-col justify-center items-start">
        <h2 className="font-semibold text-xl">{user.fullName}</h2>
        <p className="font-light">@{user.username}</p>
      </div>
    </div>
  );
}
