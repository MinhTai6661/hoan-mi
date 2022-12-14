import doctorService from "../services/doctorService";

const handleGetTopDoctor = async (req, res) => {
    const limit = req.query.limit || 10;
    try {
        const data = await doctorService.getTopDoctor(+limit);

        if (data) {
            return res.status(200).json(data);
        }
    } catch (e) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error ",
        });
    }
};

const handleGetAllDoctor = async (req, res) => {
    try {
        const data = await doctorService.getAllDoctors();
        if (data) {
            return res.status(200).json(data);
        }
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleCreateMarkDown = async (req, res) => {
    try {
        const data = await doctorService.getAllDoctors();
        if (data) {
            return res.status(200).json(data);
        }
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleCreateDoctorDetail = async (req, res) => {
    const data = req.body;
    try {
        const message = await doctorService.createDoctorDetail(data);
        return res.status(200).json(message);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleGetDoctorDetail = async (req, res) => {
    const id = req.query.id;
    try {
        const data = await doctorService.getDoctorDetail(id);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleEditDoctor = async (req, res) => {
    const newData = req.body;

    try {
        const data = await doctorService.editDoctor(newData);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleCreateDoctorSchedule = async (req, res) => {
    const body = req.body;

    try {
        const data = await doctorService.createDoctorSchedule(body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleGetDoctorSchedules = async (req, res) => {
    const query = req.query;
    try {
        const data = await doctorService.getDoctorSchedules(query);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleGetDoctorBySpecialty = async (req, res) => {
    const params = req.query;
    console.log("handleGetDoctorBySpecialty  params", params);

    const data = await doctorService.getDoctorBySpecialty(params);
    res.status(200).json(data);
};
const handleConfirmSchedule = async (req, res) => {
    const { bookingId } = req.body; //because xao choa
    console.log("handleConfirmSchedule  req.body", req.body);
    console.log("handleConfirmSchedule  bookingId", bookingId);

    const data = await doctorService.confirmSchedule(bookingId);
    res.status(200).json(data);
};
const handleRemoveOldBooking = async (req, res) => {
    const data = await doctorService.removeOldBooking();
    res.status(200).json(data);
};
export default {
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleCreateMarkDown,
    handleCreateDoctorDetail,
    handleGetDoctorDetail,
    handleEditDoctor,
    handleCreateDoctorSchedule,
    handleGetDoctorSchedules,
    handleGetDoctorBySpecialty,
    handleConfirmSchedule,
    handleRemoveOldBooking,
};
