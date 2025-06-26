import {
  Bath,
  BedDouble,
  Bus,
  ChevronLeft,
  ChevronRight,
  GlassWater,
  MapPin,
  PawPrint,
  School,
  Square,
  Utensils,
  UtilityPole,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useParams } from "react-router-dom";
import { fetchPropertyDetails } from "../features/property/SearchPropertySlice";
import { Loader } from "../components/Loader";
import userLogo from "/userLogo.png";

// interface Property {
//   images: string[];
//   // other properties...
// }

// interface PropertyGalleryProps {
//   currentProperty?: Property; // Make it optional if needed
// }

export const PropertyPageList = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { currentProperty, loading, error } = useAppSelector(
    (state) => state.clickProperties
  );

  const openFullscreen = (index: number) => {
    setCurrentImageIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => setIsFullscreen(false);

  const goToPrevious = () => {
    if (!currentProperty?.images?.length) return;

    setCurrentImageIndex((prev) =>
      prev === 0 ? currentProperty.images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    if (!currentProperty?.images?.length) return;

    setCurrentImageIndex((prev) =>
      prev === currentProperty.images.length - 1 ? 0 : prev + 1
    );
  };

  const userData = useAppSelector((state) => state.userData);
  // console.log(userData);
  useEffect(() => {
    if (id) {
      dispatch(fetchPropertyDetails(id));
    }
  }, [id, dispatch]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!currentProperty) return <div>Property not found</div>;

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 max-w-[1500px] mx-auto">
      {/* Left Column - Image Gallery */}
      <div className="lg:col-span-8 p-4 md:p-6 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          <div
            className="md:col-span-8 cursor-pointer"
            onClick={() => openFullscreen(0)}
          >
            <img
              src={currentProperty.images[0]}
              alt={currentProperty.title}
              className="w-full h-full max-h-auto md:max-h-[28rem] object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 md:col-span-4 gap-3 md:gap-4 mt-3 md:mt-0 h-full items-center overflow-y-auto">
            {currentProperty.images.slice(1, 4).map((imageUrl, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => openFullscreen(index + 1)}
              >
                <img
                  src={imageUrl}
                  alt={`${currentProperty.title} thumbnail ${index + 1}`}
                  className="w-[15rem] h-20 md:h-[7.5rem] object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        {/*  */}
        {isFullscreen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
            >
              <X size={24} />
            </button>

            <button
              onClick={goToPrevious}
              className="absolute left-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="max-w-full max-h-full">
              <img
                src={currentProperty.images[currentImageIndex]}
                alt={`Fullscreen view ${currentImageIndex + 1}`}
                className="max-h-[90vh] max-w-full object-contain"
              />
            </div>

            <button
              onClick={goToNext}
              className="absolute right-4 text-white p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
            >
              <ChevronRight size={32} />
            </button>

            <div className="absolute bottom-4 text-white text-sm">
              {currentImageIndex + 1} / {currentProperty.images.length}
            </div>
          </div>
        )}
        {/*  */}
        {/* Title Section - Fixed the grid structure */}
        <div className="w-full grid grid-cols-12 gap-4 p-4 rounded-lg">
          <div className="col-span-12 md:col-span-6 space-y-5">
            <h3 className="text-3xl font-bold">{currentProperty.title}</h3>
            <div className="text-gray-600 flex items-center">
              <MapPin className="h-4" /> {currentProperty.address},{" "}
              {currentProperty.city}
            </div>

            <span className="text-2xl font-semibold bg-amber-300 p-1 rounded-md inline-block mt-2">
              {currentProperty.price.toLocaleString("en-Pk", {
                style: "currency",
                currency: "PKR",
                maximumFractionDigits: 0,
              })}
            </span>
            <div className="flex gap-2 mt-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Rent
              </span>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                Apartment
              </span>
            </div>
            <div className="flex w-full gap-5 mt-2">
              <span className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-medium">
                <span className="font-bold">100%</span>{" "}
                <span className="">Interest-Free</span>
              </span>
            </div>
          </div>
          <div className="col-span-6 md:col-span-6 flex items-center justify-end">
            <div className="flex items-center gap-3 bg-green-100 px-4 py-2 rounded-full">
              <div className="h-8 w-8 rounded-full  overflow-hidden">
                <img
                  src={userLogo}
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-medium text-gray-700">
                {userData.data?.firstName.toLocaleUpperCase()}
              </span>
            </div>
          </div>
        </div>
        {/* description */}
        <div className="px-5">
          <h3 className="text-2xl font-bold my-2">Description</h3>
          <p className="text-base">{currentProperty.description}</p>
        </div>
      </div>

      {/* Right Column - Content */}
      <div className="lg:col-span-4 p-4 md:p-6 bg-pink-50 rounded-lg">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold">General</h3>

          {/* Policies Container */}
          <div className="space-y-4">
            {/* Utilities Policy */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                  <UtilityPole className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Utilities</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {currentProperty.utilitiesPolicy}
                  </p>
                </div>
              </div>
            </div>

            {/* Pet Policy */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                  <PawPrint className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Pet Policy</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {currentProperty.petPolicy}
                  </p>
                </div>
              </div>
            </div>

            {/* Income Policy */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                  <WalletCards className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    Utilities Policy
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {currentProperty.utilitiesPolicy}
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="p-4 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Sizes</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-4 p-1 bg-white rounded-md">
                <Square className=" h-6 text-gray-600" /> {/* Increased size */}
                <span className="text-xs text-gray-700">
                  {currentProperty.totalSize} sq ft
                </span>
                {/* Slightly larger text */}
              </div>
              <div className="p-1 bg-white rounded-md flex items-center justify-center gap-4">
                <BedDouble className="w-8 h-6 text-gray-600" />
                {/* Increased size */}
                <span className="text-xs md:text-sm text-gray-700">
                  {currentProperty.bedroomNumber} bed
                </span>
              </div>
              <div className="p-1 bg-white rounded-md flex items-center justify-center gap-4">
                <Bath className="w-8 h-6 text-gray-600" />
                {/* Increased size */}
                <span className="text-xs md:text-sm text-gray-700">
                  {currentProperty.bathroomNumber} bath
                </span>
              </div>
            </div>
          </div>
          {/* Triple Crisis */}
          <div className="p-4 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Triple Crisis</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-4 p-1 bg-white rounded-md">
                <img
                  src="https://www.shutterstock.com/image-vector/electric-pole-line-house-icon-260nw-1503079406.jpg"
                  alt=""
                  className="h-6 sm:h-9"
                />
                <span className="text-[10px] text-gray-700">
                  {currentProperty.LoadShedding}{" "}
                  <span className=" font-semibold">/hr</span>
                </span>
                {/* Slightly larger text */}
              </div>
              <div className="p-1 bg-white rounded-md flex items-center justify-center gap-4">
                <GlassWater className="w-6 h-6 text-gray-600" />
                {/* Increased size */}
                <span className="text-xs md:text-sm text-gray-700">
                  {currentProperty.Water}
                </span>
              </div>
              <div className="p-1 bg-white rounded-md flex items-center justify-center gap-4">
                {/* <Bath className="w-8 h-8 text-gray-600" /> */}
                <img
                  src="https://w7.pngwing.com/pngs/465/890/png-transparent-computer-icons-natural-gas-fuel-leaf-text-monochrome-thumbnail.png"
                  alt=""
                  className="h-6 w-6"
                />
                {/* Increased size */}
                <span className="text-xs text-gray-700">
                  {currentProperty.Gas}
                </span>
              </div>
            </div>
          </div>
          {/* Global Positioning */}
          <div className="p-4 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Global Positioning</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-1 bg-white rounded-md">
                Latitude
                <span className="text-xs md:text-sm text-gray-700 font-bold">
                  {currentProperty.latitude}{" "}
                </span>
                {/* Slightly larger text */}
              </div>
              <div className="p-1 bg-white rounded-md flex items-center justify-center gap-4">
                Longitude
                <span className="text-xs md:text-sm text-gray-700 font-bold">
                  {currentProperty.longitude}
                </span>
              </div>
            </div>
          </div>
          {/*Nearby Places */}
          <div className=" p-3 rounded-lg">
            <h2 className="text-lg font-semibold text-black mb-4">
              Nearby Places
            </h2>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
              {/* School */}
              <div className="flex flex-wrap items-center space-x-2">
                <School className="text-yellow-600" size={24} />
                <div>
                  <p className="text-sm font-semibold text-black">School</p>
                  <p className="text-xs text-gray-600">
                    {currentProperty.school}m
                  </p>
                </div>
              </div>

              {/* Bus Stop */}
              <div className="flex flex-wrap items-center space-x-2">
                <Bus className="text-yellow-600" size={24} />
                <div>
                  <p className="text-sm font-semibold text-black">Bus Stop</p>
                  <p className="text-xs text-gray-600">
                    {currentProperty.BusStop}m
                  </p>
                </div>
              </div>

              {/* Restaurant */}
              <div className="flex flex-wrap items-center space-x-2">
                <Utensils className="text-yellow-600" size={24} />
                <div>
                  <p className="text-sm font-semibold text-black">Restaurant</p>
                  <p className="text-xs text-gray-600">
                    {currentProperty.Resturant}m
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* location */}

          {/* <div className="bg-[#fdf4eb] p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-black mb-4">Location</h2> */}

          {/* <MapContainer
              center={position}
              zoom={10}
              scrollWheelZoom={false}
              className="h-60 w-full rounded-lg z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={markerIcon}>
                <Popup>London</Popup>
              </Marker>
            </MapContainer> */}

          {/* <div className="mt-4 flex gap-4 justify-between">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                <span>💬</span> Send a Message
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                <span>📌</span> Save the Place
              </button>
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
