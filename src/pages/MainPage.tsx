import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { PropertyCard } from "../components/PropertyCard";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { searchProperties } from "../features/property/PropertySlice";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";
export const MainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get search results from Redux store
  const { searchResults, loading } = useAppSelector((state) => state.property);

  // Get initial search params from navigation state or set defaults
  const initialSearchParams = location.state?.searchParams || {};

  // Local state for search form
  const [searchInputs, setSearchInputs] = useState({
    city: initialSearchParams.city || "",
    propertyType: "",
    property: "",
    minPrice: initialSearchParams.minPrice || "",
    maxPrice: initialSearchParams.maxPrice || "",
    bedroom: "",
  });

  // Handle search form changes
  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setSearchInputs((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // Load initial search results if coming from HeroSection
  useEffect(() => {
    if (
      initialSearchParams.city ||
      initialSearchParams.minPrice ||
      initialSearchParams.maxPrice
    ) {
      dispatch(searchProperties(initialSearchParams));
    }
  }, [dispatch, initialSearchParams]);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 max-w-[1200px] mx-auto px-4 sm:px-6">
      {/* Left Content Column */}
      <div className="lg:col-span-8 flex flex-col justify-center py-8 lg:py-0 gap-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl text-black">
          Search results for{" "}
          <span className="font-bold">{searchInputs.city || "All Cities"}</span>
        </h3>

        {/* Search Results */}
        <div className="space-y-6 overflow-y-auto max-h-[500px] mt-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader />
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No properties found matching your criteria
            </div>
          ) : (
            searchResults.map((property) => (
              <PropertyCard key={property._id} propertyData={property} />
            ))
          )}
        </div>
      </div>

      {/* Right Image Column - Only visible on larger screens */}
      <div className="lg:col-span-4 hidden lg:flex items-center justify-center p-4 sm:p-8 bg-light-pink mx-2 sm:mx-5">
        <div className="rounded-lg overflow-hidden w-full max-w-md">
          <img
            src="/bg.png"
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
