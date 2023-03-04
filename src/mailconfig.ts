import * as nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//     host: '213.199.131.128',
//     port: 25,
//     secure: true,
//     auth: {
//         user: 'sofriloans@sofrisofri.com',
//         pass: '$L0ans@247#'
//     }
// });

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'myoobla@gmail.com',
        pass: 'dancingbears123#'
    }
});


export default transporter