import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const handleChange = async (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error(error.response.data?.message);
    } finally {
      await dispatch(setLoading(false));
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
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              value={data.email}
              name="email"
              onChange={handleChange}
              className="mt-2"
              type="email"
              placeholder="keyashah@gmail.com"
            ></Input>
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              value={data.password}
              name="password"
              onChange={handleChange}
              className="mt-2"
              type="password"
              placeholder="********"
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
          {loading ? (
            <>
              <Button>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                Loading...
              </Button>
            </>
          ) : (
            <button
              type="submit"
              className=" my-3 w-full bg-[#022bf8] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md mt-5"
            >
              Login
            </button>
          )}
          <p className="text-gray-500 text-md my-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-700">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
