import userService from "../services/userService";

const getAllUsers = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        res.status(200).json({
            erorrCode: 1,
            errorMessage: "missing params",
            users: [],
        });
    }
    const users = await userService.getAllUsers(id);
    res.status(200).json({
        erorrCode: 0,
        errorMessage: "ok",
        users,
    });
};

const handleLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            erorrCode: 1,
            message: "Missing params",
        });
    }
    const user = await userService.handleLogin(email, password);
    res.status(200).json({
        // userCode: user.errorCode,
        // message: user.errorMessage,
        ...user,
    });
};

const handleDeleteUser = async (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(200).json({
            erorrCode: 1,
            message: "Missing params",
        });
    }

    const message = await userService.deleteUser(id);

    return res.status(200).json({
        message,
    });
};
const handleEditUser = async (req, res) => {
    const data = req.body;
    const message = await userService.editUser(data);
    return res.status(200).json({ message });
};
const handleCreateNewUser = async (req, res) => {
    const body = req.body;
    const message = await userService.createNewUser(body);
    return res.status(200).json(message);
};
const handleGetAllCode = async (req, res) => {
    try {
        const type = req.query.type;

        const data = await userService.getAllCode(type);
        // console.log("handleGetAllCode  data", data);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            erorrCode: -1,
            message: "Error ",
        });
    }
};

export default {
    getAllUsers,
    handleLogin,
    handleDeleteUser,
    handleCreateNewUser,
    handleEditUser,
    handleGetAllCode,
};
