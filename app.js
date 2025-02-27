const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const contactsRouter = require("./src/contacts/contacts.router.js");
const usersRouter = require("./src/users/users.router.js");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(express.static("public"));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
