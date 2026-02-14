import React from "react";

const Header = () => {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">

        {/* Small Tagline */}
        <span className="text-[#6A38C2] font-semibold mb-4">
          No.1 Job Hunt Website
        </span>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Search, Apply & Get Your{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>

        {/* Description */}
        <p className="mt-6 text-gray-600 text-lg max-w-2xl">
          Start your hunt for the best life-changing opportunities in your
          selected areas conveniently and get hired quickly.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="bg-[#6A38C2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#8e5ee2] transition">
            Browse Jobs
          </button>

          <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
            How it Works?
          </button>
        </div>

      </div>
    </section>
  );
};

export default Header;
