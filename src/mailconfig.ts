import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: '213.199.131.128',
    port: 25,
    auth: {
        user: 'sofriloans@sofrisofri.com',
        pass: '$L0ans@247#'
    }
});

export default transporter