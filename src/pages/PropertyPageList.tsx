import {
  Bath,
  Bed,
  BedDouble,
  Bus,
  Map,
  MapPin,
  MapPinCheck,
  School,
  Square,
  SquarePlus,
  Utensils,
} from "lucide-react";

export const PropertyPageList = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 max-w-[1500px] mx-auto">
      {/* Left Column - Image Gallery */}
      <div className="lg:col-span-8 p-4 md:p-6 flex flex-col gap-4">
        {" "}
        {/* Added flex layout */}
        {/* Image Gallery Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          <div className="md:col-span-8">
            <img
              src="https://images.unsplash.com/photo-1749288752497-5fb00d855426?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Main"
              className="w-full h-full max-h-[30rem] md:max-h-[40rem] object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 md:col-span-4 gap-3 md:gap-4 mt-3 md:mt-0 h-full items-center">
            {[1, 2, 3].map((item) => (
              <img
                key={item}
                src="https://plus.unsplash.com/premium_photo-1746718184918-05d7cbda1477?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
                alt={`Thumbnail ${item}`}
                className="w-full h-20 md:h-[10rem] object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
        {/* Title Section - Fixed the grid structure */}
        <div className="w-full grid grid-cols-12 gap-4 p-4 rounded-lg">
          <div className="col-span-12 md:col-span-6 space-y-5">
            <h3 className="text-3xl font-bold">Test Title</h3>
            <div className="text-gray-600 flex items-center">
              <MapPin className="h-4" /> Test address
            </div>
            <span className="text-2xl font-semibold bg-amber-300 p-1 rounded-md inline-block mt-2">
              $1000
            </span>
          </div>
          <div className="col-span-12 md:col-span-6 flex items-center justify-end">
            <div className="flex items-center gap-3 bg-green-100 px-4 py-2 rounded-full">
              <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src="https://example.com/avatar.jpg"
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-medium text-gray-700">User Name</span>
            </div>
          </div>
        </div>
        {/* description */}
        <div className="px-5">
          <h3 className="text-2xl font-bold my-2">Description</h3>
          <p className="text-base">
            harum adipisci ut voluptatum! Ea illum amet voluptas quam non,
            labore illo placeat iusto nisi est minima libero atque at! Nisi
            ratione nam vitae at. Corporis quibusdam, tempora minus voluptas
            velit nulla illo quo vero, eveniet laudantium commodi sequi, ipsam
            aliquam porro quas similique. Nulla eligendi optio provident
            adipisci recusandae laborum architecto expedita nam quasi tempora,
            perferendis beatae ut voluptate itaque reiciendis repudiandae
            similique quibusdam in fuga?
          </p>
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
                  <Map className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Utilities</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Owner is responsible
                  </p>
                </div>
              </div>
            </div>

            {/* Pet Policy */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                  <Map className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Pet Policy</h4>
                  <p className="text-sm text-gray-500 mt-1">Pets not Allowed</p>
                </div>
              </div>
            </div>

            {/* Income Policy */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                  <Map className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Income Policy</h4>
                  {/* Add policy details here when available */}
                </div>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="p-4 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Sizes</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-4 p-1 bg-white rounded-md">
                <Square className="w-8 h-8 text-gray-600" />{" "}
                {/* Increased size */}
                <span className="text-xs md:text-sm text-gray-700 font-bold">
                  100 sqft
                </span>
                {/* Slightly larger text */}
              </div>
              <div className="p-1 bg-white rounded-md flex items-center justify-center gap-4">
                <BedDouble className="w-8 h-8 text-gray-600" />
                {/* Increased size */}
                <span className="text-xs md:text-sm text-gray-700 font-bold">
                  1 bed
                </span>
              </div>
              <div className="p-1 bg-white rounded-md flex items-center justify-center gap-4">
                <Bath className="w-8 h-8 text-gray-600" />
                {/* Increased size */}
                <span className="text-xs md:text-sm text-gray-700 font-bold">
                  1 bath
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
                  <p className="text-xs text-gray-600">200m</p>
                </div>
              </div>

              {/* Bus Stop */}
              <div className="flex flex-wrap items-center space-x-2">
                <Bus className="text-yellow-600" size={24} />
                <div>
                  <p className="text-sm font-semibold text-black">Bus Stop</p>
                  <p className="text-xs text-gray-600">300m</p>
                </div>
              </div>

              {/* Restaurant */}
              <div className="flex flex-wrap items-center space-x-2">
                <Utensils className="text-yellow-600" size={24} />
                <div>
                  <p className="text-sm font-semibold text-black">Restaurant</p>
                  <p className="text-xs text-gray-600">400m</p>
                </div>
              </div>
            </div>
          </div>
          {/* location */}
          <div className="bg-[#fdf4eb] p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-black mb-4">Location</h2>

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

            <div className="mt-4 flex gap-4 justify-between">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                <span>💬</span> Send a Message
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                <span>📌</span> Save the Place
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
