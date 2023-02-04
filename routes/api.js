import express from 'express'
import AuthController from '../Controllers/AuthController.js'
import MahasiswaController from '../Controllers/MahasiswaController.js'
import jwtAuth from '../middleware/jwtAuth.js'
import FormController from '../Controllers/FormController.js'

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
router.post('/refresh-token', jwtAuth(), AuthController.refreshToken);

// Mahasiswa
router.post('/mahasiswa', MahasiswaController.register);
router.post('/mahasiswa/store', jwtAuth(), MahasiswaController.store);
router.get('/mahasiswa/show/:id', jwtAuth(), MahasiswaController.show);
router.put('/mahasiswa/update/:id', jwtAuth(), MahasiswaController.update);
router.delete('/mahasiswa/destroy/:id', jwtAuth(), MahasiswaController.destroy);

// Form
router.post('/form/store', jwtAuth(), FormController.store);
router.get('/form/:id', jwtAuth(), FormController.show);
router.put('/form/update/:id', jwtAuth(), FormController.update);
router.delete('/form/destroy/:id', jwtAuth(), FormController.destroy);
router.get('/form', jwtAuth(), FormController.index);

export default router;