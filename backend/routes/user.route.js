import express from 'express'
import { login, logout, register, updateProfile } from '../controllers/user.controller.js'
import autheticateToken from "../middleware/isAutheticated.js";
const router = express.Router()
router.post('/register',register)
router.post('/login',login)
router.post('/profile/update',autheticateToken,updateProfile)
router.get('/logout',logout)

export default router;