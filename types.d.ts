export interface User {
	_id: string;
	name: string;
	avatar: string;
	email: string;
	username: string;
	friends: User[];
	pendingRequests: User[];
	blockList: User[];
	groupChats: Chat[];
	__v: number;
	emailVerified: Date;
}
