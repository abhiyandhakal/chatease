import UserDisplay from "./UserDisplay";

const UserChat = ({
	username,
	lastMessage,
	lastSeen,
}: {
	profilePic: string;
	username: string;
	lastMessage: string;
	lastSeen: string;
	isActive?: boolean;
	noUsername?: boolean;
	isSelected?: boolean;
}) => {
	return (
		<button className="relative my-1 flex h-[var(--user-chat-height)] w-[calc(100%_-_2_*_var(--space-3))] items-center gap-3 rounded-md bg-[var(--bg-primary)] px-3 shadow-sm">
			<UserDisplay
				profilePic=""
				key={crypto.randomUUID()}
				isActive
				noUsername
				className="h-4/5"
			/>
			<div className="grid">
				<span className="text-lg font-medium">{username}</span>
				<span className="text-md text-[var(--text-secondary)]">
					{lastMessage}
				</span>
			</div>

			<span className="absolute right-3 text-sm">{lastSeen}</span>
		</button>
	);
};

export default UserChat;
