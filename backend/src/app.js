require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const registerUser = require("./routes/registerUser");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(authRoutes);

app.use(registerUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
