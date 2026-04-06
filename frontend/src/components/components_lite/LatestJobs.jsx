import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const randomJobs = [1, 2, 3, 4, 5, 6];
  const {allJobs} = useSelector((store)=>store.job)

  return (
    <section className="max-w-7xl mx-auto my-20 px-6">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          Latest & Top <span className="text-[#6A38C2]">Job Openings</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Discover the newest opportunities from top companies.
        </p>
      </div>

      {/* Job Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {allJobs?.length>=0 ? allJobs?.slice(0, 6).map((job, i) => (
          <JobCard key={i} job={job} />
        )) : <p>No jobs available</p> }
      </div>
    </section>
  );
};

export default LatestJobs;