import db from "../models";
import moment from "moment/moment";
// import dotenv from "dotenv";

const getCodeFromAllCode = async (type) => {
    const res = await db.Allcode.findOne({
        where: { keymap: type },
    });
    return res;
};

const getHumanDate = (date, type = "HH:mm:ss dddd DD/MM/YYYY") => {
    return moment(date).locale("vi").format("HH:mm:ss dddd DD/MM/YYYY");
};
const getUnix = (date, type = "YYYY-MM-DD") => {
    return new Date(moment(date).format(type)).getTime();
};

const handleRenderVerifyLink = (unixString, doctorId) => {
    return `${process.env.URL_REACT}/verify-schedule?token=${unixString}&doctorId=${doctorId}`;
};

export default {
    getCodeFromAllCode,
    getHumanDate,
    handleRenderVerifyLink,
    getUnix,
};
