import bcrypt from "bcryptjs";

const createNewUser = (data) => {
    return new Promise((resolve, reject) => {
        const salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync("B4c0//", salt);
    });
};

const hashUserPassword = () => {};

export default { createNewUser };
