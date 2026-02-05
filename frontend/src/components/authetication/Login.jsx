import React from 'react'
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center max-w-4xl mx-auto">
            <form
              action=""
              className="w-1/2 border border-gray-300 rounded-md p-4 my-10 "
            >
              <h1 className="font-bold text-xl mb-5 text-center">Login</h1>
             
              <div className="my-2">
                <Label>Email</Label>
                <Input className="mt-2" type="email" placeholder="keyashah@gmail.com"></Input>
              </div>
              <div className="my-2">
                <Label>Password</Label>
                <Input className="mt-2" type="password" placeholder="********"></Input>
              </div>
              
              <div className="flex items-center justify-start gap-5">
                <Label>Role</Label>
                <RadioGroup  className="w-fit flex gap-4 items-center my-5">
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
            
              
              <button className=" my-3 w-full bg-[#022bf8] hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md mt-5">
                Login
              </button>
              <p className="text-gray-500 text-md my-2">
               Don't have an account? <Link to="/register" className="text-blue-700">Register</Link>
              </p>
            </form>
          </div>
    </>
  )
}

export default Login