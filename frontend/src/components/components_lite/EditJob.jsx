import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import axios from "axios";
import { toast } from "sonner";

import { JOB_API_ENDPOINT } from "@/utils/data";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedJob } = useSelector((store) => store.job);
  const { allCompanies: companies } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    company: "",
  });

  // PREFILL FORM
  useEffect(() => {
    console.log(selectedJob);

    if (selectedJob) {
      setForm({
        title: selectedJob.title ?? "",
        description: selectedJob.description ?? "",
        requirements: selectedJob.requirements?.join(", ") ?? "",
        salary: selectedJob.salary ?? "",
        location: selectedJob.location ?? "",
        jobType: selectedJob.jobType ?? "",
        experience: selectedJob.experience ?? "",
        position: selectedJob.position ?? "",
        company: selectedJob.company?._id ?? "",
      });
    }
  }, [selectedJob]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompanyChange = (value) => {
    setForm({
      ...form,
      company: value,
    });
  };
  useEffect(() => {
    console.log(form);
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        requirements: form.requirements.split(",").map((item) => item.trim()),
      };

      const res = await axios.put(`${JOB_API_ENDPOINT}/update/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Job updated successfully");

        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">
          Edit <span className="text-[#6A38C2]">Job</span>
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          {/* TITLE */}
          <div>
            <Label className="mb-2">Job Title</Label>

            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Frontend Developer"
            />
          </div>

          {/* SALARY */}
          <div>
            <Label className="mb-2">Salary</Label>

            <Input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="50000"
            />
          </div>

          {/* LOCATION */}
          <div>
            <Label className="mb-2">Location</Label>

            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Berlin"
            />
          </div>

          {/* JOB TYPE */}
          <div>
            <Label className="mb-2">Job Type</Label>

            <Input
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              placeholder="Full Time"
            />
          </div>

          {/* EXPERIENCE */}
          <div>
            <Label className="mb-2">Experience</Label>

            <Input
              type="number"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="2"
            />
          </div>

          {/* POSITION */}
          <div>
            <Label className="mb-2">Open Positions</Label>

            <Input
              type="number"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="5"
            />
          </div>

          {/* COMPANY */}
          <div className="col-span-2">
            <Label className="mb-2">Company</Label>

            <Select key={form.company}  value={form.company} onValueChange={handleCompanyChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>

              <SelectContent>
                {companies?.map((company) => (
                  <SelectItem key={company._id} value={company._id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* REQUIREMENTS */}
          <div className="col-span-2">
            <Label className="mb-2">Requirements</Label>

            <Input
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              placeholder="React, Node, MongoDB"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <Label className="mb-2">Description</Label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-[#6A38C2]"
              placeholder="Enter job description"
            />
          </div>

          {/* BUTTON */}
          <div className="col-span-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
            >
              {loading ? "Updating..." : "Update Job"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditJob;
