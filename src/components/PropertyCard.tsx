import React, { useState } from "react";
import { Bath, BedDouble, Bookmark, MapPin } from "lucide-react";

// Define what a property looks like
export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  imageUrl: string;
  location: string;
}

// Define what props this component receives
interface PropertyCardProps {
  property?: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const dummyProperty: Property = {
    id: "1",
    title: "Luxury Apartment in Downtown",
    address: "123 Main Street",
    price: 2500,
    bedrooms: 3,
    bathrooms: 2,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    location: "London",
  };

  const displayProperty = property || dummyProperty;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 my-10">
      <div className="sm:col-span-5 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={displayProperty.imageUrl}
          alt="propertyImage"
          className="w-full h-48 sm:h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="sm:col-span-7 bg-gray-100 px-4 rounded-lg flex flex-col h-full">
        <div className="flex-grow">
          {" "}
          <h3 className="text-xl font-medium">{displayProperty.title}</h3>
          <p className="flex text-gray-500 text-base my-2">
            <MapPin className="h-5 mt-[0.5px]" /> {displayProperty.address},{" "}
            {displayProperty.location}
          </p>
          <span className="text-lg font-semibold bg-amber-300 p-1 rounded-md my-2 inline-block">
            ${displayProperty.price.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center bg-amber-300 px-3 py-1 rounded-full text-[16px] font-medium gap-1">
              <BedDouble className="h-6" /> {displayProperty.bedrooms} bedroom
            </span>
            <span className="inline-flex items-center bg-amber-300 px-3 py-1 rounded-full text-[16px] font-medium gap-1">
              <Bath className="h-6" /> {displayProperty.bathrooms} bathroom
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

export default PropertyCard;
