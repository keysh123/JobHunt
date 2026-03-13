import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const EditProfileModal = ({ openModal, setOpenModal }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    resume: null,
  });

  const changeHandler = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phoneNo", formData.phoneNo);
    data.append("bio", formData.bio);
    data.append("skills", formData.skills);
    data.append("resume", formData.resume);

    console.log("Form Data:", formData);
    // /profile/update
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        await dispatch(setUser(res.data.user));
        toast.success(res.data.message);
         setOpenModal(false);
      }
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error(error.response.data?.message);
    } 

   
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={changeHandler}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input
              name="phoneNo"
              value={formData.phoneNo}
              onChange={changeHandler}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Bio</Label>
            <Input name="bio" value={formData.bio} onChange={changeHandler} />
          </div>

          <div className="space-y-1.5">
            <Label>Skills</Label>
            <Input
              name="skills"
              value={formData.skills}
              onChange={changeHandler}
              placeholder="React, Node, MongoDB"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Resume</Label>
            <Input name="resume" type="file" onChange={changeHandler} />
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>

            <Button type="submit" className="bg-[#6A38C2] hover:bg-[#5b30a6]">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
