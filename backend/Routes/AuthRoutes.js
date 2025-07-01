import express from 'express'
import { checkAuth, login, logout, register } from '../Controllers/AuthController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/checkAuth", verifyToken, checkAuth)

router.get("/logout", logout)

router.post('/register', register)

router.post('/login', login)

export default router;