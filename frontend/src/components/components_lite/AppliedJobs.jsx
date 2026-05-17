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

import { Badge } from "../ui/badge";

import axios from "axios";
import { toast } from "sonner";

import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppliedJobs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/getAppliedJobs`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setApplications(res.data.applications);
      }

    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch applied jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "accepted":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            Accepted
          </Badge>
        );

      case "rejected":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            Rejected
          </Badge>
        );

      default:
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6 mt-6">
      <h2 className="text-lg font-semibold text-[#6A38C2] mb-4">
        Applied Jobs
      </h2>

      <Table>
        <TableCaption>
          Your recently applied jobs
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center"
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : applications?.length > 0 ? (
            applications.map((application) => (
              <TableRow key={application._id}>

                {/* DATE */}
                <TableCell>
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </TableCell>

                {/* JOB TITLE */}
                <TableCell>
                  {application?.job?.title}
                </TableCell>

                {/* COMPANY */}
                <TableCell>
                  {application?.job?.company?.name}
                </TableCell>

                {/* STATUS */}
                <TableCell className="text-right">
                  {getStatusBadge(
                    application?.status
                  )}
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500"
              >
                No applied jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;