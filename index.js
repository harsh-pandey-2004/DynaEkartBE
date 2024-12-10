const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = express();

server.use(cors()); 
server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", (req, res) => {
  res.send("Welcome to the Express Server!");
});

server.get("/api/example", (req, res) => {
  res.json({ message: "This is an example API route!" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
