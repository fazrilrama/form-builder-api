import mongoose from 'mongoose'
import Mahasiswa from '../models/Mahasiswa.js'

class MahasiswaController {
    async register(req, res) {
        try {
            // Validation Request
            if (!req.body.nama) { throw { code: 428, message: 'NAMA_IS_REQUIRED' } }
            if (!req.body.email) { throw { code: 428, message: 'EMAIL_IS_REQUIRED' } }
            if (!req.body.phone) { throw { code: 428, message: 'PHONE_IS_REQUIRED' } }
            if (!req.body.kelas) { throw { code: 428, message: 'KELAS_IS_REQUIRED' } }

            const isEmailExist = await Mahasiswa.findOne({ email: req.body.email })
            if (isEmailExist) { throw { code: 400, message: 'EMAIL_ALREADY_EXIST' } }

            const mhs = await Mahasiswa.create(req.body)
            if (!mhs) { throw { code: 500, message: 'MAHASISWA_REGISTER_FAILED' } }

            // Response
            return res.status(200).json(mhs);
        } catch (err) {
            return res.status(err.code || 500).json({ status: false, message: err.message })
        }
    }

    async store(req, res) {
        try {
            // Validation Request
            if (!req.body.nama) { throw { code: 428, message: 'NAMA_IS_REQUIRED' } }
            if (!req.body.email) { throw { code: 428, message: 'EMAIL_IS_REQUIRED' } }
            if (!req.body.phone) { throw { code: 428, message: 'PHONE_IS_REQUIRED' } }
            if (!req.body.kelas) { throw { code: 428, message: 'KELAS_IS_REQUIRED' } }

            const emailExist = await Mahasiswa.findOne({ email: req.body.email });
            if (emailExist) { throw { code: 409, message: "EMAIL_ALREADY_EXIST" } }

            const phoneExist = await Mahasiswa.findOne({
                phone: req.body.phone
            });
            if (phoneExist) { throw { code: 409, message: "PHONE_ALREADY_EXIST" } }

            const form = await Mahasiswa.create({
                nama: req.body.nama,
                email: req.body.email,
                phone: req.body.phone,
                kelas: req.body.kelas
            });

            if (!form) { throw { code: 500, message: 'FAILED_CREATE_FORM' } }

            return res.status(200).json({
                status: true,
                message: "CREATED_NEW_MAHASISWA",
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
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) { throw { code: 400, message: 'INVALID_MAHASISWA_ID' } }

            const mahasiswa = await Mahasiswa.findOne({ _id: req.params.id })
            if (!mahasiswa) { throw { code: 404, message: "FORM_NOT_FOUND" } }

            return res.status(200).json({
                status: true,
                message: "SUCCESS_GET_MAHASISWA",
                mahasiswa
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

            const mahasiswa = await Mahasiswa.findOneAndUpdate({
                _id: req.params.id
            }, req.body, { new: true });

            if (!mahasiswa) { throw { code: 404, message: "MAHASISWA_UPDATED_FAILED" } }

            return res.status(200).json({
                status: true,
                message: "MAHASISWA_UPDATED_SUCCESS",
                mahasiswa
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

            const mhs = await Mahasiswa.findOneAndDelete({
                _id: req.params.id
            });
            if (!mhs) { throw { code: 404, message: "MAHASISWA_DELETED_NOTFOUND" } }

            return res.status(200).json({
                status: true,
                message: "MAHASISWA_DELETE_SUCCESS",
                mhs
            });
        } catch (err) {
            return res.status(err.code || 500).json({
                status: false,
                message: err.message
            });
        }
    }
}

export default new MahasiswaController()