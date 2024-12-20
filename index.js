const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./Config/db");
const navbarroutes = require("./Routes/NavBarRoutes");

const server = express();

server.use(
  cors({
    origin: true,
    credentials: true,
  })
);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
connectDB();

server.use("/navbar", navbarroutes);

server.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
