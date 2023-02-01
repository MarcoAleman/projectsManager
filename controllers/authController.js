const createError = require('http-errors');
const errorResponse = require('../helpers/errorResponse');
const User = require('../database/models/User');
const generateTokenRandom = require('../helpers/generateTokenRandom');
const generateJWT = require('../helpers/generateJWT');


module.exports = {
    register: async (req, res) => {
        try {
            const {name,email,password} = req.body;

            if([name,email,password].includes("")){
                throw createError(400,"Todos los campos son obligatorios");
            };

            let user = await User.findOne({
                email
            });

            //console.log('user>>>>>>>>>>>>', user);

            if(user) {
                throw createError(400, 'Este email ya se encuentra registrado');
            }

            user = new User(req.body)
            user.token = generateTokenRandom();

            const userStore = await user.save();

            //TODO: enviar el email de confirmacion

            return res.status(201).json({
                ok: true,
                msg: 'Usuario Registrado',
                data : userStore
            })

        } catch (error) {
            return errorResponse(res, error, 'REGISTER')
        }
    },
    checked: async (req, res) => {

        const {token} = req.query; //http://localhost:4000/api/auth/checked?token=sdfsdfsf
        try {
            if(!token) {
                throw createError(403, 'Token inexistente');
            };

            const user = await User.findOne({
                token
            })

            if(!user) {
                throw createError(403, 'Token inválido');
            };

            user.checked = true;
            user.token = '';

            await user.save()

            return res.status(201).json({
                ok: true,
                msg: 'Registro completado exitosamente'
            })

        } catch (error) {
            return errorResponse(res, error, 'CHECKED')
        }
    },
    login: async (req, res) => {

        const {email, password} = req.body;

        
        try {

            if([email,password].includes("")){
                throw createError(400,"Todos los campos son obligatorios");
            };
    
            let user = await User.findOne({
                email
            });

            if(!user) {
                throw createError(403, 'Credenciales invalidas | EMAIL');
            };

            if(!user.checked) {
                throw createError(403, 'Tu cuenta no ha sido confirmada');
            };

            if(!await user.checkedPassword(password)) {
                throw createError(403, 'Credenciales inválidas | PASSWORD')
            }

            return res.status(200).json({
                ok: true,
                msg: 'Usuario Logueado',
                user : {
                    nombre : user.name,
                    email : user.email,
                    token : generateJWT({
                        id : user._id
                    })
                }
            })
        } catch (error) {

            return errorResponse(res, error, 'LOGIN')
        }
    },
    //Este metodo sirve para resetear el password
    sendToken: async (req, res) => {

        const {email} = req.body;

        try {

            let user = await User.findOne({
                email
            });

            if(!user) throw createError(400, 'Email incorrecto')

            user.token = generateTokenRandom();
            await user.save();

            //TODO: enviar email para restablecer la contraseña

            return res.status(200).json({
                ok: true,
                msg: 'Se ha enviado un email con las instrucciones'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en SEND-TOKEN'
            })
        }
    },
    verifyToken: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Token Verificado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en VERIFY-TOKEN'
            })
        }
    },
    changePassword: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Contraseña Actualizada'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en CHANGE-PASSWORD'
            })
        }
    }
}