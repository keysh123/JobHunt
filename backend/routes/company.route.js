import express from 'express'
import autheticateToken from "../middleware/isAutheticated.js";
import { getAllCompanies, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
const router = express.Router()
router.post('/register',autheticateToken,registerCompany)
router.get('/getCompany',autheticateToken,getAllCompanies)
router.get('/getCompanyById/:id',autheticateToken,getCompanyById)
router.put('/update/:id',autheticateToken,updateCompany)

export default router;