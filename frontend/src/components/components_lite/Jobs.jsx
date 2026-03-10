import React, { useState } from "react";
import Filter from "./Filter";
import JobCard from "./JobCard";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const jobsArray = [1, 2, 3, 4, 5, 6];

const Jobs = () => {
  const jobsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobsArray.length / jobsPerPage);

  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobsArray.slice(startIndex, startIndex + jobsPerPage);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Filter Sidebar */}
        <div className="lg:w-1/4 sticky top-20 h-fit">
          <Filter />
        </div>

        {/* Jobs Section */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Job Cards */}
          {currentJobs.map((job, i) => (
            <JobCard key={i} />
          ))}

          {/* Pagination */}
          <Pagination className="mt-6">
            <PaginationContent>

              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>

        </div>
      </div>
    </section>
  );
};

export default Jobs;