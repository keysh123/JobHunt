import express from 'express'
import autheticateToken from "../middleware/isAutheticated.js";
import { deleteJob, getAllJobs, getJobById, getJobsByAdmin, postJob, updateJob } from '../controllers/job.controller.js';
const router = express.Router()
router.post('/post',autheticateToken,postJob)
router.get('/getAllJobs',autheticateToken,getAllJobs)
router.get('/getAdminJobs',autheticateToken,getJobsByAdmin)
router.get('/getJob/:id',autheticateToken,getJobById)
router.put("/update/:id", autheticateToken, updateJob);

router.delete("/delete/:id", autheticateToken, deleteJob);
export default router;