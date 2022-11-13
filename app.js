import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import slotRoute from "./routes/slotRoute.js";

//************* initialize the app ********************
dotenv.config();
sequelize.sync();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;

//*************** */ Routes and middleware ********************
app.use("/slot", slotRoute);
app.post("/tesdata", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
// Not found route
app.use("*", (req, res) => {
  res.send("Hello World");
});

//**************** start the server ********************
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
