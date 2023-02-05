import mongoose from "mongoose"
import Form from '../models/Form.js'

class OptionController {
    // Add Options
    async store(req, res) {
        try {
            if (!req.params.id) { throw { code: 400, message: 'REQUIRED_FORM_ID' } }
            if (!req.params.questionId) { throw { code: 400, message: 'REQUIRED_QUESTION_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: 'INVALID_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) { throw { code: 400, message: 'INVALID_ID' } }
            if (!req.body.options) { throw { code: 400, message: 'REQUIRED_OPTIONS' } }

            const fieldOption = {
                id: mongoose.Types.ObjectId(),
                value: req.body.options
            }

            const option = await Form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id }, {
                $push: { "questions.$[indexQuestion].options": fieldOption }
            }, {
                arrayFilters: [{ "indexQuestion.id": mongoose.Types.ObjectId(req.params.questionId) }],
                new: true
            })
            if (!option) { throw { code: 400, message: 'ADD_OPTION_FAILED' } }

            return res.status(200).json({
                status: true,
                message: 'ADD_OPTION_SUCCESS',
                option
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
            if (!req.params.id) { throw { code: 400, message: 'REQUIRED_FORM_ID' } }
            if (!req.params.questionId) { throw { code: 400, message: 'REQUIRED_QUESTION_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: 'INVALID_FORMS_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) { throw { code: 400, message: 'INVALID_QUESTIONS_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.optionId)) { throw { code: 400, message: 'INVALID_OPTIONS_ID' } }
            if (!req.body.options) { throw { code: 400, message: 'REQUIRED_OPTIONS' } }

            const option = await Form.findByIdAndUpdate({ _id: req.params.id, userId: req.jwt.id }, {
                $set: { "questions.$[indexQuestion].options.$[indexOption].value": req.body.options }
            }, {
                arrayFilters: [
                    { "indexQuestion.id": mongoose.Types.ObjectId(req.params.questionId) },
                    { "indexOption.id": mongoose.Types.ObjectId(req.params.optionId) }
                ],
                new: true
            })

            if (!option) { throw { code: 400, message: 'ADD_OPTION_FAILED' } }

            return res.status(200).json({
                status: true,
                message: 'UPDATE_OPTION_SUCCESS',
                option
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
            if (!req.params.id) { throw { code: 400, message: 'REQUIRED_FORM_ID' } }
            if (!req.params.questionId) { throw { code: 400, message: 'REQUIRED_QUESTION_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: 'INVALID_FORMS_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) { throw { code: 400, message: 'INVALID_QUESTIONS_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.optionId)) { throw { code: 400, message: 'INVALID_OPTIONS_ID' } }

            const option = await Form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id }, {
                $pull: { "questions.$[indexQuestion].options": { id: mongoose.Types.ObjectId(req.params.optionId) } }
            }, {
                arrayFilters: [
                    { "indexQuestion.id": mongoose.Types.ObjectId(req.params.questionId) }
                ],
                new: true
            })

            if (!option) { throw { code: 400, message: 'ADD_OPTION_FAILED' } }

            return res.status(200).json({
                status: true,
                message: 'DELETED_OPTIONS_SUCCESSFULLY',
                option
            });

        } catch (err) {
            return res.status(err.code || 500).json({
                status: false,
                message: err.message
            });
        }
    }
}

export default new OptionController()