import express from 'express'
import autheticateToken from "../middleware/isAutheticated.js";
import { getAllJobs, getJobById, getJobsByAdmin, postJob } from '../controllers/job.controller.js';
const router = express.Router()
router.post('/post',autheticateToken,postJob)
router.get('/getAllJobs',autheticateToken,getAllJobs)
router.get('/getAdminJob',autheticateToken,getJobsByAdmin)
router.get('/getJob/:id',autheticateToken,getJobById)

export default router;