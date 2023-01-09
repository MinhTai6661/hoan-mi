import db from "../models/index";
import bcrypt from "bcryptjs";
import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userData = {};
            const isExist = await checkUserEmail(email);
            if (isExist) {
                userData.errorCode = 0;
                const user = await db.User.findOne({
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    //phut 38:40 #35
                    const checkPassword = await bcrypt.compareSync(password, user["password"]);
                    delete user.password;
                    if (checkPassword) {
                        userData.errorCode = 0;
                        userData.errorMessage = "ok";
                        userData.user = user;
                    } else {
                        userData.errorCode = 3;
                        userData.errorMessage = "wrong password";
                    }
                } else {
                    userData.errorCode = 2;
                    userData.errorMessage = "not found email";
                }

                // resolve(userData);
            } else {
                userData.errorCode = 1;
                userData.errorMessage = "not found email";
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};

const checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    email: email,
                },
            });
            resolve(user ? true : false);
        } catch (error) {
            reject(error);
        }
    });
};

const getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === "all") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }
            if (userId && userId !== "all") {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ["password"],
                    },
                });
            }

            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
};

const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const isExist = await checkUserEmail(data.email);
            if (isExist) {
                resolve({
                    errorCode: 1,
                    errorMessage: "email already exist!",
                });
            } else {
                const hashPassword = await hashUserPassword(data.password);
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashPassword,
                    gender: data.gender,
                    image: data.image,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    roleId: data.roleId,
                    positionId: data.positionId,
                });

                resolve({
                    errorCode: 0,
                    errorMessage: "ok",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const editUser = (newData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = await db.User.findOne({
                where: { id: newData.id },
            });

            if (currentUser) {
                delete newData.email;
                // delete newData.id;
                await db.User.update(newData, {
                    where: {
                        id: newData.id,
                    },
                    attributes: {
                        exclude: ["email"],
                    },
                });
                resolve({ errorCode: 0, errorMessage: "ok" });
            } else {
                resolve({ errorCode: 1, errorMessage: "user is not found" });
            }
        } catch (error) {
            reject("error: ", error);
        }
    });
};
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { id: id } });
            if (!user) {
                resolve({
                    errorCode: 1,
                    errorMessage: "user is not found",
                });
            }

            await db.User.destroy({
                where: { id: id },
            });
            resolve({
                errorCode: 0,
                errorMessage: "ok",
            });
        } catch (e) {
            reject(e);
        }
    });
};
// const editUser = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//         } catch (e) {
//             reject(e);
//         }
//     });
// };
const getAllCode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!type) {
                resolve({
                    errorCode: 0,
                    errorMessage: "Missing params",
                });
            } else {
                const res = {};
                const allCode = await db.Allcode.findAll({
                    where: { type: type },
                    raw: true,
                });
                res.errorCode = 0;
                res.data = allCode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    handleLogin,
    getAllUsers,
    createNewUser,
    editUser,
    deleteUser,
    getAllCode,
};
