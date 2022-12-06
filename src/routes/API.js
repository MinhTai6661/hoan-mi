import express from "express";
import useController from "../controllers/userController";

const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/get-all-user", useController.getAllUsers);
    router.post("/login", useController.handleLogin);
    router.delete("/delete-user", useController.handleDeleteUser);
    router.post("/create-new-user", useController.handleCreateNewUser);
    router.put("/edit-user", useController.handleEditUser);
    router.get("/all-code", useController.handleGetAllCode);
    return app.use("/api", router);
};
export default initAPIRoutes;
