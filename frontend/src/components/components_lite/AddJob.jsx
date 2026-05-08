import React, { useState } from "react";
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


import { JOB_API_ENDPOINT } from "@/utils/data";

import { useSelector } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { toast } from "sonner";

const AddJob = () => {
  // ✅ get companies from redux
  useGetAllCompanies();

  const { allCompanies: companies } = useSelector(
    (state) => state.company
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.salary ||
      !form.location ||
      !form.jobType ||
      !form.experience ||
      !form.position ||
      !form.companyId
    ) {
      return toast.error("Please fill all required fields");
    }

    try {
      setLoading(true);
     

      const payload = {
        title: form.title,
        description: form.description,
        requirements: form.requirements
          .split(",")
          .map((req) => req.trim()),

        salary: Number(form.salary),
        location: form.location,
        jobType: form.jobType,
        experience: Number(form.experience),
        position: Number(form.position),

        company: form.companyId,
      };

      const res = await axios.post(
        `${JOB_API_ENDPOINT}/post`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Job posted successfully");

        setForm({
          title: "",
          description: "",
          requirements: "",
          salary: "",
          location: "",
          jobType: "",
          experience: "",
          position: "",
          companyId: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white border rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-6">
          Post <span className="text-[#6A38C2]">New Job</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* TITLE */}
          <div>
            <Label className="mb-2">Job Title *</Label>

            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Frontend Developer"
            />
          </div>

          {/* LOCATION */}
          <div>
            <Label className="mb-2">Location *</Label>

            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Berlin, Germany"
            />
          </div>

          {/* SALARY */}
          <div>
            <Label className="mb-2">Salary *</Label>

            <Input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="120000"
            />
          </div>

          {/* EXPERIENCE */}
          <div>
            <Label className="mb-2">Experience *</Label>

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
            <Label className="mb-2">Open Positions *</Label>

            <Input
              type="number"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="4"
            />
          </div>

          {/* JOB TYPE */}
          <div>
            <Label className="mb-2">Job Type *</Label>

            <Select
              value={form.jobType}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  jobType: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Job Type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Full Time">
                  Full Time
                </SelectItem>

                <SelectItem value="Part Time">
                  Part Time
                </SelectItem>

                <SelectItem value="Internship">
                  Internship
                </SelectItem>

                <SelectItem value="Remote">
                  Remote
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* COMPANY SELECT */}
          <div className="md:col-span-2">
            <Label className="mb-2">Select Company *</Label>

            <Select
              value={form.companyId}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  companyId: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose company" />
              </SelectTrigger>

              <SelectContent>
                {companies?.map((company) => (
                  <SelectItem
                    key={company._id}
                    value={company._id}
                  >
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <Label className="mb-2">Description *</Label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter detailed job description..."
              className="w-full border rounded-md p-3 outline-none focus:ring-2 focus:ring-[#6A38C2]"
            />
          </div>

          {/* REQUIREMENTS */}
          <div className="md:col-span-2">
            <Label className="mb-2">
              Requirements (comma separated)
            </Label>

            <Input
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]"
            >
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default AddJob;