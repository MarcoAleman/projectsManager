const createHttpError = require('http-errors');
const Project = require('../database/models/Project');
const errorResponse = require('../helpers/errorResponse');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    list: async (req, res) => {
        try {

            const projects = await Project.find().where('createBy').equals(req.user)

            return res.status(200).json({
                ok: true,
                msg: 'Lista de proyectos',
                projects
            })
        } catch (error) {
            return errorResponse(res, error, 'LIST')
        }
    },
    store: async (req, res) => {

        
        try {
            const {name, description, client} = req.body;
    
            if([name, description, client].includes('') || !name || !description || !client) throw createHttpError(400, 'Todos los campos son obligatorios')

            if(!req.user) throw createHttpError(401, 'Error de autentificacion');

            const project = new Project(req.body)

            project.createBy = req.user._id
            //console.log(project);
            const projectStore = await project.save();

            return res.status(201).json({
                ok: true,
                msg: 'Proyecto Guardado',
                project: projectStore
            })
        } catch (error) {
            return errorResponse(res, error, 'STORE')
        }
    },
    detail: async (req, res) => {
        try {
            const {id} = req.params;
            
            if(!ObjectId.isValid(id)) throw createHttpError(400, 'No es un ID valido')

            const project = await Project.findById(id);

            if(!project) throw createHttpError(404, 'Proyecto no encontrado');

            if(req.user._id.toString() !== project.createBy.toString()) throw createHttpError(401, 'NO estas autorizado')

            return res.status(200).json({
                ok: true,
                msg: 'Detalle del Proyecto',
                project
            })
        } catch (error) {
            return errorResponse(res, error, 'DETAIL')
        }
    },
    update: async (req, res) => {
        try {
            const {id} = req.params;
            
            if(!ObjectId.isValid(id)) throw createHttpError(400, 'No es un ID valido')
            
            const project = await Project.findById(id);

            if(!project) throw createHttpError(404, 'Proyecto no encontrado');

            if(req.user._id.toString() !== project.createBy.toString()) throw createHttpError(401, 'NO estas autorizado')

            const {name, description, client, dateExpire} = req.body;
    
            //if([name, description, client].includes('') || !name || !description || !client) throw createHttpError(400, 'Todos los campos son obligatorios')

            project.name = name || project.name;
            project.description = description || project.description;
            project.client = client || project.client;
            project.dateExpire = dateExpire || project.dateExpire;

            const projectUpdated = await project.save();

            return res.status(201).json({
                ok: true,
                msg: 'Proyecto Actualizado',
                project: projectUpdated
            })
        } catch (error) {
            return errorResponse(res, error, 'UPDATE')
        }
    },
    remove: async (req, res) => {
        try {
            const {id} = req.params;
            
            if(!ObjectId.isValid(id)) throw createHttpError(400, 'No es un ID valido')
            
            const project = await Project.findById(id);

            if(!project) throw createHttpError(404, 'Proyecto no encontrado');

            if(req.user._id.toString() !== project.createBy.toString()) throw createHttpError(401, 'NO estas autorizado')

            await project.deleteOne();

            return res.status(200).json({
                ok: true,
                msg: 'Proyecto Eliminado'
            })
        } catch (error) {
            return errorResponse(res, error, 'REMOVE')
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