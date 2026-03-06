const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const educationRoute = require("./routes/educationRoute");
const experienceRoute = require("./routes/experienceRoute");
const certificationRoute = require("./routes/certificationRoute");
const cors = require("cors");

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.use("/api/education", educationRoute);

app.use("/api/experience", experienceRoute);

app.use("/api/certification", certificationRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port : ${process.env.PORT}`);
});
