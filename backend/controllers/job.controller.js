import { Job } from "../models/job.model.js";
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      company,
      experience,
    } = req.body;
    const userId = req.userId;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !company ||
      !experience
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const newJob = new Job({
      title,
      description,
      requirements: requirements.split(","),
      salary,
      location,
      jobType,
      position,
      experience,
      company,
      createdBy: userId,
    });
    await newJob.save();
    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      newJob,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const keywords = req?.query?.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
        // { location: { $regex: keywords, $options: "i" } },
        // { jobType: { $regex: keywords, $options: "i" } },
        // { company: { $regex: keywords, $options: "i" } },
        // { position: { $regex: keywords, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({path:"company"}).sort({createdAt : -1});
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", status: false });
    }
    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};
export const getJobsByAdmin = async (req, res) => {
  try {
    const adminId = req.userId;
    
    const jobs = await Job.find({ createdBy: adminId });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};
