import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw]  text-gray-800 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold ">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-light-brown hover:bg-light-brown-100 text-white font-medium py-2 px-4 rounded"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};
