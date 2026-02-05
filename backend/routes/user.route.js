import express from 'express'
import { login, logout, register, updateProfile } from '../controllers/user.controller.js'
import autheticateToken from "../middleware/isAutheticated.js";
import { singleUpload } from '../middleware/multer.js';
const router = express.Router()
router.post('/register',singleUpload, register)
router.post('/login',login)
router.post('/profile/update',autheticateToken,singleUpload,updateProfile)
router.get('/logout',logout)

export default router;