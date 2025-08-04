import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
  PanelRightOpen,
  PanelRightClose,
  LogOut,
  Home,
  Users,
  Building2,
  TrendingUp,
  Eye,
  UserPlus,
  DollarSign,
  Activity,
  BarChart3,
  Bell,
  LucideDelete,
  DeleteIcon,
  Delete,
  Trash2,
  Bed,
  BedDouble,
  User,
  Building2Icon,
  HomeIcon,
  ScrollText,
} from "lucide-react"; // Added more icons
import img from "/userLogo.png";
import AdminInfoSkeleton from "./AdminInfoSkeleton";
import { searchApiPost } from "../../api/api";
import { logoutUser } from "../../features/property/LogoutUser/logoutUser";
import toast from "react-hot-toast";
import { CountSkeleton } from "./CountSkeleton";
import { getAllPropertiesData } from "../../features/property/propertyDataSlice";
const AdminInfo = lazy(() => import("./AdminInfo"));
const PropertyLength = lazy(() => import("./PropertyLengthData"));
const UserLengthData = lazy(() => import("./UserLengthData"));
const GetAllUsersData = lazy(() => import("./GetAllUsersData"));
const SoldPropertiesData = lazy(() => import("./SoldPropertiesData"));

const GetAllPropertyData = lazy(() => import("./GetAllPropertyData"));
import { GetAllPropertyDataSekeleton } from "./GetAllPropertyDataSekeleton";
import { UserDataSkeleton } from "./UserDataSkeleton";
import { soldPropertiesData } from "../../features/property/soldPropertySlice";
// import type { userState } from "../../features/property/UserData";

export interface userData {
  createdAt?: string;
  email?: string;
  firstName?: string;
  isAccountVerified: false;
  lastName?: string;
  role?: string;
  _id?: string;
}

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [propertyLength, setIsPropertyLength] = useState<number>(0);
  const [userLength, setIsUserLength] = useState<number>(0);
  const [getAllUserData, setGetAllUserData] = useState<userData[]>([]);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: userData } = useAppSelector((state) => state.userData);
  const { propertiesData, error } = useAppSelector((state) => state.getAllPost);
  const {
    data: { properties, count },
    loading,
    error: soldError,
  } = useAppSelector((state) => state.soldProperty);
  console.log("Properties:", properties);
  console.log("Count:", count);
  useEffect(() => {
    if (!userData || userData.role !== "admin") {
      navigate("/");
    }
  }, [userData, navigate]);

  if (!userData || userData.role !== "admin") {
    return null;
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const fetchPropertyLength = async () => {
      try {
        const response = await searchApiPost.get("/api/getPost");
        // console.log(response.data.count, "property");
        setIsPropertyLength(response.data.count);
      } catch (error) {
        console.error("Error fetching property length:", error);
      }
    };
    fetchPropertyLength();
  }, []);

  useEffect(() => {
    const userLengthData = async () => {
      try {
        const response = await searchApiPost.get<{
          count: number;
          getAllUser: userData[];
        }>("/api/user/getAllUserDetail");
        // console.log(response.data.count, "user");
        // console.log(response.data.getAllUser, "GetAllUser");

        setGetAllUserData(response.data.getAllUser);
        setIsUserLength(response.data.count);
      } catch (error) {
        console.error("Error fetching property length:", error);
      }
    };
    userLengthData();
  }, []);

  useEffect(() => {
    dispatch(getAllPropertiesData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(soldPropertiesData());
  }, [dispatch]);

  if (error) return <div>error</div>;
  if (soldError) return <div>sold Property Error</div>;

  const handleLogout = async () => {
    try {
      dispatch(logoutUser()).unwrap();
      toast.success("Admin logout successfully", {
        duration: 2000,
      });
      navigate("/login");
    } catch (error: any) {
      toast.error("Logout failed:", error);
    }
  };

  const handleRemoveProperty = (id: string) => {
    // Optional: Additional handling if needed
    console.log("Property removed:", id);
  };

  return (
    <div className="h-dvh grid grid-cols-[auto_1fr]">
      {/* Sidebar */}
      <div
        className={`bg-gray-50 rounded-r-md ${
          isCollapsed ? "w-16" : "w-64"
        } transition-[width,padding,margin] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col overflow-hidden`}
      >
        <div
          className={`flex justify-between items-center py-3 cursor-pointer ${
            !isCollapsed ? "px-4" : "px-5"
          }`}
        >
          {!isCollapsed && (
            <div>
              <Building2 size={30} />
            </div>
          )}
          <div
            className={`${
              !isCollapsed ? "p-2" : "p-0"
            } rounded-full hover:bg-gray-200 transition-colors duration-200`}
            onClick={toggleSidebar}
          >
            {isCollapsed ? (
              <PanelRightOpen size={20} className="w-5 h-5" /> // Fixed size
            ) : (
              <PanelRightClose size={20} className="w-5 h-5" /> // Fixed size
            )}
          </div>
        </div>

        <div className="flex flex-col h-full p-2 gap-3">
          {/* Sidebar dashboard */}
          <div
            className={[
              "flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer",
              isCollapsed ? "justify-center" : "",
              activeTab === "dashboard" ? "bg-gray-300" : "",
            ].join(" ")}
            onClick={() => setActiveTab("dashboard")}
          >
            <Home size={20} />
            {!isCollapsed && <span className="ml-2">Dashboard</span>}
          </div>

          {/* Sidebar User */}
          <div
            className={[
              "flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer",
              isCollapsed ? "justify-center" : "",
              activeTab === "user" ? "bg-gray-300" : "",
            ].join(" ")}
            onClick={() => setActiveTab("user")}
          >
            <Users size={20} />
            {!isCollapsed && <span className="ml-2">User</span>}
          </div>

          {/* user property sold */}
          <div
            className={[
              "flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer",
              isCollapsed ? "justify-center" : "",
              activeTab === "sold" ? "bg-gray-300" : "",
            ].join(" ")}
            onClick={() => setActiveTab("sold")}
          >
            <ScrollText size={20} />
            {!isCollapsed && <span className="ml-2">Sold</span>}
          </div>

          {/*  */}
          {/* Add more menu items similarly */}
          <div className="mt-auto mb-4">
            {" "}
            {/* Pushes logout to the bottom */}
            <button
              onClick={handleLogout}
              className={`flex items-center p-2 rounded-lg hover:bg-gray-200 ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="ml-2">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="bg-[#F2F7F8] px-6 py-4 shadow-sm">
        <div className="flex justify-between items-center">
          {/* Left side - Title */}
          <div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">Dashboard</h3>
            </div>
            <Suspense fallback={<AdminInfoSkeleton />}>
              <AdminInfo userData={userData} />
            </Suspense>
          </div>

          {/* Right side - User info */}
          <div className="flex">
            <Link to={"/"}>
              <button className="bg-black p-2 text-white rounded-lg hover:bg-[#323031] border-none outline-none">
                Go to Main Page
              </button>
            </Link>
          </div>
        </div>

        {/*  Property Data */}
        <div className="grid grid-cols-5 py-5 gap-5">
          <div className="bg-[#FFFFFF] rounded-lg shadow-md px-5 p-3 h-[8rem]">
            <div className="flex items-center justify-between">
              <h3 className="text-md text-[#4B5563]">Total Properties</h3>
              <Building2 className="h-4 text-[#67645D]" />
            </div>

            <div className="pt-3">
              <div className="text-2xl font-bold">
                <Suspense fallback={<CountSkeleton />}>
                  <PropertyLength data={propertyLength} />
                </Suspense>
              </div>
            </div>
            {/* <div className="flex gap-2 text-green-600 text-base">
              <TrendingUp className="h-4" /> +3 from last month
            </div> */}
          </div>
          <div className="bg-[#FFFFFF] rounded-lg shadow-md px-5 p-3 h-[8rem]">
            <div className="flex justify-between items-center">
              <h3 className="text-md text-[#4B5563]">Total Users</h3>
              <Users className="h-4 text-green-700 " />
            </div>

            <div className="pt-3">
              <div className="text-2xl font-bold">
                <Suspense fallback={<CountSkeleton />}>
                  <UserLengthData data={userLength} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <div className="bg-white p-6 rounded-lg shadow-sm  max-w-[1500px] overflow-auto h-[40rem] ">
            <h2 className="text-2xl font-semibold mb-6">Active Properties</h2>

            <div className="overflow-x-scroll min-w-[800px] lg:overflow-x-auto">
              <div className="grid grid-cols-12 ">
                <div className="col-span-4 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  Property
                </div>
                <div className="col-span-2 bg-gray-50 p-3 text-sm font-semibold uppercase tracking-wider">
                  Location
                </div>
                <div className="col-span-1 bg-gray-50 p-3 text-sm font-semibold uppercase tracking-wider">
                  Type
                </div>
                <div className="col-span-2 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  Date
                </div>
                <div className="col-span-2 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  Price
                </div>
                <div className="col-span-1 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  Actions
                </div>

                {propertiesData.map((property) => (
                  <Suspense
                    key={property._id}
                    fallback={<GetAllPropertyDataSekeleton />}
                  >
                    <GetAllPropertyData property={property} />
                  </Suspense>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "user" && (
          <div className="bg-white p-6 rounded-lg shadow-sm max-w-[1500px] overflow-auto h-[40rem] ">
            <h2 className="text-2xl font-semibold mb-6">Active Properties</h2>

            <div className="overflow-auto">
              <div className="grid grid-cols-12 min-w-[800px]">
                <div className="col-span-2 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  firstName
                </div>
                <div className="col-span-2 bg-gray-50 p-3 text-sm font-semibold uppercase tracking-wider">
                  lastName
                </div>
                <div className="col-span-4 bg-gray-50 p-3 text-sm font-semibold uppercase tracking-wider">
                  email
                </div>
                <div className="col-span-1 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  role
                </div>
                <div className="col-span-2 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  createdAt
                </div>
                <div className="col-span-1 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  Actions
                </div>

                {getAllUserData.map((data) => (
                  <Suspense key={data._id} fallback={<UserDataSkeleton />}>
                    <GetAllUsersData user={data} />
                  </Suspense>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sold Property */}
        {activeTab === "sold" && (
          <div className="bg-white p-6 rounded-lg shadow-sm  max-w-[1500px] overflow-auto h-[40rem]">
            <h2 className="text-2xl font-semibold mb-6">
              Sold Properties Status
            </h2>

            <div className="overflow-x-scroll min-w-[800px] lg:overflow-x-auto">
              <div className="grid grid-cols-12 ">
                <div className="col-span-3 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  Property
                </div>
                <div className="col-span-2 bg-gray-50 p-3 text-sm font-semibold uppercase tracking-wider">
                  Location
                </div>
                <div className="col-span-1 bg-gray-50 p-3 text-sm font-semibold uppercase tracking-wider">
                  status
                </div>
                <div className="col-span-2 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  Sold-Request
                </div>
                <div className="col-span-2 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  Price
                </div>
                <div className="col-span-2 bg-gray-50 p-3 text-sm font-medium uppercase tracking-wider">
                  Actions
                </div>

                {properties.map((soldProperty) => (
                  <Suspense
                    key={soldProperty._id}
                    fallback={<GetAllPropertyDataSekeleton />}
                  >
                    <SoldPropertiesData
                      property={soldProperty}
                      onRemove={handleRemoveProperty}
                    />
                  </Suspense>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
