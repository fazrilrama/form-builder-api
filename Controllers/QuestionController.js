import mongoose from "mongoose"
import Form from "../models/Form.js"

const allowedType = ['Text', 'Radio', 'Checkbox', 'Dropdown', 'Email'];

class QuestionController {

    async index(req, res) {
        try {
            if (!req.params.id) { throw { code: 400, message: 'REQUIRED_FORM_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: 'INVALID_ID' } }

            const question = await Form.findOne({ _id: req.params.id, userId: req.jwt.id })
            if (!question) { throw { code: 400, message: 'QUESTION_NOT_FOUND' } }

            return res.status(200).json({
                status: true,
                message: 'QUESTION_SUCCESS_GET',
                question
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
            if (!req.params.id) { throw { code: 400, message: 'REQUIRED_FORM_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: 'INVALID_ID' } }

            const newQuestion = {
                id: mongoose.Types.ObjectId(),
                question: null,
                type: 'Text', // Text, Radio, checkbox, dropdown
                required: false,
                options: []
            }

            const form = await Form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id }, { $push: { questions: newQuestion } }, { new: true })

            console.log(req.jwt.id);

            if (!form) { throw { code: 400, message: 'FORM_UPDATE_FAILED' } }

            return res.status(200).json({
                status: true,
                message: 'ADD_QUESTION_SUCCESS',
                question: newQuestion
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
            if (!req.params.questionId) { throw { code: 400, message: 'REQUIRED_FORM_QUESTIONS_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: 'INVALID_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) { throw { code: 400, message: 'INVALID_ID' } }

            let field = {};
            if (req.body.hasOwnProperty('question')) {
                field['questions.$[indexQuestion].question'] = req.body.question
            } else if (req.body.hasOwnProperty('required')) {
                field['questions.$[indexQuestion].required'] = req.body.required
            } else if (req.body.hasOwnProperty('type')) {
                if (!allowedType.includes(req.body.type)) { throw { code: 400, message: 'INVALID_TYPE' } }

                field['questions.$[indexQuestion].type'] = req.body.type
            }

            const questions = await Form.findOneAndUpdate({ _id: req.params.id, userId: req.jwt.id }, { $set: field }, {
                arrayFilters: [{ 'indexQuestion.id': mongoose.Types.ObjectId(req.params.questionId) }],
                new: true
            });
            if (!questions) { throw { code: 400, message: 'QUESTION_UPDATE_FAILED' } }

            return res.status(200).json({
                status: true,
                message: 'QUESTION_UPDATED_SUCCESS',
                questions
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
            if (!req.params.questionId) { throw { code: 400, message: 'REQUIRED_FORM_QUESTIONS_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: 'INVALID_ID' } }
            if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) { throw { code: 400, message: 'INVALID_ID' } }

            const question = await Form.findOneAndUpdate({
                _id: req.params.id, userId: req.jwt.id
            }, {
                $pull: {
                    questions: { id: mongoose.Types.ObjectId(req.params.questionId) }
                }
            }, { new: true })

            return res.status(200).json({
                status: true,
                message: 'DELETED_QUESTION_SUCCESS',
                question
            });
        } catch (err) {
            return res.status(err.code || 500).json({
                status: false,
                message: err.message
            });
        }
    }
}

export default new QuestionController()