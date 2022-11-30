import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const createNewUser = (data) => {};

const hashUserPassword = () => {
    return new Promise((resolve, reject) => {
        const hash = bcrypt.hashSync("B4c0//", salt);
    });
};

export default { createNewUser };
