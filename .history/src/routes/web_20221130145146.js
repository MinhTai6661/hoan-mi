import express from "express";

const router = express.Router();
import { getHomePage, getCRUD, postCRUD } from "../controllers/homeController";
const initWebRoutes = (app) => {
    router.get("/", getHomePage);
    router.get("/crud", getCRUD);
    router.post("/post-crud", postCRUD);

    return app.use("/", router);
};

export default initWebRoutes;
