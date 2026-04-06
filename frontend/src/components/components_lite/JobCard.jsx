import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const jobID = job._id;

  return (
    <Card className="hover:shadow-lg transition duration-300 cursor-pointer">
      <CardContent className="p-5">

        {/* Company */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-semibold text-lg">
              {job.company?.name}
            </h3>
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
          <p className="text-xs text-gray-400">
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Job Title */}
        <h2 className="text-xl font-bold mb-2">
          {job.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          {job.description.length > 100
            ? job.description.substring(0, 100) + "..."
            : job.description}
        </p>

        {/* Job Info */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="bg-[#f3f0ff] text-[#6A38C2] text-xs px-3 py-1 rounded-full">
            {job.position} Positions
          </span>

          <span className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full">
            {job.jobType}
          </span>

          <span className="bg-purple-50 text-purple-600 text-xs px-3 py-1 rounded-full">
            ₹{job.salary}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate(`/description/${jobID}`)}
            variant="outline"
            className="w-full"
          >
            Details
          </Button>

          <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
            Apply
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};

export default JobCard;