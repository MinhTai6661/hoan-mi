import patientService from "../services/patientService";

const handleCreateApoinment = async (req, res) => {
    const body = req.body;
    try {
        const data = await patientService.createApoinment(body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleVerifySchedule = async (req, res) => {
    const body = req.body;
    console.log("handleVerifySchedule  body", body);
    try {
        const data = await patientService.verifySchedule(body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleGetPatientsListByDoctorId = async (req, res) => {
    const params = req.query;

    try {
        const data = await patientService.getPatientsListByDoctorId(params);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};

export default {
    handleCreateApoinment,
    handleVerifySchedule,
    handleGetPatientsListByDoctorId,
};
