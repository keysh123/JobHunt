import express from 'express'
import autheticateToken from "../middleware/isAutheticated.js";
import { getAllCompanies, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import { singleUpload } from '../middleware/multer.js';
const router = express.Router()
router.post('/register',autheticateToken,singleUpload,registerCompany)
router.get('/getCompany',autheticateToken,getAllCompanies)
router.get('/getCompanyById/:id',autheticateToken,getCompanyById)
router.put('/update/:id',autheticateToken,singleUpload,updateCompany)

export default router;