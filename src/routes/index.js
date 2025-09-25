import express from "express";
import { routerAuth } from "./auth.routes.js";
import { routerArticle } from "./article.routes.js";

export const routesVarias = express.Router();
routesVarias.use(routerAuth);
routesVarias.use(routerArticle);
