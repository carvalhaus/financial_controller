require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(authRoutes);

app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
