import { Input } from "../components/Input";
import { Search } from "lucide-react";
import bgImage from "/bg.png";
import { useState } from "react";
import { searchProperties } from "../features/property/PropertySlice";
import { useAppDispatch } from "../app/hook";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const HeroSection = () => {
  const [city, setCity] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [errors, setErrors] = useState({
    city: "",
    minPrice: "",
    maxPrice: "",
    general: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const validateInputs = () => {
    let isValid = true;
    const newErrors = {
      city: "",
      minPrice: "",
      maxPrice: "",
      general: "",
    };

    // Check if all fields are empty
    if (!city && !minPrice && !maxPrice) {
      newErrors.general = "Please fill at least one search field";
      isValid = false;
    }

    // Validate price range if both are provided
    if (minPrice && maxPrice && minPrice > maxPrice) {
      newErrors.minPrice = "Min price cannot be greater than max price";
      newErrors.maxPrice = "Max price cannot be less than min price";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSearch = async () => {
    setErrors({
      city: "",
      minPrice: "",
      maxPrice: "",
      general: "",
    });

    if (!validateInputs()) {
      return; // Stop if validation fails
    }

    try {
      await dispatch(searchProperties({ city, minPrice, maxPrice }));
      // console.log(data, "data");
      navigate("/mainPage", {
        state: {
          searchParams: { city, minPrice, maxPrice },
        },
      });
    } catch (error: any) {
      toast.error(error.message || "Search Failed");
    }
  };
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
              Discover your dream property in Lahore's most sought-after
              neighborhoods. Our curated listings feature luxury homes, modern
              apartments, and prime commercial spaces, all with verified details
              and high-quality visuals. With personalized service and expert
              market insights, we make buying, selling, or renting seamless.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
            <div className="flex w-full">
              <button className="flex-1 px-4 py-3 text-sm sm:text-base font-medium text-white bg-black hover:bg-gray-800 transition-colors">
                Buy
              </button>
              {/* <button className="flex-1 px-4 py-3 text-sm sm:text-base font-medium text-black bg-gray-100 hover:bg-gray-200 transition-colors">
                Rent
              </button> */}
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="sm:col-span-2 lg:col-span-1">
                  <Input
                    type="text"
                    placeholder="City"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.city || errors.general
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-[#60463b]"
                    }`}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Min price"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.minPrice || errors.general
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-[#60463b]"
                    }`}
                    value={minPrice || ""}
                    onChange={(e) =>
                      setMinPrice(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Max price"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.maxPrice || errors.general
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-[#60463b]"
                    }`}
                    value={maxPrice || ""}
                    onChange={(e) =>
                      setMaxPrice(
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                  />
                </div>
                <button
                  className="bg-light-brown hover:bg-light-brown-100 p-2 sm:p-3 rounded-md text-white flex items-center justify-center transition-colors"
                  aria-label="Search properties"
                  onClick={handleSearch}
                >
                  <Search size={18} />
                </button>
              </div>
              {/* Error messages */}
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
              {errors.minPrice && (
                <p className="mt-1 text-sm text-red-600">{errors.minPrice}</p>
              )}
              {errors.maxPrice && (
                <p className="mt-1 text-sm text-red-600">{errors.maxPrice}</p>
              )}
              {errors.general && (
                <p className="mt-1 text-sm text-red-600">{errors.general}</p>
              )}
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
