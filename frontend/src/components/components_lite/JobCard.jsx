import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const JobCard = () => {
  const navigate = useNavigate();
  const jobID="bhsbj"
  return (
    <Card className="hover:shadow-lg transition duration-300 cursor-pointer">
      <CardContent className="p-5">

        {/* Company */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="font-semibold text-lg">Google</h3>
            <p className="text-sm text-gray-500">California, USA</p>
          </div>
          <p className="text-xs text-gray-400">2 days ago</p>
        </div>

        {/* Job Title */}
        <h2 className="text-xl font-bold mb-2">
          Frontend Developer
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          We are looking for a talented frontend developer experienced with
          React and modern UI frameworks.
        </p>

        {/* Job Info */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="bg-[#f3f0ff] text-[#6A38C2] text-xs px-3 py-1 rounded-full">
            12 Positions
          </span>

          <span className="bg-green-50 text-green-600 text-xs px-3 py-1 rounded-full">
            Full Time
          </span>

          <span className="bg-purple-50 text-purple-600 text-xs px-3 py-1 rounded-full">
            $120k / year
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Button onClick={()=>{
            navigate(`/description/${jobID}`)
          }} variant="outline" className="w-full">
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