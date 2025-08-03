import { useAppDispatch } from "../../app/hook";
import { Button } from "../../components/Button";
import type { Property } from "../../components/PropertyCard";
import { Dot } from "lucide-react";
import { sendPropertyResponse } from "../../features/property/soldPropertyResponse";
import toast from "react-hot-toast";
import { useState } from "react";

interface soldPropertyProps {
  property: Property;
}

const SoldPropertiesData = ({ property }: soldPropertyProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleResponse = async (response: "accept" | "decline") => {
    setIsLoading(true);
    try {
      await dispatch(
        sendPropertyResponse({
          propertyId: property._id,
          response,
        })
      ).unwrap();
      console.log("Dispatching for property ID:", property._id);
      toast.success(
        `Property ${response === "accept" ? "accepted" : "declined"}!`
      );
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to update response"
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="contents">
      <div className="col-span-3 p-3 border-b border-gray-200">
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
          className={`bg-blue-100 text-blue-800 p-1 rounded-lg text-xs font-medium `}
        >
          {property.status}
        </span>
      </div>
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center text-[15px] text-gray-700">
        {property?.soldAt
          ? new Date(property?.soldAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "N/A"}
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
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center gap-3">
        <Button
          disabled={isLoading}
          variant="lightred"
          onClick={() => handleResponse("decline")}
        >
          {isLoading ? "Processing..." : "Decline"}
        </Button>
        <Button variant="lightgreen" onClick={() => handleResponse("accept")}>
          {/* bg-green-200 text-green-800 hover:bg-green-300 */}
          {isLoading ? "Processing..." : "Accept"}
        </Button>
      </div>
    </div>
  );
};

export default SoldPropertiesData;
