import { Dot, Trash2 } from "lucide-react";
import type { Property } from "../../features/property/PropertySlice";

interface GetAllPropertyDataProps {
  property: Property;
}
const GetAllPropertyData = ({ property }: GetAllPropertyDataProps) => {
  return (
    <div className="contents">
      <div className="col-span-4 p-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img
            src={property.images[0]}
            alt="Property"
            className="h-[4rem] w-[6rem] rounded-lg object-cover object-center"
          />
          <div>
            <h4 className="md:font-medium text-xs md:text-[15px] break-words">
              {property.title}
            </h4>
            <div className="flex lg:items-center text-xs text-[#717372] pt-2">
              {property.bedroomNumber} beds{" "}
              <span className="flex items-center ">
                <Dot className="hidden lg:flex" />
                {property.bathroomNumber} baths
              </span>{" "}
              <span className="flex items-center">
                <Dot className="hidden lg:flex" />
                {property.totalSize} sqft
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center text-[15px] text-gray-700">
        {property.city}, Pakistan
      </div>
      <div className="col-span-1 p-3 border-b border-gray-200 flex items-center  ">
        <span
          className={`bg-blue-100 text-blue-800 p-1 rounded-lg text-xs font-medium ${
            property.type === "Rent"
              ? "bg-blue-100 text-blue-800"
              : "bg-teal-100 text-teal-800"
          }`}
        >
          {property.type}
        </span>
      </div>
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center text-[15px] text-gray-700">
        {new Date(property.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center text-sm">
        <span className="bg-amber-200 text-amber-900 p-1 font-medium  rounded-lg">
          {property.price.toLocaleString("en-PK", {
            style: "currency",
            currency: "PKR",
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
      <div className="col-span-1 p-3 border-b border-gray-200 flex pl-8 items-center gap-3">
        <Trash2 className="text-red-600 hover:text-red-800 cursor-pointer" />
      </div>
    </div>
  );
};

export default GetAllPropertyData;
