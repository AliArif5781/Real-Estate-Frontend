// interface userData {
//   createdAt?: string;
//   email?: string;
//   firstName?: string;
//   isAccountVerified?: false;
//   lastName?: string;
//   role?: string;
//   updatedAt?: string;
//   _id?: string;

import { Trash2 } from "lucide-react";
import type { userData } from "./Dashboard";
import { useEffect, useState } from "react";
import { searchApiPost } from "../../api/api";
import toast from "react-hot-toast";
import { useAppDispatch } from "../../app/hook";
import { deleteUser } from "../../features/user/deleteUserSlice";

interface userDataProps {
  user: userData;
}
const GetAllUsersData = ({ user }: userDataProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (!user._id) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
    );

    if (confirmDelete) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div className="contents">
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center truncate">
        <h3>{user.firstName}</h3>
      </div>
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center truncate">
        <h3>{user.lastName}</h3>
      </div>
      <div className="col-span-4 p-3 border-b border-gray-200 flex items-center  ">
        <span className={`p-1 rounded-lg text-md `}>{user.email}</span>
      </div>
      <div className="col-span-1 p-3 border-b border-gray-200 flex items-center  text-gray-700">
        <span
          className={`p-1 rounded-lg text-sm font-medium ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {user.role}
        </span>
      </div>
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center text-sm">
        {user.createdAt
          ? new Date(user?.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "N/A"}
      </div>
      <button
        disabled={isDeleting}
        className="col-span-1 p-3 border-b border-gray-200 flex pl-8 items-center gap-3"
      >
        <Trash2
          className={`text-red-600 hover:text-red-800 cursor-pointer ${
            isDeleting ? "opacity-50" : ""
          }`}
          onClick={handleDelete}
          aria-label="Delete user"
        />
        {isDeleting && (
          <span className="text-sm text-gray-500">
            <Trash2 />
          </span>
        )}
      </button>
    </div>
  );
};
export default GetAllUsersData;
