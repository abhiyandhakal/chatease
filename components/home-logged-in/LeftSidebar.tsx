import Image from "next/image";
import LogoImage from "../../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import Link from "next/link";
import BottomPortion from "./BottomPortion";
import ActiveStatusbar from "./ActiveStatusbar";
import UserChats from "./UserChats";

const LeftSidebar = () => {
  return (
    <aside className="left-sidebar relative h-screen w-[clamp(30rem,25vw,40rem)] bg-[var(--bg-secondary)] shadow ">
      {/* logo */}
      <section className="relative h-[var(--logo-height)] bg-[var(--bg-primary)] p-3">
        <Link href={"/"} className="flex items-center text-2xl">
          <Image src={LogoImage} alt="logo" height={60} width={60} />
          <span className="font-extrabold tracking-widest">ChatEase</span>
        </Link>
      </section>

      {/* search bar and add group */}
      <section className="m-3 grid h-[var(--searchbar-height)] grid-cols-[1fr_auto] gap-3 rounded-xl">
        <form className="flex items-center gap-3 rounded-xl bg-[var(--bg-primary)] px-3 text-xl">
          <FiSearch size={20} />
          <input
            type="text"
            className="w-full bg-transparent outline-none"
            placeholder="Search User"
          />
        </form>
        <button className="rounded-xl bg-[var(--bg-primary)] p-4">
          <FaUserFriends className="text-2xl text-[var(--text-primary)]" />
        </button>
      </section>

      {/* active friends and status */}
      <ActiveStatusbar />

      {/* user chat section */}
      <UserChats />
      {/* logout and setting */}
      <BottomPortion fullName="John Doe" profilePic="/" username={`@johnnyb`} />
    </aside>
  );
};

export default LeftSidebar;
