import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const EditProfileModal = ({ openModal, setOpenModal }) => {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">

          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input placeholder="Enter name" />
          </div>

          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input placeholder="Enter email" />
          </div>

          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input placeholder="Enter phone number" />
          </div>

          <div className="space-y-1.5">
            <Label>Bio</Label>
            <Input placeholder="Enter bio" />
          </div>

          <div className="space-y-1.5">
            <Label>Skills</Label>
            <Input placeholder="React, Node, MongoDB" />
          </div>

          <div className="space-y-1.5">
            <Label>Resume</Label>
            <Input type="file" />
          </div>

        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>

          <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
            Save Changes
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;