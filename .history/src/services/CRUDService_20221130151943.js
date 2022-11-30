import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

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
                image: DataTypes.STRING,
                phoneNumber: data.phoneNumber,
                roleId: data.role,
                positionId: data.position,
            });
        } catch (e) {
            reject(e);
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

export default { createNewUser };