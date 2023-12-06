require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const router = require("./routes");

app.use(cors());
app.use(cookieParser());
app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log("server started")
})
