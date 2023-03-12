import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../db/connect";
import User from "../../../db/models/user-model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();

    if (!req.query.id)
      return res.status(400).json({ success: false, message: "Missing id" });

    switch (req.method) {
      case "GET":
        // Get a user
        const userGot = await User.findById(req.query.id);
        res.status(200).json({ success: true, data: userGot });
        break;

      case "PATCH":
        // Update a user
        const userUpdated = await User.findOneAndUpdate({
          username: req.body.username,
        });
        res.status(200).json({ success: true, data: userUpdated });
        break;

      case "DELETE":
        // Delete a user
        const userDeleted = await User.findOneAndDelete({ _id: req.query.id });

        if (!userDeleted)
          return res
            .status(400)
            .json({ success: false, message: "User not found" });

        res.status(200).json({ success: true, data: userDeleted });
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
