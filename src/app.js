import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import connection from "./database.js";
import * as userController from "./controllers/userController.js";
import * as financeController from "./controllers/financeController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.post("/financial-events", financeController.postFinances);

app.get("/financial-events", financeController.getFinances);

app.get("/financial-events/sum", financeController.sumFinances);

export default app;
