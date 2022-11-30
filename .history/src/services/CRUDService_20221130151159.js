import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const createNewUser = (data) => {};

const hashUserPassword = () => {
    return new Promise(async (resolve, reject) => {
        try {
        } catch (e) {
            reject(e);
        }
        const hash = await bcrypt.hashSync("B4c0//", salt);
    });
};

export default { createNewUser };
