import mongoose from "mongoose"
import Form from "../models/Form.js"

class FormController {

    async index(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10
            const page = parseInt(req.query.page) || 1

            const form = await Form.paginate({ userId: req.jwt.id }, { limit: limit, page: page })
            if (!form) { throw { code: 404, message: 'FORM_NOT_FOUND' } }

            return res.status(200).json({
                status: true,
                message: 'FORM_FUND',
                total: form.length,
                form
            });
        } catch (err) {
            return res.status(err.code || 500).json({
                status: false,
                message: err.message
            });
        }
    }

    async store(req, res) {
        try {
            const form = await Form.create({
                userId: req.jwt.id,
                title: 'Untitled Form',
                description: null,
                invites: null,
                public: true
            });

            if (!form) { throw { code: 500, message: 'FAILED_CREATE_FORM' } }

            return res.status(200).json({
                status: true,
                message: 'CREATE_FORM_SUCCESS',
                form
            });
        } catch (err) {
            return res.status(err.code || 500).json({
                status: false,
                message: err.message
            });
        }
    }

    async show(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: 'INVALID_FORM_ID' } }

            const form = await Form.findOne({ _id: req.params.id, userId: req.jwt.id })
            if (!form) { throw { code: 404, message: "FORM_NOT_FOUND" } }

            return res.status(200).json({
                status: true,
                message: "SUCCESS_GET_FORM",
                form
            });
        } catch (err) {
            return res.status(err.code || 500).json({
                status: false,
                message: err.message
            });
        }
    }

    async update(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: 'INVALID_FORM_ID' } }

            const form = await Form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id }, req.body, { new: true })
            if (!form) { throw { code: 404, message: 'FORM_UPDATE_FAILED' } }

            return res.status(200).json({
                status: true,
                message: 'FORM_UPDATE_SUCCESS',
                form
            });
        } catch (err) {
            return res.status(err.code || 500).json({
                status: false,
                message: err.message
            });
        }
    }

    async destroy(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: "INVALID_FORM_ID" } }

            const form = await Form.findOneAndDelete({ _id: req.params.id, userId: req.jwt.id })
            if (!form) { throw { code: 404, message: "FORM_DELETE_NOTFOUND" } }

            return res.status(200).json({
                status: true,
                message: 'FORM_DELETE_SUCCESS',
                form
            });
        } catch (err) {
            return res.status(err.code || 500).json({
                status: false,
                message: err.message
            });
        }
    }
}

export default new FormController()