import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import AppliedJobs from "./AppliedJobs";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [openModal,setOpenModal] = useState(false)

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">

      {/* Profile Header */}
      <div className="bg-white border rounded-xl p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">

          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.profile?.profilePhoto} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-xl font-bold">{user?.fullName}</h1>
            <p className="text-gray-500">{user?.profile?.bio}</p>
          </div>

        </div>

        <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]" onClick={()=>{
          setOpenModal(true)
        }}>
          Edit Profile
        </Button>
      </div>

      {/* Contact Info */}
      <div className="bg-white border rounded-xl p-6 mt-6">
        <h2 className="text-lg font-semibold text-[#6A38C2] mb-4">
          Contact Information
        </h2>

        <div className="space-y-2 text-gray-700">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Phone:</strong> {user?.phoneNo}</p>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white border rounded-xl p-6 mt-6">
        <h2 className="text-lg font-semibold text-[#6A38C2] mb-4">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {user?.profile?.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-[#f3f0ff] text-[#6A38C2] px-3 py-1 text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Resume */}
      <div className="bg-white border rounded-xl p-6 mt-6">
        <h2 className="text-lg font-semibold text-[#6A38C2] mb-4">
          Resume
        </h2>

        <Button variant="outline">
          Download Resume
        </Button>
      </div>

      {/* Applied Jobs */}
      <AppliedJobs />

      {/* Edit Profile Modal */}
      <EditProfileModal setOpenModal={setOpenModal} openModal={openModal} />

    </section>
  );
};

export default Profile;