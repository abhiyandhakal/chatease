import { Popover } from "@headlessui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import ThemeToggler from "../mcsc/ThemeToggler";
import UserDisplay from "../mcsc/UserDisplay";
import { signOut } from "next-auth/react";
import { MouseEventHandler } from "react";

const PopoverElement = ({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick?: MouseEventHandler;
}) => {
	return (
		<button
			onClick={onClick}
			className="flex items-center justify-between gap-12 focus:opacity-70 focus:outline-transparent active:opacity-50"
		>
			{children}
		</button>
	);
};

const BottomPortion = ({
	fullName,
	username,
}: {
	profilePic?: string;
	fullName: string;
	username: string;
}) => {
	return (
		<Popover className="relative  h-[var(--bottom-portion-height)] bg-[var(--bg-primary)] ">
			<Popover.Button className=" flex h-full w-full items-center gap-1 ">
				<UserDisplay
					profilePic="/"
					isActive
					noUsername
					className="ml-3 h-full p-2"
				/>
				<div className="grid">
					<span className="text-lg font-semibold text-[var(--text-primary)]">
						{fullName}
					</span>
					<span className="text-md font-medium text-[var(--text-secondary)]">
						{username}
					</span>
				</div>
				<FiMoreHorizontal className="absolute right-6 text-xl " />
			</Popover.Button>

			<Popover.Panel className="absolute z-10 grid -translate-y-[150%]  translate-x-[100%]  gap-3 rounded-lg bg-[var(--bg-secondary)] p-4 focus:outline-transparent [&>button:hover]:opacity-80 [&>button>label]:cursor-pointer [&>div>svg]:cursor-pointer">
				<PopoverElement>
					<label htmlFor="theme-toggler">Toggle Theme</label>
					<ThemeToggler
						className=" bg-[var(--bg-primary)]"
						id="theme-toggler"
					/>
				</PopoverElement>
				<PopoverElement>
					<label htmlFor="my-profile">My Profile</label>
					<FaUserAlt
						className="mx-1  fill-[var(--text-primary)] text-lg"
						id="my-profile"
					/>
				</PopoverElement>
				<PopoverElement onClick={() => signOut()}>
					<label htmlFor="log-out">Log Out</label>
					<RiLogoutBoxRLine className="mx-1 text-lg" id="log-out" />
				</PopoverElement>
			</Popover.Panel>
		</Popover>
	);
};

export default BottomPortion;
