import express from "express";
import { routerAuth } from "./auth.routes.js";

export const routesVarias = express.Router();
routesVarias.use(routerAuth);
