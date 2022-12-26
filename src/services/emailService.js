import db from "../models";
import "@babel/preset-env";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const port = process.env.PORT || 3001;
const sendEmail = async (emailReq) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `<${process.env.EMAIL_APP}>`, // sender address
        to: emailReq.email, // list of receivers
        subject: `Xin chào ${emailReq.fullName}`, // Subject line
        text: "Bệnh viện hoàn mỹ xin chào", // plain text body
        html: renderEmailContent(emailReq),
    });
};

const renderEmailContent = (emailReq) => {
    console.log("renderEmailContent  emailReq.doctorId", emailReq.doctorId);
    return `
        <h1>Xin chào ${emailReq.fullName}</h1>
        <h3>Xin chào  ${emailReq.fullName}, bạn vừa đặt lịch khám tại website hoanmibinhduong.com</h3>
        <h4>Vui lòng <a  href='${process.env.URL_REACT}/verify-booking?doctorId=${emailReq.doctorId}&token=${emailReq.verifyToken}'>xác nhận</a> đặt lịch nếu thông tin bên dưới trên là đúng</h4>

        <h2><strong>THÔNG TIN KHÁM BỆNH</strong>:</h2>
        
        <p><strong>Bác sĩ khám</strong>:${emailReq.doctorName}</p>
        <p><strong>Thời gian khám</strong>:${emailReq.timeScheduleString}</p>
        <p><strong>Ngày đặt lịch</strong>:${emailReq.dateBooking}</p>
        <p><strong>Lý do khám</strong>: ${emailReq.reason}</p>
        
        <h2><strong>THÔNG TIN CÁ NHÂN</strong>:</h2>
        <p><strong>Họ tên</strong>:  ${emailReq.fullName}</p>
        <p><strong>email</strong>: ${emailReq.email}</p>
        <p><strong>Số điện thoại</strong>:${emailReq.phoneNumber}</p>
        <p><strong>Địa chỉ</strong>: ${emailReq.address} </p>
        <p><strong>Giới tính</strong>: ${emailReq.gender}</p>
        <p><strong>Ngày sinh</strong>: ${emailReq.birthday}</p>
        
        <input name='doctorId' value='${emailReq.doctorId}'/>
        <input name='token' value='${emailReq.verifyToken}'/>
        
       
        <h3>Chúng tôi xin chân thành cảm ơn!</h3>
    
    `;
};

export default {
    sendEmail,
};
