import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Vadodara",
      "Ahmedabad",
      "Surat",
      "Rajkot",
      "Gandhinagar",
      "Mumbai",
      "Pune",
      "Delhi",
      "Bangalore",
      "Hyderabad",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "IT",
      "Finance",
      "Healthcare",
      "Education",
      "Manufacturing",
      "Retail",
      "Hospitality",
      "Transportation",
      "Energy",
      "Real Estate",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"],
  },
];

const Filter = () => {
  return (
    <div className="bg-white p-5 rounded-lg border">

      {/* Title */}
      <h1 className="text-lg font-semibold text-[#6A38C2]">
        Filter Jobs
      </h1>

      <hr className="my-4" />

      <RadioGroup>

        {filterData.map((data, i) => (
          <div key={i} className="mb-5">

            {/* Filter Type */}
            <h2 className="font-medium mb-2">
              {data.filterType}
            </h2>

            {/* Options */}
            {data.array.map((item, index) => {
              const id = `${data.filterType}-${index}`;

              return (
                <div key={id} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={id} />
                  <label
                    htmlFor={id}
                    className="text-sm cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              );
            })}

          </div>
        ))}

      </RadioGroup>

    </div>
  );
};

export default Filter;