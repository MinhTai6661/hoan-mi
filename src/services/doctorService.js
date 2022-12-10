import db from "../models";
const getTopDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.User.findAll({
                limit: limit,
                raw: true,
                where: { roleId: "R2" },
                attributes: {
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.Allcode,
                        as: "positionData",
                        attributes: ["valueChina", "valueVi"],
                    },
                    { model: db.Allcode, as: "genderData", attributes: ["valueChina", "valueVi"] },
                ],
                order: [["createdAt", "DESC"]],
                nested: true,
            });
            if (data) {
                resolve({
                    errorCode: 0,
                    data: data,
                });
            } else {
                resolve({
                    errorCode: 1,
                    data: "cant find doctor",
                });
            }
            console.log("returnnewPromise  data", data);
        } catch (error) {
            reject(error);
        }
    });
};

const getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.User.findAll({
                where: {
                    roleId: "R2",
                },
                raw: true,
                attributes: {
                    exclude: ["password", "image"],
                },
            });
            console.log("returnnewPromise  res", data);
            if (data) {
                resolve({
                    errorCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
const createDoctorDetail = (data) => {
    console.log("createDoctorDetail  data", data);
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.contentMarkDown || !data.contentHTML || !data.description) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing params",
                });
            } else {
                await db.MarkDown.create({
                    contentMarkDown: data.contentMarkDown,
                    description: data.description,
                    contentHTML: data.contentHTML,
                    doctorId: data.doctorId,
                });
                resolve({
                    errorCode: 0,
                    message: "add doctor detail successfuly",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
export default {
    getTopDoctor,
    getAllDoctors,
    createDoctorDetail,
};
