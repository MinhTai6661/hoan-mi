import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";

const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/get-all-user", userController.getAllUsers);
    router.get("/all-code", userController.handleGetAllCode);
    router.get("/top-doctor-home", doctorController.handleGetTopDoctor);
    router.get("/get-all-doctors", doctorController.handleGetAllDoctor);
    router.get("/get-doctor-detail", doctorController.handleGetDoctorDetail);
    router.get("/get-doctor-schedules", doctorController.handleGetDoctorSchedules);

    router.post("/login", userController.handleLogin);
    router.post("/create-new-user", userController.handleCreateNewUser);
    router.post("/create-doctor-detail", doctorController.handleCreateDoctorDetail);
    router.post("/create-doctor-schedule", doctorController.handleCreateDoctorSchedule);
    router.post("/create-apoinment", patientController.handleCreateApoinment);
    router.post("/verify-appoiment", patientController.handleVerifySchedule);

    router.put("/edit-user", userController.handleEditUser);
    router.put("/update-doctor", doctorController.handleEditDoctor);
    router.put("/update-doctor", doctorController.handleEditDoctor);

    router.delete("/delete-user", userController.handleDeleteUser);
    return app.use("/api", router);
};
export default initAPIRoutes;
