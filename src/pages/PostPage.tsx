import { useState, useRef, useMemo } from "react";
import type { ChangeEvent } from "react";
import { Loader } from "../components/Loader";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/hook";
import {
  removeImage,
  resetForm,
  setImages,
  updateField,
} from "../features/property/postSlice";
import { searchApiPost } from "../api/api";

export const PostPage = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.post);
  const [loading, setLoading] = useState(false);

  const imagePreviews = useMemo(
    () => formData.previewImages,
    [formData.previewImages]
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name as keyof typeof formData, value }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    // 1. Create previews (Base64)
    const previews = await Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      )
    );

    // 2. Upload to Cloudinary and get URLs
    const uploadResults = await Promise.all(
      files.map((file) => uploadToCloudinary(file))
    );
    const urls = uploadResults.map((res) => res.secure_url);

    // 3. Save URLs to Redux
    dispatch(setImages({ urls, previews }));
  };

  const handleRemoveImage = (index: number) => {
    dispatch(removeImage(index));
  };

  // Memoized Cloudinary upload function
  const uploadToCloudinary = useMemo(
    () => async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "SocietyManagementSystem");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwubwj9in/image/upload",
        { method: "POST", body: formData }
      );
      return res.json();
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Verify we have all required data
      if (!formData.images.length) {
        throw new Error("Please upload at least one image");
      }

      // 2. Prepare the post data - images are already URLs at this point
      const postData = {
        title: formData.title,
        price: Number(formData.price),
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
        Kitchen: formData.Kitchen,
        totalSize: formData.totalSize,
        school: formData.school,
        images: formData.images, // Already contains Cloudinary URLs
        // previewImages: formData.previewImages, // If needed by backend
        BusStop: formData.BusStop,
        Resturant: formData.Resturant,
        LoadShedding: formData.LoadShedding,
        Water: formData.Water,
        Gas: formData.Gas,
        Best: formData.Best,
      };

      // 3. Send to backend
      const response = await searchApiPost.post("/api/post", postData);

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(response.data.message || "Failed to create post");
      }

      // 4. Show success and reset form
      toast.success("Post created successfully!");
      dispatch(resetForm());

      // Optional: Clear any temporary preview URLs
      formData.previewImages.forEach((preview) => {
        if (preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    } catch (error: any) {
      console.error("Submission error:", error);

      // Enhanced error handling
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create post";
      toast.error(errorMessage);

      // Optional: Rollback image uploads if post fails
      if (formData.images.length) {
        // You might want to add logic to delete uploaded images from Cloudinary
        // if the post creation fails
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column - Form (8 cols on lg screens) */}
      <div className="space-y-8 col-span-1 lg:col-span-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          Add New Post
        </h1>
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
              htmlFor="Kitchen"
              className="block text-sm font-medium text-gray-700"
            >
              Kitchen
            </label>
            <input
              type="number"
              id="Kitchen"
              name="Kitchen"
              value={formData.Kitchen}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Enter Kitchen"
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
              type="number"
              id="school"
              name="school"
              value={formData.school}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Nearby school in meter"
            />
          </div>
        </div>

        {/* Six */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-2">
            <label
              htmlFor="BusStop"
              className="block text-sm font-medium text-gray-700"
            >
              BusStop
            </label>
            <input
              type="number"
              id="BusStop"
              name="BusStop"
              value={formData.BusStop}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="BusStop in meter"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="Resturant"
              className="block text-sm font-medium text-gray-700"
            >
              Resturant
            </label>
            <input
              type="number"
              id="Resturant"
              name="Resturant"
              value={formData.Resturant}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Resturant in meter"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="LoadShedding"
              className="block text-sm font-medium text-gray-700"
            >
              Load Shedding
            </label>
            <input
              type="text"
              id="LoadShedding"
              name="LoadShedding"
              value={formData.LoadShedding}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Load Shedding Schedule"
            />
          </div>
        </div>

        {/* Seven */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="space-y-2">
            <label
              htmlFor="Water"
              className="block text-sm font-medium text-gray-700"
            >
              Water Shortage
            </label>
            <input
              type="text"
              id="Water"
              name="Water"
              value={formData.Water}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Water Schedule"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="Gas"
              className="block text-sm font-medium text-gray-700"
            >
              Gas Shortage
            </label>
            <input
              type="text"
              id="Gas"
              name="Gas"
              value={formData.Gas}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Gas Schedule"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="Best"
              className="block text-sm font-medium text-gray-700"
            >
              Best Option
            </label>
            <input
              type="text"
              id="Best"
              name="Best"
              value={formData.Best}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border outline-none rounded-lg"
              placeholder="Best Option"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`px-6 py-2 md:px-8 md:py-3 bg-black text-white font-medium rounded-lg focus:ring-2 focus:ring-black/20 focus:ring-offset-2 transition-colors ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-black/80"
            }`}
          >
            {loading ? <Loader /> : "Create Post"}
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
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-black transition-colors duration-300"
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
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
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
