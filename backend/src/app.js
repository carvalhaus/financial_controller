require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const invitFriendRoutes = require("./routes/invitFriendRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(authRoutes);
app.use("/api", protectedRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(expenseRoutes);
app.use(invitFriendRoutes);

app.post("/api/clear-cookies", (req, res) => {
  res.clearCookie("token");

  res.status(200).json({ message: "Cookies cleared successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
