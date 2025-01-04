import React, { useState } from "react";
import {
  Layers3,
  Home,
  Plane,
  TicketCheck,
  Locate,
  Route,
  Waypoints,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminPanel = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="bg-white border-r h-screen sticky top-0 flex flex-col">
      {/* Header Section */}
      <div className="items-center justify-center border-b">
        <h2 className="text-xl font-bold px-4">Tour Admin</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {[
            { key: "../admin-dashboard", icon: <Home />, label: "Bảng Điều Khiển" },
            {
              key: "../admin-manage-accounts",
              icon: <Layers3 />,
              label: "Quản Lý Tài Khoản",
            },
            { key: "../admin-manage-tours", icon: <Plane />, label: "Quản Lý Tour" },
            { key: "../admin-manage-destinates", icon: <Locate />, label: "Quản Lý Destinate" },
            { key: "../admin-manage-routes", icon: <Route />, label: "Quản Lý Route" },
            {
              key: "../admin-manage-route_destinates",
              icon: <Waypoints />,
              label: "Quản Lý khởi tạo lộ trình qua các địa điểm",
            },
            { key: "../admin-manage-bookings", icon: <TicketCheck />, label: "Quản Lý Đặt Vé" },
          ].map((item) => (
            <li
              key={item.key}
              className={`${
                activeMenu === item.key
                  ? "bg-blue-100 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveMenu(item.key)}
            >
              <NavLink
                to={item.key}
                className={`flex items-center p-2 rounded cursor-pointer`}
              >
                {React.cloneElement(item.icon, { className: "mr-2" })}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminPanel;
