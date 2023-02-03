import express from 'express'
import AuthController from '../Controllers/AuthController.js'
import MahasiswaController from '../Controllers/MahasiswaController.js'

const router = express.Router()

router.get('/', (req, res) => {
    console.log(req.body.umur);
    res.json({ title: "Hello " + req.query.nama });
})

router.post('/', (req, res) => {
    console.log(req.body);
    res.json({ title: "Hello " + req.body.nama });
})


// AUTHENTIFIKASI + Json Web Token
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

// Mahasiswa
router.post('/mahasiswa', MahasiswaController.register);

export default router;