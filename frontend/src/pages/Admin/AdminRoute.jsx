import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar/Sidebar";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <>
    <Sidebar/>
    <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default AdminRoute;
