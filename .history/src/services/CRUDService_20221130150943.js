import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const createNewUser = (data) => {
    return new Promise((resolve, reject) => {});
};

const hashUserPassword = () => {};

export default { createNewUser };
