import { Company } from "../models/company.model.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName , description , website,location,logo } = req.body;
    if (!companyName) {
      return res.status(400).json({ message: "Company name is required" });
    }
    const company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ message: "Company name is already registered" });
    }
    const newCompany = new Company({
      name: companyName,
      description,website,location,logo,
      userId: req.userId,
    });
    await newCompany.save();
    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      newCompany,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error adding company", success: false });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.userId;
    const companies = await Company.find({ userId: userId });
    if (!companies) {
      res.status(404).json({ message: "No companies found" });
    }
    return res.status(200).json({ companies });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "No company found" });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location, logo } = req.body;

    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ message: "No company found" });
    }
    return res.status(200).json({ message: "Company updated", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
};
