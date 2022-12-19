import db from "../models";

const createApoinment = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("-----------------------");
            if (!body) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing params",
                });
                return;
            }
            const {
                email,
                doctorId,
                timeType,
                phoneNumber,
                address,
                gender,
                reason,
                date,
                statusId,
            } = body;

            if (
                !email ||
                !doctorId ||
                !timeType ||
                !phoneNumber ||
                !address ||
                !gender ||
                !reason ||
                !date ||
                !statusId
            ) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing params",
                });
                return;
            }
            //when work with find or create should focus:
            //1. table of database
            //2.properties inside 'where' clause
            //find user, if user already exist, show user, else=> create user
            const [user, createdUser] = await db.User.findOrCreate({
                where: { email: email }, //find
                defaults: {
                    //or create
                    email: email,
                    phoneNumber: phoneNumber,
                    roleId: "R3",
                },
            });

            if (user) {
                //users only book  1 doctor per 1 day
                //(learn more about: if doctor is not exist => error )
                const [booking, createdBooking] = await db.Booking.findOrCreate({
                    //same switch case
                    where: { patientId: user.id, date: +date, doctorId: doctorId }, //find user with conditions: patientId and date, if can't find, it will run codes below
                    defaults: {
                        doctorId: doctorId,
                        patientId: user.id,
                        timeType: timeType,
                        date: +date,
                        statusId: statusId,
                    },
                });
                console.log("returnnewPromise  res", booking);
                if (!createdBooking) {
                    resolve({
                        errorCode: 2,
                        errorMessage: "user already booking",
                    });
                }
            }
            resolve({
                errorCode: 0,
                // data: user,
                message: "create schedule successfully!",
            });
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    createApoinment,
};
