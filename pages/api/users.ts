import connectDb from "@/db/connect";
import { NextApiRequest, NextApiResponse } from "next";
import User from "@/db/models/user-model";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		await connectDb();

		switch (req.method) {
			case "GET":
				// Get users
				let usersGot;
				console.log(req.body.params);
				if (req.body.users) {
					const users = req.body.users;
					usersGot = await User.find({ _id: { $in: users } });
				} else if (req.body.username) {
					const username = req.body.username;
					usersGot = await User.find({ username });
				} else if (req.body.email) {
					const email = req.body.email;
					usersGot = await User.find({ email });
					console.log(usersGot);
				} else usersGot = await User.find({});

				res.status(200).json({ success: true, data: usersGot });
				break;

			case "POST":
				// Create a new user
				const user = await User.create(req.body);
				res.status(201).json({ success: true, data: user });
				break;

			case "DELETE":
				// Delete users
				let usersDeleted = await User.deleteMany({});

				if (req.body.users) {
					const users = req.body.users;
					usersDeleted = await User.deleteMany({ _id: { $in: users } });
				}

				res.status(200).json({ success: true, data: usersDeleted });
				break;

			default:
				res.status(405).json({ message: "Method not allowed" });
				break;
		}
	} catch (error) {
		if (error instanceof Error)
			res.status(500).json({ success: false, message: error.message });
		else
			res.status(500).json({ success: false, message: "Something went wrong" });
	}
}
