import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(setUser(null));
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const { user } = useSelector((state) => state.auth);
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#6A38C2]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <Link to={"/admin/companies"}>Companies</Link>

                <Link to={"/admin/jobs"}>Job</Link>
              </>
            ) : (
              <>
                <Link to={"/"}>Home</Link>
                <Link to={"/browse"}>Browse</Link>
                <Link to={"/jobs"}>Job</Link>
              </>
            )}
          </ul>
          {!user ? (
            <>
              <div className="flex items-center gap-2">
                <Link to={"/login"}>
                  <Button variant="outline" className="cursor-pointer">
                    Login
                  </Button>
                </Link>
                <Link to={"/register"}>
                  <Button className="bg-[#6A38C2] hover:bg-blue-500 cursor-pointer">
                    Register
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  {user?.profile?.profilePhoto ? (
                    <AvatarImage src={user?.profile?.profilePhoto} />
                  ) : (
                    <AvatarImage src="https://github.com/shadcn.png" />
                  )}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                {/* <h1>Job Portal</h1> */}
                <div className="flex  gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    {user?.profile?.profilePhoto ? (
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    ) : (
                      <AvatarImage src="https://github.com/shadcn.png" />
                    )}
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{user.fullName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex items-start flex-col text-gray-600 mt-2">
                  {user && user.role === "student" && (
                    <Button variant="link">
                      <User2 />
                      <Link to={"/profile"}>View Profile</Link>
                    </Button>
                  )}
                  <Button onClick={handleLogout} variant="link">
                    <LogOut />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
