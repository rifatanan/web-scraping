import nodemailer from 'nodemailer';

export const trasporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

type mailOptionsType = {
    from: string;
    to: string;
};

export const mailOptions: mailOptionsType = {
    from: process.env.EMAIL || '',
    to: 'rifatanan01719@gmail.com',
};
