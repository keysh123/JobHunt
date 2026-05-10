import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Edit2, MoreHorizontal } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSelectedJob } from "@/redux/jobSlice";
import { Eye, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import JobViewModal from "./JobViewModal";
import { JOB_API_ENDPOINT } from "@/utils/data";

const AdminJobsTable = ({ searchText }) => {
  useGetAllJobs();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allJobs: jobs } = useSelector((store) => store.job);

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [selectedViewJob, setSelectedViewJob] = useState(null);

  useEffect(() => {
    if (!searchText) {
      setFilteredJobs(jobs);
    } else {
      const query = searchText.toLowerCase();

      const filtered = jobs?.filter((job) => {
        const text = `
          ${job?.title || ""}
          ${job?.description || ""}
          ${job?.location || ""}
          ${job?.jobType || ""}
          ${job?.company?.name || ""}
        `.toLowerCase();

        return text.includes(query);
      });

      setFilteredJobs(filtered);
    }
  }, [jobs, searchText]);

  const handleSelectJob = (job) => {
    dispatch(setSelectedJob(job));

    navigate(`/admin/jobs/edit/${job._id}`);
  };
  const handleViewJob = (job) => {
    setSelectedViewJob(job);
    setOpenView(true);
  };

  const handleDeleteJob = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_ENDPOINT}/delete/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Job deleted successfully");

        setFilteredJobs((prev) => prev.filter((job) => job._id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete job");
    }
  };

  return (
    <div className="bg-white border rounded-xl p-4">
      <Table>
        <TableCaption>Your posted jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredJobs?.length > 0 ? (
            filteredJobs.map((job) => (
              <TableRow key={job._id}>
                {/* COMPANY LOGO */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={job.company?.logo} />
                      <AvatarFallback>
                        {job.company?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <span className="font-medium">{job.company?.name}</span>
                  </div>
                </TableCell>

                {/* JOB TITLE */}
                <TableCell className="font-medium">{job.title}</TableCell>

                {/* LOCATION */}
                <TableCell>{job.location}</TableCell>

                {/* DATE */}
                <TableCell>{new Date(job.createdAt).toDateString()}</TableCell>

                {/* ACTION */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-36">
                      {/* VIEW */}
                      <div
                        className="flex items-center gap-2 cursor-pointer mb-3"
                        onClick={() => handleViewJob(job)}
                      >
                        <Eye className="w-4" />
                        <span>View</span>
                      </div>

                      {/* EDIT */}
                      <div
                        className="flex items-center gap-2 cursor-pointer mb-3"
                        onClick={() => handleSelectJob(job)}
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>

                      {/* DELETE */}
                      <div
                        className="flex items-center gap-2 cursor-pointer text-red-500"
                        onClick={() => handleDeleteJob(job._id)}
                      >
                        <Trash2 className="w-4" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <JobViewModal
        open={openView}
        setOpen={setOpenView}
        job={selectedViewJob}
      />
    </div>
  );
};

export default AdminJobsTable;
