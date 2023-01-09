import db from "../models";
import dotenv from "dotenv";
import _ from "lodash";
import { Op } from "sequelize";
import moment from "moment/moment";
import { getUnix } from "./commons";

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
                    exclude: ["password"],
                },
                include: [
                    {
                        model: db.MarkDown,

                        attributes: ["description"],
                    },
                    { model: db.Allcode, as: "genderData", attributes: ["valueChina", "valueVi"] },
                ],
                nest: true,
            });
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
                    specialtyId: data.specialty,
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
const getDoctorDetail = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errorCode: 1,
                    errorMessage: "missing params",
                });
            } else {
                const data = await db.User.findOne({
                    where: { id: id },
                    raw: true,
                    nest: true,
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: db.MarkDown,
                            // attributes: ["contentHTML", "description"],
                        },
                        {
                            model: db.Allcode,
                            as: "positionData",
                            attributes: ["valueChina", "valueVi"],
                        },
                        {
                            model: db.Allcode,
                            as: "genderData",
                            attributes: ["valueChina", "valueVi"],
                        },
                    ],
                });
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
const editDoctor = (newData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!newData) {
                resolve({
                    errorCode: 1,
                    errorMessage: "missing params",
                });
            } else {
                const currentDoctor = await db.User.findOne({
                    where: { id: newData.doctorId },
                });
                if (currentDoctor) {
                    const res = await db.MarkDown.update(
                        {
                            contentHTML: newData.contentHTML,
                            contentMarkDown: newData.contentMarkDown,
                            description: newData.description,
                            specialtyId: newData.specialty,
                        },
                        {
                            where: { doctorId: newData.doctorId },
                        }
                    );
                    if (res) {
                        resolve({
                            errorCode: 0,
                            message: "update successfuly",
                        });
                    }
                } else {
                    resolve({
                        errorCode: 2,
                        errorMessage: "user is not found",
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const createDoctorSchedule = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!body.schedules) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing params",
                });
            }
            const { schedules } = body;
            schedules.forEach((item) => {
                item.maxNumber = +process.env.MAX_NUMBER_SCHEDULE;
            });

            //get existent schedule
            const existentSchedules = await db.Schedule.findAll({
                where: { doctorId: schedules[0].doctorId, date: schedules[0].date },
                attributes: ["date", "doctorId", "timeType", "maxNumber"],
                raw: true,
            });
            /*
            // //convert date
            // existentSchedules.forEach((item) => {
            //     item.date = new Date(item.date).getTime();
            // });

            // //get difference schedules
            // const differentSchedules = _.differenceWith(schedules, existentSchedules, (a, b) => {
            //     return a.timeType === b.timeType;
            // });

            // if (differentSchedules && differentSchedules.length > 0) {
            //     const data = await db.Schedule.bulkCreate(differentSchedules);
            //     resolve({
            //         errorCode: 0,
            //         data: data,
            //     });
            // } else {
            //     resolve({
            //         errorCode: 1,
            //         errorMessage: "no row is created",
            //     });
            // }
*/
            //way2 :delete all record that sastify doctorId = schedules.doctorId  && date === schedules.date, then add all new record

            await db.Schedule.destroy({
                where: { doctorId: schedules[0].doctorId, date: schedules[0].date },
            });
            const data = await db.Schedule.bulkCreate(schedules);
            resolve({
                errorCode: 0,
                data: data,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDoctorSchedules = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!query.doctorId || !query.date) {
                resolve({
                    errorCode: 1,
                    errorMessage: "missing params",
                });
                return;
            }

            //1671235200000
            const { doctorId, date } = query;
            const data = await db.Schedule.findAll({
                where: { doctorId: doctorId, date: +date },
                raw: true,
            });

            const filteredData = data.filter(
                (item) => item.currentNumber < +process.env.MAX_NUMBER_SCHEDULE // +process.env.MAX_NUMBER_SCHEDULE
            );
            resolve({
                errorCode: 0,
                data: filteredData,
            });
        } catch (e) {
            reject(e);
        }
    });
};
const getDoctorBySpecialty = (params) => {
    return new Promise(async (resolve, reject) => {
        const { specialtyId } = params;
        console.log("returnnewPromise  specialtyId", specialtyId);
        try {
            if (!specialtyId) {
                resolve({
                    errorCode: 1,
                    errorMessage: "missing params",
                });
                return;
            }
            //get all doctorId that have specialtyId =5 and
            const doctorsList = await db.MarkDown.findAll({
                where: { specialtyId: +specialtyId },
                // attributes: ["User"],
                include: [
                    {
                        model: db.User,
                        attributes: {
                            exclude: ["password"],
                        },
                    },
                ],
                nested: true,
            });

            resolve({
                errorCode: 0,
                data: doctorsList,
            });
        } catch (e) {
            reject(e);
        }
    });
};
const removeOldBooking = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let now = new Date();

            const yesterday = new Date(moment(now).format("YYYY-MM-DD")).getTime();

            const res = await db.Booking.update(
                { statusId: "S4" },
                {
                    where: {
                        date: { [Op.lt]: yesterday },
                        statusId: ["S1", "S2"],
                    },
                }
            );

            // const res = await db.Booking.findAll();
            // console.log("returnnewPromise  res", res);

            if (!res) {
                resolve({
                    errorCode: 1,
                    message: "error",
                });
            }
            resolve({
                errorCode: 0,
                message: `update successfully, ${res[0]} are updated`,
                updatedRecord: res[0],
            });
        } catch (e) {
            reject(e);
        }
    });
};
const confirmSchedule = (bookingId) => {
    console.log("confirmSchedule  bookingId", bookingId);
    return new Promise(async (resolve, reject) => {
        console.log("returnnewPromise  specialtyId", bookingId);
        try {
            if (!bookingId) {
                resolve({
                    errorCode: 1,
                    errorMessage: "missing params",
                });
                return;
            }
            const booking = await db.Booking.findOne({ where: { id: bookingId } });

            if (!booking) {
                resolve({
                    errorCode: 2,
                    errorMessage: "the schedule is not exsist ",
                });
                return;
            }
            if (booking?.statusId !== "S2") {
                resolve({
                    errorCode: 2,
                    errorMessage: "the schedule has not been verified yet",
                });
                return;
            }
            const res = await db.Booking.update({ statusId: "S3" }, { where: { id: bookingId } });

            resolve({
                errorCode: 0,
                message: "confirm successfully !",
            });
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    getTopDoctor,
    getAllDoctors,
    createDoctorDetail,
    getDoctorDetail,
    editDoctor,
    createDoctorSchedule,
    getDoctorSchedules,
    getDoctorBySpecialty,
    confirmSchedule,
    removeOldBooking,
};
