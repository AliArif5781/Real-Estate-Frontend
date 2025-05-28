import Input from "../components/Input";
import { Search } from "lucide-react";
import bgImage from "/bg.png";
const HeroSection = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 max-w-[1200px] mx-auto px-4 sm:px-6">
      {/* Left Content Column */}
      <div className="lg:col-span-6 flex items-center py-8 lg:py-0">
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6">
            Unlock the Door to
            <span className="block mt-2">Your Dream Home</span>
          </h1>

          <div className="max-w-full prose prose-sm sm:prose-base text-gray-600 mb-8">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae
              tempore illo soluta eius asperiores velit. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Ullam et, totam tempora
              corrupti odio esse quibusdam? Quibusdam facilis odit ut!
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="flex w-full">
              <button className="flex-1 px-4 py-3 text-sm sm:text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors">
                Buy
              </button>
              <button className="flex-1 px-4 py-3 text-sm sm:text-base font-medium text-black bg-gray-100 hover:bg-gray-200 transition-colors">
                Rent
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="sm:col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60463b]"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Min price"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60463b]"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Max price"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#60463b]"
                  />
                </div>
                <button
                  className="bg-light-brown hover:bg-light-brown-100 p-2 sm:p-3 rounded-md text-white flex items-center justify-center transition-colors"
                  aria-label="Search properties"
                >
                  <Search size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="stats-card_container">
            <div className="stats-card">
              <h3 className="stats-card__value">16+</h3>
              <span className="stats-card__label">Years of Experience</span>
            </div>

            <div className="stats-card">
              <h3 className="stats-card__value">200</h3>
              <span className="stats-card__label">Award Gained</span>
            </div>

            <div className="col-span-12 md:col-span-4 p-4 sm:p-6  rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <h3 className="stats-card__value">2000+</h3>
              <span className="stats-card__label">Property Ready</span>
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

export default HeroSection;
