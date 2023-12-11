const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/contacts", require("./routes/api/contacts"));
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
