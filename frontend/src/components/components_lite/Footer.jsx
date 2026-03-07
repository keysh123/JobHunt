import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Logo / Name */}
          <h1 className="text-xl font-bold">
            Job <span className="text-[#6A38C2]">Portal</span>
          </h1>

          {/* Links */}
          <ul className="flex gap-6 text-sm text-gray-600">
            <li className="hover:text-[#6A38C2] cursor-pointer">Home</li>
            <li className="hover:text-[#6A38C2] cursor-pointer">Browse</li>
            <li className="hover:text-[#6A38C2] cursor-pointer">Jobs</li>
            <li className="hover:text-[#6A38C2] cursor-pointer">Contact</li>
          </ul>

        </div>

        {/* Divider */}
        <div className="border-t mt-6 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Job Portal. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;