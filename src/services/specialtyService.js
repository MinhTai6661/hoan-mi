import db from "../models/index";
import bcrypt from "bcryptjs";

import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const createSpecialty = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { descriptionMarkDown, descriptionHTML, image, name } = body;
            console.log(
                "returnnewPromise  descriptionMarkDown, descriptionHTML",
                descriptionMarkDown,
                descriptionHTML
            );

            if (!descriptionMarkDown || !descriptionHTML || !image || !name) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing params",
                });
                return;
            } else {
                const [user, isCreated] = await db.Specialty.findOrCreate({
                    where: { name: name },
                    defaults: {
                        descriptionMarkDown,
                        descriptionHTML,
                        image,
                        name,
                    },
                    raw: true,
                });
                if (!isCreated) {
                    resolve({
                        errorCode: 2,
                        message: "specialty is already exist",
                    });
                    return;
                }
                resolve({
                    errorCode: 0,
                    message: "create Specialty successfully!",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
const getSpecialty = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { _limit } = params; //de du phong(do quy mo nho nen khong dung den)
            console.log("returnnewPromise   _limit", _limit);

            const res = await db.Specialty.findAll({
                limit: +_limit || null,
                attributes: {
                    // exclude: ["image"],
                },
            });
            if (!res) {
                resolve({
                    errorCode: 1,
                    errorMessage: "something went wrong",
                });
                return;
            }

            resolve({
                errorCode: 0,
                message: "get specialty successfully!",
                data: res,
            });
        } catch (e) {
            reject(e);
        }
    });
};
const getSpecialtyDetail = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { specialtyId } = params; //de du phong(do quy mo nho nen khong dung den)
            if (!specialtyId) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing params",
                });
            }
            const res = await db.Specialty.findOne({
                where: { id: specialtyId },
                raw: true,
            });
            if (!res) {
                resolve({
                    errorCode: 1,
                    errorMessage: "something went wrong",
                });
                return;
            }

            resolve({
                errorCode: 0,
                message: "get specialty successfully!",
                data: res,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const checkIsMissingParam = (params, required) => {
    let missingList = "";
    required.forEach((item) => {
        if (!params[item]) {
            missingList += " " + item + ",";
        }
    });

    return missingList ? missingList : "";
};
const updateSpecialty = (newData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const missingList = checkIsMissingParam(newData, [
                "id",
                "name",
                "descriptionHTML",
                "descriptionMarkDown",
                "image",
            ]);
            const { id, name, descriptionHTML, descriptionMarkDown, image } = newData;
            if (!name || !descriptionHTML || !descriptionMarkDown || !image || !id) {
                resolve({
                    errorCode: 1,
                    errorMessage: `Missing params ${missingList}`,
                });
            }

            const curentSpecialty = await db.Specialty.findOne({
                where: { id: newData.id },
            });

            if (curentSpecialty) {
                const updatedSpecialties = await db.Specialty.update(
                    {
                        name: newData.name,
                        descriptionHTML: newData.descriptionHTML,
                        descriptionMarkDown: newData.descriptionMarkDown,
                        image: newData.image,
                    },
                    {
                        where: {
                            id: newData.id,
                        },
                    }
                );
                resolve({ errorCode: 0, errorMessage: "ok", updated: updatedSpecialties });
            } else {
                resolve({ errorCode: 1, errorMessage: "specialty is not found" });
            }
        } catch (error) {
            reject("error: ", error);
        }
    });
};

const deleteSpecialty = (id) => {
    console.log("deleteSpecialty  id", id);
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errorCode: 1,
                    errorMessage: `Missing params id`,
                });
                return;
            }
            const specialty = await db.Specialty.findOne({ where: { id: id } });
            if (!specialty) {
                resolve({
                    errorCode: 1,
                    errorMessage: "specialty is not found",
                });
            }
            await db.Specialty.destroy({
                where: { id: id },
            });
            resolve({
                errorCode: 0,
                errorMessage: "delete specialty successfully!",
            });
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    getSpecialty,
    createSpecialty,
    getSpecialtyDetail,
    updateSpecialty,
    deleteSpecialty,
};
