import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  isGroupChat: {
    type: Boolean,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  users: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      nickname: String,
    },
  ],
  chatPicture: String,
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  status: String,
  membersRequest: [mongoose.Schema.Types.ObjectId],
});

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
