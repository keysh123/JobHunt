import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    phoneNo: "",
    file: "",
  });
  const handleChange = async (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFileChange = async (e) => {
    setData((prev) => ({ ...prev, file: e.target.files?.[0] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("phoneNo", data.phoneNo);
    if (data.file) {
      formData.append("file", data.file);
    }

    // console.log(data);
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
        console.log(error.response.data);
        toast.error(error.response.data?.message)
     
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-300 rounded-md p-4 my-10 "
        >
          <h1 className="font-bold text-xl mb-5 text-center">Register</h1>
          <div className="my-2">
            <Label>Name</Label>
            <Input
              value={data.fullName}
              onChange={handleChange}
              name="fullName"
              className="mt-2"
              type="text"
              placeholder="Keya Shah"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              value={data.email}
              onChange={handleChange}
              name="email"
              className="mt-2"
              type="email"
              placeholder="keyashah@gmail.com"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              value={data.password}
              onChange={handleChange}
              name="password"
              className="mt-2"
              type="password"
              placeholder="********"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Phone No</Label>
            <Input
              value={data.phoneNo}
              onChange={handleChange}
              name="phoneNo"
              className="mt-2"
              type="number"
              placeholder="1234567809"
            ></Input>
          </div>
          <div className="flex items-center gap-5">
            <Label className="whitespace-nowrap">Role</Label>

            <RadioGroup
              value={data.role}
              onValueChange={(value) =>
                setData((prev) => ({ ...prev, role: value }))
              }
              className="flex gap-4 items-center my-5"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="student" id="r1" />
                <Label htmlFor="r1">Student</Label>
              </div>

              <div className="flex items-center gap-3">
                <RadioGroupItem value="recruiter" id="r2" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-2">
            <Label className="whitespace-nowrap">Profile Photo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            ></Input>
          </div>

          <button
            type="submit"
            className=" my-3 w-full bg-[#022bf8] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md mt-5"
          >
            Register
          </button>
          <p className="text-gray-500 text-md my-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
