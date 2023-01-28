module.exports = {
    list: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Lista de proyectos'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en LIST'
            })
        }
    },
    store: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Proyecto Guardado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en STORE'
            })
        }
    },
    detail: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Detalle del Proyecto'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en DETAIL'
            })
        }
    },
    update: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Proyecto Actualizado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en PROJECT-UPDATE'
            })
        }
    },
    remove: async (req, res) => {
        try {
            return res.status(200).json({
                ok: true,
                msg: 'Proyecto Eliminado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en PROJECT-REMOVE'
            })
        }
    },
    addCollaborator: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Colaborador agregado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en ADD-COLLABORATOR'
            })
        }
    },
    removeCollaborator: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Colaborador Eliminado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en REMOVE-COLLABORATOR'
            })
        }
    },
    addCollaborator: async (req, res) => {
        try {
            return res.status(201).json({
                ok: true,
                msg: 'Colaborador agregado'
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || 'Upss, hubo un error en ADD-COLLABORATOR'
            })
        }
    }
}