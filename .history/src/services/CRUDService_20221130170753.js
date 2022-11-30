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

const editUser = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update(
                { lastName: "Doe" },
                {
                    where: {
                        id: userId,
                    },
                }
            );
            resolve("edit success");
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

export default { createNewUser, getAllUsers, editUser };
