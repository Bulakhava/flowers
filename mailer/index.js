const config = require('../config/database');

const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service:'gmail',
        port: 25,
        secure: false, 
        auth: {
            user: config.mail, 
            pass: config.mailPassword
        },
        tls:{
        	rejectUnauthorized:false
        }
    });

module.exports = transporter;