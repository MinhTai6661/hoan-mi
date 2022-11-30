import express from "express";

const router = express.Router();
import { getHomePage, getCRUD } from "../controllers/homeController";
const initWebRoutes = (app) => {
    router.get("/", getHomePage);
    router.get("/crud", getCRUD);

    return app.use("/", router);
};

export default initWebRoutes;
