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
    resume: null, // new selected file
  });

  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phoneNo", formData.phoneNo);
    data.append("bio", formData.bio);
    data.append("skills", formData.skills);

    // Only append resume if user selected a new file
    if (formData.resume) {
      data.append("file", formData.resume);
    }

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
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
            <Input name="fullName" value={formData.fullName} onChange={changeHandler} />
          </div>

          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input name="email" value={formData.email} onChange={changeHandler} />
          </div>

          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input name="phoneNo" value={formData.phoneNo} onChange={changeHandler} />
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
            {/* Show old resume if exists */}
            {user?.profile?.resume?.url && !formData.resume && (
              <p className="text-sm text-gray-500 mt-1">
                Current: <a href={user.profile.resume.url} target="_blank" rel="noopener noreferrer">{user.profile.resumeOrignalName || "View Resume"}</a>
              </p>
            )}
            {/* Show new selected file */}
            {formData.resume && (
              <p className="text-sm text-gray-500 mt-1">
                Selected file: {formData.resume.name}
              </p>
            )}
          </div>

          <DialogFooter className="mt-4 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-[#6A38C2] hover:bg-[#5b30a6]"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;