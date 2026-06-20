require("dotenv").config();
console.log(
  "Gemini Key:",
  process.env.GEMINI_API_KEY
);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const appointmentRoutes =
require("./routes/appointments");
const authRoutes =
require("./routes/auth");
app.use(cors());
app.use(express.json());
console.log(process.env.MONGO_URI);
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const chatbotRoutes =
require("./routes/chatbot");

app.use(
 "/api/chatbot",
 chatbotRoutes
);

app.use(
  "/api/doctors",
  require("./routes/doctors")
);
app.use(
  "/api/appointments",
  appointmentRoutes
);
app.listen(
  process.env.PORT,
  () =>
    console.log(
      `Server Running on ${process.env.PORT}`
    )
);
app.use("/api/auth", authRoutes);
const chatRoutes =
require("./routes/chat");

app.use(
"/api/chat-history",
chatRoutes
);