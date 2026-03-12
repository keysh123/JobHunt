import React from "react";
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

const AppliedJobs = () => {
  const jobs = [1, 2, 3, 4, 5];

  return (
    <div className="bg-white border rounded-xl p-6 mt-6">
      <h2 className="text-lg font-semibold text-[#6A38C2] mb-4">
        Applied Jobs
      </h2>

      <Table>
        <TableCaption>Your recently applied jobs</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((item, i) => (
            <TableRow key={i}>
              <TableCell>23-12-2024</TableCell>
              <TableCell>Software Engineer</TableCell>
              <TableCell>Microsoft</TableCell>

              <TableCell className="text-right">
                <Badge className="bg-green-500 hover:bg-green-600">
                  Selected
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;