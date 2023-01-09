import specialtyService from "../services/specialtyService";

const handleCreateSpecialty = async (req, res) => {
    try {
        const body = req.body;
        const data = await specialtyService.createSpecialty(body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};

const handleGetSpecialty = async (req, res) => {
    try {
        const params = req.query;
        const data = await specialtyService.getSpecialty(params);
        res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleGetSpecialtyDetail = async (req, res) => {
    try {
        const params = req.query;
        const data = await specialtyService.getSpecialtyDetail(params);
        res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleUpdateSpecialty = async (req, res) => {
    try {
        const newData = req.body;
        const data = await specialtyService.updateSpecialty(newData);
        res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};
const handleDeleteSpecialty = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("handleDeleteSpecialty  id", id);
        const data = await specialtyService.deleteSpecialty(id);
        res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};

export default {
    handleGetSpecialty,
    handleCreateSpecialty,
    handleGetSpecialtyDetail,
    handleUpdateSpecialty,
    handleDeleteSpecialty,
};
