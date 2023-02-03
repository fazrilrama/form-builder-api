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
}

export default new MahasiswaController()