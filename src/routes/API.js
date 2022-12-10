import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/get-all-user", userController.getAllUsers);
    router.post("/login", userController.handleLogin);
    router.delete("/delete-user", userController.handleDeleteUser);
    router.post("/create-new-user", userController.handleCreateNewUser);
    router.put("/edit-user", userController.handleEditUser);
    router.get("/all-code", userController.handleGetAllCode);
    router.get("/top-doctor-home", doctorController.handleGetTopDoctor);
    router.get("/get-all-doctors", doctorController.handleGetAllDoctor);
    router.post("/create-doctor-detail", doctorController.handleCreateDoctorDetail);
    return app.use("/api", router);
};
export default initAPIRoutes;
