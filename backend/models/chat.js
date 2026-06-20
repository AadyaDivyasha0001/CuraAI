const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  messages: [
    {
      sender: String,
      text: String,

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
},
{
  timestamps: true,
}
);

module.exports =
mongoose.model("Chat", ChatSchema);