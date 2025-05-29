import React, { useState } from "react";

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
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 my-5">
      {/* Image Section - Full width on mobile, 4 columns on sm+ */}
      <div className="sm:col-span-5 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={displayProperty.imageUrl}
          alt="propertyImage"
          className="w-full h-full sm:h-full object-cover"
        />
      </div>

      {/* Details Section - Full width on mobile, 8 columns on sm+ */}
      <div className="sm:col-span-7 bg-gray-100 px-4 rounded-lg">
        <h3 className="text-xl font-medium">{displayProperty.title}</h3>
        <p className="text-gray-500 text-base my-2">
          {displayProperty.address}, {displayProperty.location}
        </p>
        <span className="text-lg font-semibold  bg-amber-300 p-1 rounded-md my-2">
          ${displayProperty.price.toLocaleString()}
        </span>
        <div className="flex gap-4 mt-3 bg-red-300">
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {displayProperty.bedrooms} beds
          </span>
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {displayProperty.bathrooms} baths
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
