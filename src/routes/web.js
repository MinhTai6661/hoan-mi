import express from "express";

const router = express.Router();
import {
    getHomePage,
    getCRUD,
    postCRUD,
    displayCRUD,
    getEditUser,
    putCRUD,
    deleteUser,
} from "../controllers/homeController";
const initWebRoutes = (app) => {
    router.get("/", getHomePage);
    router.get("/crud", getCRUD);
    router.get("/get-crud", displayCRUD);
    router.post("/post-crud", postCRUD);
    router.get("/edit-user", getEditUser);
    router.post("/put-crud", putCRUD);
    router.get("/delete-user", deleteUser);

    return app.use("/", router);
};

export default initWebRoutes;
