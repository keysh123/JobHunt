import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";

const Category = () => {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Mobile App Developer",
    "UI/UX Designer",
    "Product Manager",
    "QA Engineer",
    "Cybersecurity Specialist",
    "Cloud Engineer",
    "AI/ML Engineer",
    "Game Developer",
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Browse by <span className="text-[#6A38C2]">Category</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Explore job opportunities based on your skills and interests.
          </p>
        </div>

        {/* Carousel */}
        <Carousel className="relative">
          <CarouselContent className="py-4">
            {category.map((item, i) => (
              <CarouselItem
                key={i}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <Button
                  variant="outline"
                  className="w-full rounded-xl py-6 text-sm font-medium hover:bg-[#6A38C2] hover:text-white transition duration-300 shadow-sm"
                >
                  {item}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Category;
