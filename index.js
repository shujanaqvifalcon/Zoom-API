const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();

//registering middlewares

app.use(cors());
app.use(express.json());

//registering routes
app.use("/api/zoomapi", require("./zoomRouter"));

//listening to port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});