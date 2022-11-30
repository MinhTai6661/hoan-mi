import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const createNewUser = async (data) => {
    return new Promise((resolve, reject)=>{
        try{
            const hashPassword = await hashUserPassword(data.password);
            console.log(hashPassword);

        }catch(e){
            reject(e)
        }
    })
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
