require("dotenv").config();
const express = require("express");
const cors = require("cors");
const loginRouter = require("./api/routes/loginRouter");
const userRouter = require("./api/routes/userRouter");

// Uncomment and write in the console "npm run serve" to setup db automatiquely
// require("./db/command");
// require("./db/ingredient");
// require("./db/product");
// require("./db/user");
// const { sequelize } = require("./db/connection");
// sequelize.sync({ alter: true });

const hostname = "localhost";
const port = 4000;
const app = express();

app.use(cors());
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use("/api", loginRouter);
app.use("/api/user", userRouter);

app.listen(port, hostname, function () {
  console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port);
});
