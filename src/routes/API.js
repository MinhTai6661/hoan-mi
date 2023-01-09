import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/get-all-user", userController.getAllUsers);
    router.get("/all-code", userController.handleGetAllCode);
    router.get("/top-doctor-home", doctorController.handleGetTopDoctor);
    router.get("/get-all-doctors", doctorController.handleGetAllDoctor);
    router.get("/get-doctor-detail", doctorController.handleGetDoctorDetail);
    router.get("/get-doctor-schedules", doctorController.handleGetDoctorSchedules);
    router.get("/get-doctors-by-specialty", doctorController.handleGetDoctorBySpecialty);
    router.get("/get-specialties", specialtyController.handleGetSpecialty);
    router.get("/get-specialty-detail", specialtyController.handleGetSpecialtyDetail);
    router.get("/get-patient-by-doctor", patientController.handleGetPatientsListByDoctorId);

    router.post("/login", userController.handleLogin);
    router.post("/create-new-user", userController.handleCreateNewUser);
    router.post("/create-doctor-detail", doctorController.handleCreateDoctorDetail);
    router.post("/create-doctor-schedule", doctorController.handleCreateDoctorSchedule);
    router.post("/create-apoinment", patientController.handleCreateApoinment);
    router.post("/verify-appoiment", patientController.handleVerifySchedule);
    router.post("/create-specialty", specialtyController.handleCreateSpecialty);
    router.post("/confirm-schedule", doctorController.handleConfirmSchedule);

    router.put("/edit-user", userController.handleEditUser);
    router.put("/update-doctor", doctorController.handleEditDoctor);
    router.put("/update-doctor", doctorController.handleEditDoctor);
    router.put("/remove-old-booking", doctorController.handleRemoveOldBooking);
    router.put("/update-speialty", specialtyController.handleUpdateSpecialty);

    router.delete("/delete-user", userController.handleDeleteUser);
    router.delete("/delete-specialty/:id", specialtyController.handleDeleteSpecialty);

    return app.use("/api", router);
};
export default initAPIRoutes;
