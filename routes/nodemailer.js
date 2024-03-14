// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
// //   secureConnection: true,
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: process.env.USER_MAIL,
//     pass: process.env.USER_MAIL_PASS,
//   },
//   tls: {
//     secureProtocol: "TLSv1_method",
//   },
// });
// console.log('SMTP Configured');
// const message = {};
// // async..await is not allowed in global scope, must use a wrapper
// async function main(email, otp) {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     // to: "shradeshjain123@gmail.com", // list of receivers
//     to: email, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: ` ${otp}`, // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);

// module.exports = { main };
