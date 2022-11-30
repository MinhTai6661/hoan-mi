import express from "express";

const router = express.Router();
import {
    getHomePage,
    getCRUD,
    postCRUD,
    displayCRUD,
    editUser,
} from "../controllers/homeController";
const initWebRoutes = (app) => {
    router.get("/", getHomePage);
    router.get("/crud", getCRUD);
    router.get("/get-crud", displayCRUD);
    router.get("/edit-user/?id", editUser);
    router.post("/post-crud", postCRUD);

    return app.use("/", router);
};

export default initWebRoutes;
