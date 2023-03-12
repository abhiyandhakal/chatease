import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	friends: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	pendingRequests: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	blockList: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	groupChats: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
		},
	],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
