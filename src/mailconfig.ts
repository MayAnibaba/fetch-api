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
    service: 'gmail',
    auth: {
        user: 'mmayowa.anibaba@gmail.com',
        pass: 'gpmvaojblscchfzi'
    }
});


export default transporter