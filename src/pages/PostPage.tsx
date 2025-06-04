import { useState, useRef } from "react";
import type { ChangeEvent } from "react";

interface FormData {
  location: string;
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
  incomePolicy: string;
  totalSize: number;
  school: string;
  images: File[];
  previewImages: string[];
}

const PostPage = () => {
  const [formData, setFormData] = useState<FormData>({
    location: "",
    title: "",
    price: 0,
    address: "",
    description: "",
    city: "",
    bedroomNumber: 0,
    bathroomNumber: 0,
    latitude: 0,
    longitude: 0,
    type: "Rent",
    property: "Apartment",
    utilitiesPolicy: "Owner is responsible",
    petPolicy: "Allowed",
    incomePolicy: "",
    totalSize: 0,
    school: "",
    images: [],
    previewImages: [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previews = files.map((file) => URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
        previewImages: [...prev.previewImages, ...previews],
      }));
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    const newPreviews = [...formData.previewImages];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setFormData({
      ...formData,
      images: newImages,
      previewImages: newPreviews,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Upload images to Cloudinary first
      const cloudinaryUrls = await Promise.all(
        formData.images.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "SocietyManagementSystem"); // Replace with your upload preset

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dwubwj9in/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          return data.secure_url;
        })
      );

      // Prepare the final data to send to your backend
      const postData = {
        location: formData.location,
        title: formData.title,
        price: formData.price,
        address: formData.address,
        description: formData.description,
        city: formData.city,
        bedroomNumber: formData.bedroomNumber,
        bathroomNumber: formData.bathroomNumber,
        latitude: formData.latitude,
        longitude: formData.longitude,
        type: formData.type,
        property: formData.property,
        utilitiesPolicy: formData.utilitiesPolicy,
        petPolicy: formData.petPolicy,
        incomePolicy: formData.incomePolicy,
        totalSize: formData.totalSize,
        school: formData.school,
        images: cloudinaryUrls,
      };

      // Send to your backend
      const response = await fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert("Post created successfully!");
        // Reset form or redirect
      } else {
        throw new Error("Failed to create post");
      }
      console.log(formData);
      console.log("Sending to backend:", JSON.stringify(postData, null, 2)); ///
    } catch (error: any) {
      console.error("Full error:", error);
      console.error("Error response:", await error.response?.text());
      alert("Error creating post. Please try again.");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Form (8 cols on lg screens) */}
      <div className="space-y-8 col-span-1 lg:col-span-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          Add New Post
        </h1>
        <div className="grid grid-cols-12 gap-4">
          <label
            htmlFor="location"
            className="col-span-12 text-2xl md:text-3xl font-semibold text-gray-800"
          >
            Location
          </label>
          <div className="col-span-12">
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter Location"
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
            />
          </div>
        </div>
        {/* Top Row - Title, Price, Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Enter property title"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Enter price"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Enter full address"
            />
          </div>
        </div>

        {/* Description Section with Rich Text Editor */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border outline-none rounded-lg p-2 min-h-40 w-full resize-none"
          ></textarea>
        </div>

        {/* Second Row - City, Bedrooms, Bathrooms */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-2">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Enter city"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="bedroomNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Bedroom Number
            </label>
            <input
              type="number"
              id="bedroomNumber"
              name="bedroomNumber"
              value={formData.bedroomNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Number of bedrooms"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="bathroomNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Bathroom Number
            </label>
            <input
              type="number"
              id="bathroomNumber"
              name="bathroomNumber"
              value={formData.bathroomNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Number of bathrooms"
            />
          </div>
        </div>

        {/* Third Row - Latitude, Longitude, Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-2">
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude
            </label>
            <input
              type="number"
              step="any"
              id="latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Enter latitude"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <input
              type="number"
              step="any"
              id="longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Enter longitude"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
            >
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
              <option value="Lease">Lease</option>
            </select>
          </div>
        </div>

        {/* Fourth Row - Property, Utilities Policy, Pet Policy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-2">
            <label
              htmlFor="property"
              className="block text-sm font-medium text-gray-700"
            >
              Property
            </label>
            <select
              id="property"
              name="property"
              value={formData.property}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
            >
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Studio">Studio</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="utilitiesPolicy"
              className="block text-sm font-medium text-gray-700"
            >
              Utilities Policy
            </label>
            <select
              id="utilitiesPolicy"
              name="utilitiesPolicy"
              value={formData.utilitiesPolicy}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
            >
              <option value="Owner is responsible">Owner is responsible</option>
              <option value="Tenant is responsible">
                Tenant is responsible
              </option>
              <option value="Split responsibility">Split responsibility</option>
              <option value="Included in rent">Included in rent</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="petPolicy"
              className="block text-sm font-medium text-gray-700"
            >
              Pet Policy
            </label>
            <select
              id="petPolicy"
              name="petPolicy"
              value={formData.petPolicy}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
            >
              <option value="Allowed">Allowed</option>
              <option value="Not allowed">Not allowed</option>
              <option value="Cats only">Cats only</option>
              <option value="Dogs only">Dogs only</option>
              <option value="With deposit">With deposit</option>
            </select>
          </div>
        </div>

        {/* Fifth Row - Income Policy, Total Size, School */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-2">
            <label
              htmlFor="incomePolicy"
              className="block text-sm font-medium text-gray-700"
            >
              Income Policy
            </label>
            <input
              type="text"
              id="incomePolicy"
              name="incomePolicy"
              value={formData.incomePolicy}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Enter income requirements"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="totalSize"
              className="block text-sm font-medium text-gray-700"
            >
              Total Size (sqft)
            </label>
            <input
              type="number"
              id="totalSize"
              name="totalSize"
              value={formData.totalSize}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Property size in sqft"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="school"
              className="block text-sm font-medium text-gray-700"
            >
              School
            </label>
            <input
              type="text"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Nearby school district"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 md:px-8 md:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Create Post
          </button>
        </div>
      </div>

      {/* Right Column - Image Upload (4 cols on lg screens) */}
      <div className="col-span-1 lg:col-span-4 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Property Images
          </h2>

          {/* Image Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              multiple
              accept="image/*"
            />
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="mt-1 text-sm text-gray-600">
              Click to upload images or drag and drop
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>

          {/* Image Previews */}
          {formData.previewImages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {formData.previewImages.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Sidebar Content */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Posting Guidelines</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Provide accurate and detailed information</li>
            <li>• Upload clear, high-quality photos</li>
            <li>• Set a reasonable price based on market rates</li>
            <li>• Be responsive to inquiries</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
