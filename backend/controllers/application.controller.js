import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
export const createApplication = async (req, res) => {
  try {
    const userId = req.userId;
    // const jobId=req.params.id;
    const { id: jobId } = req.params;
    if (!jobId) {
      return res
        .status(404)
        .json({ message : "Job id invalid", success: false });
    }
    const application = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (application) {
      return res
        .status(400)
        .json({ message: "Application already exists", success: false });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    const newApplication = new Application({
      applicant: userId,
      job: jobId,
    });
    await newApplication.save();
    job.applications.push(newApplication);
    await job.save();
    return res.status(201).json({
      message: "Application created successfully",
      success: true,
      newApplication,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!applications) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }
    return res.status(200).json({ success: true, applications });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ success: true, job });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Status is required", success: false });
    }
    const application = await Application.findById(applicationId);
    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res
      .status(200)
      .json({
        message: "Application status updated successfully",
        success: true,
        application,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};
