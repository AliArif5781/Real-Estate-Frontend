import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PropertyCard } from "../components/PropertyCard";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { searchProperties } from "../features/property/PropertySlice";
import { PropertyCardSkeleton } from "../components/skeleton/PropertyCardSkeleton";
export const MainPage = () => {
  const location = useLocation();
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
  console.log(setSearchInputs, "seachinput");

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
        <div className="space-y-6 overflow-y-auto  mt-4">
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <PropertyCardSkeleton key={`skeleton-${index}`} />
              ))}
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
          {/*  */}
          <div className="pt-[3rem] lg:pt-[7rem]">
            <p>
              {searchInputs.city} real estate market offers excellent investment
              opportunities due to its beautiful surroundings, modern
              infrastructure, and high standard of living.{" "}
              {searchInputs.city === "Islamabad"
                ? `As Pakistan's
              well-planned capital, the city attracts buyers looking for both
              residential and commercial properties`
                : ""}
              , from luxurious houses in developed sectors like F, E and A to
              more affordable plots in upcoming societies. Major developments
              like the Metro Bus and New
              {searchInputs.city} International Airport have further boosted
              property values, making investments here more profitable. Whether
              you're looking for a family home, rental apartment, or business
              space, our platform helps you find verified listings with
              transparent pricing. With high demand from locals and overseas
              Pakistanis, investing in {searchInputs.city} ensures security and
              strong returns. Explore our easy-to-use website to discover the
              best properties that match your budget and needs.
            </p>
          </div>
        </div>
      </div>

      {/* Right Image Column - Only visible on larger screens */}
      {/* <div className="lg:col-span-4 hidden lg:flex items-center justify-center p-4 sm:p-8 mx-2 sm:mx-5">
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
      </div> */}
    </div>
  );
};
