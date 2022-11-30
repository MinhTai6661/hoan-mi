import express from "express";

const router = express.Router();
import {
    getHomePage,
    getCRUD,
    postCRUD,
    displayCRUD,
    getEditUser,
} from "../controllers/homeController";
const initWebRoutes = (app) => {
    router.get("/", getHomePage);
    router.get("/crud", getCRUD);
    router.get("/get-crud", displayCRUD);
    router.get("/edit-user", getEditUser);
    router.post("/post-crud", postCRUD);

    return app.use("/", router);
};

export default initWebRoutes;
