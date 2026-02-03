import express from 'express'
import autheticateToken from "../middleware/isAutheticated.js";
import { createApplication, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';

const router = express.Router()
router.post('/apply/:id',autheticateToken,createApplication)
router.get('/getAppliedJobs',autheticateToken,getAppliedJobs)
router.get('/:id/getApplicants',autheticateToken,getApplicants)
router.put('/status/:id/update',autheticateToken,updateStatus)

export default router; 