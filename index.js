const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./Config/db");
const navbarroutes = require("./Routes/NavBarRoutes");
const productRoutes = require("./Routes/productRoutes");
const logoRoutes = require("./Routes/logoRoutes");
const CategoryRoutes = require("./Routes/CategoryListRoutes");
const BlogRoutes = require("./Routes/blogRoutes");
// const footerRoutes = require("./Routes/footerRoutes");

const server = express();

server.use(
  cors({
    origin: true,
    credentials: true,
  })
);
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
connectDB();

server.use("/navbar", navbarroutes);
server.use("/product", productRoutes);
server.use("/logo", logoRoutes);
server.use("/category", CategoryRoutes);
server.use("/blog", BlogRoutes);
// server.use("/footer", footerRoutes);

server.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
