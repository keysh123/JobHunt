import React from "react";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import useSingleJob from "@/hooks/useSingleJob";
import { useSelector } from "react-redux";

const Description = () => {
  const params = useParams();
  const id = params.id;
  
  

  useSingleJob(id); // fills Redux

  const { selectedJob } = useSelector((store) => store.job);
  const {user} = useSelector((store)=>store.auth)

  if (!selectedJob) return <p>Loading...</p>;

 const isApplied = selectedJob.applications?.some(
  (app) => app.applicant === user?._id
);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="col-span-2">

          <h1 className="text-3xl font-bold mb-2">
            {selectedJob.title}
          </h1>

          <p className="text-gray-500 mb-8">
            {selectedJob.company?.name} • {selectedJob.location} •{" "}
            {selectedJob.experience} yrs experience
          </p>

          {/* JOB INFO */}
          <div className="grid grid-cols-3 gap-4 mb-10">

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Salary</p>
              <p className="font-semibold text-lg">
                ₹{selectedJob.salary}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="font-semibold text-lg">
                {selectedJob.jobType}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-sm text-gray-500">Openings</p>
              <p className="font-semibold text-lg">
                {selectedJob.position}
              </p>
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3">
              Job Description
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {selectedJob.description}
            </p>
          </div>

          {/* REQUIREMENTS */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Requirements
            </h2>

            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              {selectedJob.requirements?.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* RIGHT */}
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
                src={selectedJob.company?.logo}
                className="h-12 w-12 rounded-md border"
                alt=""
              />

              <div>
                <h3 className="font-semibold">
                  {selectedJob.company?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedJob.company?.location}
                </p>
              </div>

            </div>

            <p className="text-sm text-gray-600 mb-5">
              {selectedJob.company?.description}
            </p>

            <a
              href={selectedJob.company?.website}
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