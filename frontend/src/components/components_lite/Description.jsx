import React from "react";
import { Button } from "../ui/button";

const Description = () => {
  const isApplied = true;

  const job = {
    title: "Frontend Developer",
    description:
      "We are looking for a React developer to build scalable UI applications and collaborate with cross-functional teams.",
    requirements: ["React", "JavaScript", "Tailwind CSS", "REST APIs"],
    salary: 120000,
    location: "Berlin, Germany",
    jobType: "Full Time",
    experience: 2,
    position: 4,
  };

  const company = {
    name: "Microsoft",
    location: "Berlin",
    website: "https://microsoft.com",
    description:
      "Microsoft builds enterprise and cloud solutions used by millions worldwide.",
    logo: "https://logo.clearbit.com/microsoft.com",
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="col-span-2">

          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>

          <p className="text-gray-500 mb-8">
            {company.name} • {job.location} • {job.experience} yrs experience
          </p>

          {/* JOB INFO */}
          <div className="grid grid-cols-3 gap-4 mb-10">

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Salary</p>
              <p className="font-semibold text-lg">${job.salary}</p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="font-semibold text-lg">{job.jobType}</p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Openings</p>
              <p className="font-semibold text-lg">{job.position}</p>
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3">Job Description</h2>

            <p className="text-gray-600 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* REQUIREMENTS */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Requirements</h2>

            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div>

          <div className="border rounded-xl p-6 bg-white sticky top-20 shadow-sm">

            <Button
              disabled={isApplied}
              className={`w-full mb-6 ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#6A38C2] hover:bg-[#5b30a6]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>

            {/* COMPANY */}
            <div className="flex items-center gap-3 mb-4">

              <img
                src={company.logo}
                className="h-12 w-12 rounded-md border"
                alt=""
              />

              <div>
                <h3 className="font-semibold">{company.name}</h3>
                <p className="text-sm text-gray-500">{company.location}</p>
              </div>

            </div>

            <p className="text-sm text-gray-600 mb-5">
              {company.description}
            </p>

            <a
              href={company.website}
              className="text-sm font-medium text-[#6A38C2]"
            >
              Visit Website
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Description;