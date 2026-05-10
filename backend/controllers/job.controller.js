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
      !title?.trim() ||
      !description?.trim() ||
      !requirements ||
      salary == null ||
      !location?.trim() ||
      !jobType?.trim() ||
      position == null ||
      !company ||
      experience == null
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // ✅ handle both string and array
    let requirementsArray = [];

    if (Array.isArray(requirements)) {
      requirementsArray = requirements;
    } else {
      requirementsArray = requirements
        .split(",")
        .map((item) => item.trim());
    }

    const newJob = new Job({
      title,
      description,
      requirements: requirementsArray,
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

    return res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
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
    const job = await Job.findById(jobId).populate({path:"company"}).populate({path:"applications"});
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
export const updateJob = async (req, res) => {
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

    let requirementsArray = [];

    if (Array.isArray(requirements)) {
      requirementsArray = requirements;
    } else {
      requirementsArray = requirements
        .split(",")
        .map((item) => item.trim());
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        requirements: requirementsArray,
        salary,
        location,
        jobType,
        position,
        company,
        experience,
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      updatedJob,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job deleted successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};