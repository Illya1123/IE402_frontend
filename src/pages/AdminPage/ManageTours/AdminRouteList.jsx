import React, { useState, useEffect } from "react";
import { baseUrl } from "../../../api/index";

const AdminRouteList = ({ onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch(`${baseUrl}/routes/get-all-routes`);
        const result = await response.json();

        if (result.status === "success") {
          setRoutes(result.data);
        } else {
          console.error("Failed to fetch routes");
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(search.toLowerCase()) ||
      route.description.toLowerCase().includes(search.toLowerCase()) ||
      route.startLatitude.includes(search) ||
      route.startLongitude.includes(search) ||
      route.endLatitude.includes(search) ||
      route.endLongitude.includes(search),
  );

  return (
    <>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-md border p-2"
      />
      <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-300 shadow-md">
        <table className="min-w-full table-auto rounded-lg bg-white shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-3 text-left">Tên Tuyến Đường</th>
              <th className="px-4 py-3 text-left">Mô Tả</th>
              <th className="px-4 py-3 text-center">Chiều Dài (km)</th>
              <th className="px-4 py-3 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((route) => (
              <tr key={route.id} className="border-b">
                <td className="px-4 py-3">{route.name}</td>
                <td className="px-4 py-3">{route.description}</td>
                <td className="px-4 py-3 text-center">
                  {parseFloat(route.length).toFixed(1)}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onEdit(route)}
                    className="rounded-md bg-yellow-500 px-4 py-2 text-white"
                  >
                    Cập Nhật
                  </button>
                  <button
                    onClick={() => onDelete(route.id)}
                    className="ml-2 rounded-md bg-red-500 px-4 py-2 text-white"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminRouteList;
