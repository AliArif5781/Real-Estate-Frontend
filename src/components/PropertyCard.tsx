import React from "react";
import { Bath, BedDouble, Bookmark, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hook";
import { fetchPropertyDetails } from "../features/property/SearchPropertySlice";

// Updated Property interface to match backend data
export interface Property {
  _id: string;
  title: string;
  price: number;
  address: string;
  description: string;
  city: string;
  bedroomNumber: number;
  bathroomNumber: number;
  latitude: number;
  longitude: number;
  type: string;
  property: string;
  utilitiesPolicy: string;
  petPolicy: string;
  Kitchen: number;
  totalSize: number;
  school: number; // Changed from string to number
  images: string[];
  previewImages: string[];
  createdAt?: string;
  BusStop?: number; // Changed from string to number
  Resturant?: number; // Changed from string to number
  LoadShedding?: string; // Added missing fields
  Water?: string;
  Gas?: string;
}

interface PropertyCardProps {
  propertyData?: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ propertyData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  if (!propertyData) {
    return <div>No properties found</div>;
  }

  const handleClick = () => {
    // Preload data before navigation
    dispatch(fetchPropertyDetails(propertyData._id)).then(() => {
      navigate(`/property/${propertyData._id}`);
    });
  };
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-12 gap-4 my-10"
      // onClick={() => navigate(`/property/${propertyData._id}`)}
      onClick={handleClick}
    >
      <div className="sm:col-span-5 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={propertyData.images[0]}
          alt="propertyImage"
          className="w-full h-48 sm:h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="sm:col-span-7 bg-gray-100 px-4 rounded-lg flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-medium">{propertyData.title}</h3>
          <p className="flex text-gray-500 text-base my-2">
            <MapPin className="h-5 mt-[0.5px]" /> {propertyData.address},{" "}
            {propertyData.city}
          </p>
          <span className="text-lg font-semibold bg-amber-300 p-1 rounded-md my-2 inline-block">
            ${propertyData.price.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center bg-amber-300 px-3 py-1 rounded-full text-[16px] font-medium gap-1">
              <BedDouble className="h-6" /> {propertyData.bedroomNumber} bedroom
            </span>
            <span className="inline-flex items-center bg-amber-300 px-3 py-1 rounded-full text-[16px] font-medium gap-1">
              <Bath className="h-6" /> {propertyData.bathroomNumber} bathroom
            </span>
          </div>

          <button className="text-gray-500 transition-colors">
            <Bookmark className="h-5 w-5" />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
