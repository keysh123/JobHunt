import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const user = true;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#022bf8]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6">
            <li>Home</li>
            <li>Browse</li>
            <li>Job</li>
          </ul>
          {!user ? (
            <>
            <div className="flex items-center gap-2">
            <Button variant="outline" className="cursor-pointer">Login</Button>
            <Button className="bg-[#022bf8] hover:bg-blue-500 cursor-pointer">Register</Button>
            </div>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                {/* <h1>Job Portal</h1> */}
                <div className="flex  gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Keya Shah</h3>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet adipisicing. Itaque autem modi
                      quisquam velit at id?
                    </p>
                  </div>
                </div>
                <div className="flex items-start flex-col text-gray-600 mt-2">
                  <Button variant="link">
                    <User2 />
                    View Profile
                  </Button>
                  <Button variant="link">
                    <LogOut />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
          {/* <li><Link>Home</Link></li>
          <li><Link>Browse</Link></li>
          <li><Link>Job</Link></li>    */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
