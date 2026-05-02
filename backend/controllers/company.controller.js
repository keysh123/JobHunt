import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API, // rename to API_KEY is better
  api_secret: process.env.API_SECRET, // make sure name matches
});
export const registerCompany = async (req, res) => {
  try {
    const { companyName , description , website,location } = req.body;
       const file = req?.file;
      //  console.log("hoo");
       
    let fileUri, cloudinaryResponse;
    if (file) {
      fileUri =  getDataUri(file);
      cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
    }
    // console.log("hii");
    
    if (!companyName) {
      return res.status(400).json({ message: "Company name is required" });
    }
    const company = await Company.findOne({ name: companyName });
    // console.log(company);
    
    if (company) {
      return res
        .status(400)
        .json({ message: "Company name is already registered" });
    }
    const newCompany = new Company({
      name: companyName,
      description,website,location,logo : cloudinaryResponse?.secure_url || null,
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
    console.log("HII");
    
    const userId = req.userId;
    const companies = await Company.find({ userId: userId });
    if (!companies) {
      console.log("hii");
      
      res.status(404).json({ message: "No companies found" });
    }
    console.log("companies",companies);
    
    return res.status(200).json({success : true ,  companies });
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
    const companyId = req.params.id;
    const { name, description, website, location } = req.body;
    const file = req?.file;

    let cloudinaryResponse;

    // ✅ Upload new logo if provided
    if (file) {
      const fileUri = getDataUri(file);
      cloudinaryResponse = await cloudinary.uploader.upload(
        fileUri.content
      );
    }

    // ✅ Check if company exists
    const existingCompany = await Company.findById(companyId);
    if (!existingCompany) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // ✅ Optional: prevent duplicate name (if changed)
    if (name && name !== existingCompany.name) {
      const duplicate = await Company.findOne({ name });
      if (duplicate) {
        return res.status(400).json({
          message: "Company name already exists",
          success: false,
        });
      }
    }

    // ✅ Update only provided fields
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      {
        name: name || existingCompany.name,
        description: description || existingCompany.description,
        website: website || existingCompany.website,
        location: location || existingCompany.location,
        logo: cloudinaryResponse?.secure_url || existingCompany.logo,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company: updatedCompany,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
