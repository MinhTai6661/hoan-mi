import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

const getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUsers = await db.User.findAll({
                raw: true,
            });
            resolve(allUsers);
        } catch (e) {
            reject(e);
        }
    });
};

const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPassword,
                gender: data.gender === 0 ? true : false,
                address: data.address,

                phoneNumber: data.phoneNumber,
                roleId: data.role,
            });

            resolve("create new user successfully");
        } catch (e) {
            reject(e);
        }
    });
};

const getEditUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: {
                    id: userId,
                },
                raw: true,
            });
            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject("error: ", error);
        }
    });
};
const putUser = async (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUser = await db.User.findOne({
                where: { id: user.id },
            });

            if (currentUser) {
                await db.User.update(user, {
                    where: {
                        id: user.id,
                    },
                });
                resolve("update success");
            } else {
                resolve("can not find user");
            }
        } catch (error) {
            reject("error: ", error);
        }
    });
};

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId },
            });
            if (user) {
                await user.destroy();
            }
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

export default { createNewUser, getAllUsers, getEditUser, putUser, deleteUser };
