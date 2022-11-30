import express from "express";

const router = express.Router();
import { getHomePage } from "../controllers/homeController";
const initWebRoutes = (app) => {
    router.get("/", getHomePage);
    return app.use("/", router);
};

export default initWebRoutes;
