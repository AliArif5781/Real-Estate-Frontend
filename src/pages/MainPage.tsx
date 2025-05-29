import Input from "../components/Input";
import bgImage from "/bg.png";
import { Search } from "lucide-react";

export const MainPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 max-w-[1200px] mx-auto px-4 sm:px-6">
      {/* Left Content Column */}
      <div className="lg:col-span-6 flex flex-col justify-center py-8 lg:py-0 gap-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl text-black">
          Search results for <span className="font-bold">London</span>
        </h3>

        <div className="flex flex-col gap-4 w-full">
          {/* Location Input */}
          <div className="w-full">
            <label
              htmlFor="location"
              className="block text-[1.105rem] font-semibold mb-1 "
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="London"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          {/* New Input - e.g. Property Type */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4">
            {/* Property Type */}

            <div className="col-span-2 lg:col-span-2">
              <label
                htmlFor="propertyType"
                className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 hover:text-gray-900"
              >
                Type
              </label>
              <select
                id="propertyType"
                className="w-full border border-gray-300 rounded-lg px-3 py-[0.645rem] focus:ring-2 focus:ring-[#faedcd] focus:border-[#d5bdaf] outline-none transition-all hover:border-gray-400"
              >
                <option value="">Select type</option>
                <option value="apartment">Apartment</option>
                <option value="studio">Studio</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
              </select>
            </div>

            {/* Property */}
            <div className="col-span-2 lg:col-span-2">
              <label
                htmlFor="property"
                className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 hover:text-gray-900"
              >
                Property
              </label>
              <select
                id="property"
                className="w-full border border-gray-300 rounded-lg px-3 py-[0.645rem] focus:ring-2 focus:ring-[#faedcd] focus:border-[#d5bdaf] outline-none transition-all hover:border-gray-400"
              >
                <option value="">Select property</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
            </div>

            {/* Min Price */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-2">
              <label
                htmlFor="minPrice"
                className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 hover:text-gray-900"
              >
                Min Price
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="minPrice"
                  placeholder="0"
                  className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 focus:ring-2 focus:ring-[#faedcd] focus:border-[#d5bdaf] outline-none transition-all hover:border-gray-400"
                />
              </div>
            </div>

            {/* Max Price */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-2">
              <label
                htmlFor="maxPrice"
                className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 hover:text-gray-900"
              >
                Max Price
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  id="maxPrice"
                  placeholder="0"
                  className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 focus:ring-2 focus:ring-[#faedcd] focus:border-[#d5bdaf] outline-none transition-all hover:border-gray-400"
                />
              </div>
            </div>

            {/* Bedroom */}
            <div className="col-span-2 sm:col-span-1 lg:col-span-2">
              <label
                htmlFor="bedroom"
                className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200 hover:text-gray-900"
              >
                Bedrooms
              </label>
              <select
                id="bedroom"
                className="w-full border border-gray-300 rounded-lg px-3 py-[0.645rem] focus:ring-2 focus:ring-[#faedcd] focus:border-[#d5bdaf] outline-none transition-all hover:border-gray-400"
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-2 flex items-end">
              <button className="w-full bg-[#faedcd] hover:bg-[#f2e9e4] text-black rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors duration-200 shadow-md hover:shadow-lg">
                <Search className="h-5 w-5" />
                {/* <span>Search</span> */}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image Column */}
      <div className="lg:col-span-6 flex items-center justify-center p-4 sm:p-8 bg-light-pink mx-2 sm:mx-5">
        <div className="rounded-lg overflow-hidden w-full max-w-md">
          <img
            src={bgImage}
            alt="Modern luxury apartment with spacious living area and natural light"
            className="w-full h-auto object-cover"
            loading="lazy"
            width={600}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};
