import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const createNewUser = (data) => {};

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
