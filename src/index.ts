import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import "reflect-metadata";

//Routes
import routes from "./modules/index";

dotenv.config();

import modules from "./modules";

import mongoose from "mongoose";
import { appendFile } from "fs";

const PORT = process.env.PORT;

const uri: string = process.env.MONGO_URL;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
// mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri)
  .then((result) => {
    const app: Application = express();

    app.use(cors());
    app.use(express.json());

    app.use(helmet());

    app.use(routes);

    modules(app);

    app.get("/", (req, res) =>
      res.status(200).json({ data: "I am the Backend API, happy hacking" })
    );

    app.get("**", (req, res) =>
      res.status(404).json({ "Not Found": "Not Found" })
    );
    app.listen(PORT, () => {
      console.log(
        `Application successfully connected in ${process.env.NODE_ENV} mode at ${PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
