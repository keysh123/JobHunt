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
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  useGetAllCompanies();

  const {allCompanies: companies } = useSelector((state) => state.company);

  return (
    <div className="bg-white border rounded-xl p-4">
      <Table>
        <TableCaption>Your registered companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {companies?.length > 0 ? (
            companies.map((company) => (
              <TableRow key={company._id}>

                {/* LOGO */}
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                    <AvatarFallback>
                      {company.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* NAME */}
                <TableCell className="font-medium">
                  {company.name}
                </TableCell>

                {/* DATE */}
                <TableCell>
                  {new Date(company.createdAt).toDateString()}
                </TableCell>

                {/* ACTION */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No companies found
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </div>
  );
};

export default CompaniesTable;