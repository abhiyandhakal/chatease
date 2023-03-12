import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Chat",
  },
  content: {
    type: String,
    required: true,
  },
  reaction: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  editedAt: {
    type: Date,
    default: null,
  },
});

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
