import express from "express";

const router = express.Router();
import homeController from "../controllers/homeController";
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return;
    });
    return app.use("/", router);
};

export default initWebRoutes;
