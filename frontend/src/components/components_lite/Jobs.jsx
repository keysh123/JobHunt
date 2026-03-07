import React from "react";
import Filter from "./Filter";
import Job from "./Job";

const jobsArray = [1, 2, 3, 4, 5, 6];

const Jobs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="flex gap-8">

        {/* Filter Sidebar */}
        <div className="w-1/4">
          <Filter />
        </div>

        {/* Jobs Section */}
        <div className="flex-1 flex flex-col gap-6">
          {jobsArray.map((job, i) => {
            return <Job key={i} />;
          })}
        </div>

      </div>

    </div>
  );
};

export default Jobs;