module.exports = {
    register: async (req, res) => {
        try {

            const { name, email, password } = req.body;

            if([name, email, password].includes('' || null)) {
                let error = new Error('Todos los campos son obligatorios');
                error.status = 400;
                throw error
            }

            return res.status(201).json({
                ok: true,
                msg: 'Usuario Registrado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en REGISTER'
            })
        }
    },
    checked: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Usuario Checkeado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en CHECKED'
            })
        }
    },
    login: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Usuario Logueado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en LOGIN'
            })
        }
    },
    //Este metodo sirve para resetear el password
    sendToken: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Token Enviado'
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