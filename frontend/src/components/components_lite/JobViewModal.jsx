import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const JobViewModal = ({ open, setOpen, job }) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">

        <DialogHeader>
          <DialogTitle>
            {job.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <div>
            <h3 className="font-semibold">Company</h3>
            <p>{job.company?.name}</p>
          </div>

          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{job.description}</p>
          </div>

          <div>
            <h3 className="font-semibold">Location</h3>
            <p>{job.location}</p>
          </div>

          <div>
            <h3 className="font-semibold">Salary</h3>
            <p>₹ {job.salary}</p>
          </div>

          <div>
            <h3 className="font-semibold">Experience</h3>
            <p>{job.experience} years</p>
          </div>

          <div>
            <h3 className="font-semibold">Requirements</h3>

            <div className="flex flex-wrap gap-2 mt-2">
              {job.requirements?.map((req, index) => (
                <span
                  key={index}
                  className="bg-[#f3f0ff] text-[#6A38C2] px-3 py-1 rounded-full text-sm"
                >
                  {req}
                </span>
              ))}
            </div>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
};

export default JobViewModal;