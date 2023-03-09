import express from 'express'
import AuthController from '../Controllers/AuthController.js'
import MahasiswaController from '../Controllers/MahasiswaController.js'
import jwtAuth from '../middleware/jwtAuth.js'
import FormController from '../Controllers/FormController.js'
import QuestionController from '../Controllers/QuestionController.js'
import OptionController from '../Controllers/OptionController.js'

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
router.get('/form/:id/users', jwtAuth(), FormController.showToUser);

// Question
router.post('/form/:id/questions', jwtAuth(), QuestionController.store);
router.put('/form/:id/questions/:questionId', jwtAuth(), QuestionController.update);
router.delete('/form/:id/questions/:questionId', jwtAuth(), QuestionController.destroy);
router.get('/form/:id/questions', jwtAuth(), QuestionController.index);

// Options
router.post('/form/:id/questions/:questionId/option', jwtAuth(), OptionController.store);
router.put('/form/:id/questions/:questionId/option/:optionId', jwtAuth(), OptionController.update);
router.delete('/form/:id/questions/:questionId/option/:optionId', jwtAuth(), OptionController.destroy);

export default router;