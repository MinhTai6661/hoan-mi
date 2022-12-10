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

export default {
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleCreateMarkDown,
    handleCreateDoctorDetail,
};
