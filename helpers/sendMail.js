const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports = {
    confirmRegister : async (data) => {
        const {name, email, token} = data;

        try {
            await transport.sendMail({
                from : "Projects Manager <marcoaleman18@gmail.com>",
                to : email,
                subject : 'Confirma tu cuenta',
                text : 'Confirmá tu cuenta en Projects Manager',
                html : `
                <p>Hola ${name}, hace click en el siguiente enlace.<p/>
                <a href="${process.env.URL_FRONT}/confirm/${token}">Confirma tu cuenta</a>
                `
            })
        } catch (error) {
            console.log(error);
        }
    },
    forgotPassword : async (data) => {
        const {name, email, token} = data;

        try {
            await transport.sendMail({
                from : "Projects Manager <marcoaleman18@gmail.com>",
                to : email,
                subject : 'Reestablecé tu contraseña',
                text : 'Reestablecé tu contraseña en Projects Manager',
                html : `
                <p>Hola ${name}, hace click en el siguiente enlace para <a href="${process.env.URL_FRONT}/recover-password/${token}">restablecer tu contraseña</a><p/>
                `
            })
        } catch (error) {
            console.log(error);
        }
    }
}