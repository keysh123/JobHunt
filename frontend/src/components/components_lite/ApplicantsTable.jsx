// ApplicantsTable.jsx

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import axios from "axios";
import { toast } from "sonner";

import { APPLICATION_API_ENDPOINT } from "@/utils/data";

const ApplicantsTable = ({
  applicants,
  loading,
  fetchApplicants,
}) => {
  const updateStatus = async (status, applicationId) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/status/${applicationId}/update`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        fetchApplicants();
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return <div>Loading applicants...</div>;
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.length > 0 ? (
            applicants.map((application) => (
              <TableRow key={application._id}>

                {/* USER */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={
                          application?.applicant?.profile
                            ?.profilePhoto
                        }
                      />

                      <AvatarFallback>
                        {application?.applicant?.fullName?.charAt(
                          0
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">
                        {application?.applicant?.fullName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {application?.applicant?.profile?.bio}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* EMAIL */}
                <TableCell>
                  {application?.applicant?.email}
                </TableCell>

                {/* PHONE */}
                <TableCell>
                  {application?.applicant?.phoneNo}
                </TableCell>

                {/* RESUME */}
                <TableCell>
                  {application?.applicant?.profile?.resume?.url ? (
                    <a
                      href={
                        application?.applicant?.profile
                          ?.resume?.url
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#6A38C2] hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </TableCell>

                {/* STATUS */}
                <TableCell>
                  <span className="capitalize font-medium">
                    {application?.status}
                  </span>
                </TableCell>

                {/* ACTION */}
                <TableCell className="text-right">
                  <Select
                    onValueChange={(value) =>
                      updateStatus(
                        value,
                        application._id
                      )
                    }
                  >
                    <SelectTrigger className="w-[140px] ml-auto">
                      <SelectValue placeholder="Change Status" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="accepted">
                        Accepted
                      </SelectItem>

                      <SelectItem value="rejected">
                        Rejected
                      </SelectItem>

                      <SelectItem value="pending">
                        Pending
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center py-8 text-gray-500"
              >
                No applicants found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;