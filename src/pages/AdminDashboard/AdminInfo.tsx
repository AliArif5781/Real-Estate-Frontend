import type { userState } from "../../features/property/UserData";

interface AdminInfoProps {
  userData?: userState;
}
const AdminInfo = ({ userData }: AdminInfoProps) => {
  return (
    <div className="my-2">
      <span className=" text-[#4B5563]">
        {" "}
        Welcome back, {userData?.firstName} {userData?.lastName}
      </span>
    </div>
  );
};

export default AdminInfo;
