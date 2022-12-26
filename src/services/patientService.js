import { add } from "lodash";
import db from "../models";
import emailService from "./emailService";
import commonsService from "./commons";
import { v4 as uuidv4 } from "uuid";
import commons from "./commons";

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
                doctorId,
                timeType,
                reason,
                date,
                firstName,
                lastName,
                email,
                phoneNumber,
                address,
                gender,
                statusId,
                birthday,
            } = body;

            if (
                !firstName ||
                !lastName ||
                !email ||
                !doctorId ||
                !timeType ||
                !phoneNumber ||
                !address ||
                !gender ||
                !reason ||
                !date ||
                !statusId ||
                !birthday
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
            const token = uuidv4();
            const verifyLink = commonsService.handleRenderVerifyLink(token, doctorId);
            const [user, createdUser] = await db.User.findOrCreate({
                where: { email: email }, //find
                defaults: {
                    //or create
                    email: email,
                    phoneNumber: phoneNumber,
                    roleId: "R3",
                    address: address,
                    gender: gender,
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
                        timeType: timeType,
                        date: +date,
                        birthday: +birthday,
                        statusId: statusId,
                        token: token,
                    },
                });
                if (!createdBooking) {
                    resolve({
                        errorCode: 2,
                        errorMessage: "user already booking",
                    });
                }
            }

            //e config email
            const getGender = await commonsService.getCodeFromAllCode(gender);
            const dateBooking = commonsService.getHumanDate(new Date());
            const emailData = {
                doctorName: body.doctorName,
                timeScheduleString: body.timeScheduleString,
                dateBooking: dateBooking,
                reason: body.reason,
                fullName: `${firstName} ${lastName}`,
                email: email,
                phoneNumber: phoneNumber,
                address: address,
                gender: getGender.valueVi,
                birthday: commonsService.getHumanDate(birthday, "DD/MM/YYYY"),

                verifyToken: token,
                doctorId: doctorId,
            };
            const res = await emailService.sendEmail(emailData);
            console.log("returnnewPromise  res", res);
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
const verifySchedule = (body) => {
    console.log("verifySchedule  body", body);
    return new Promise(async (resolve, reject) => {
        try {
            const { doctorId, token } = body;
            if (!doctorId || !token) {
                resolve({
                    errorCode: 1,
                    errorMessage: "Missing params",
                });
                return;
            }
            //find that booking
            const booking = await db.Booking.findOne({
                where: {
                    doctorId: doctorId,
                    token: token,
                },
                raw: true,
            });
            console.log("returnnewPromise  booking", booking);

            //check whether this booking is already exist
            if (!booking) {
                resolve({
                    errorCode: 2,
                    errorMessage: "this booking is not exsist", //lat coi lai
                });
                return;
            }
            if (booking.statusId !== "S1") {
                resolve({
                    errorCode: 3,
                    errorMessage: "this booking was confirmed", //lat coi lai
                });
                return;
            }
            console.log("returnnewPromise  booking", booking);
            //otherwise,modify statusId to s2
            const updateRes = await db.Booking.update(
                {
                    statusId: "S2",
                },
                {
                    where: { id: booking.id },
                }
            );
            resolve({
                errorCode: 0,
                errorMessage: "booking successfully",
            });
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    createApoinment,
    verifySchedule,
};
