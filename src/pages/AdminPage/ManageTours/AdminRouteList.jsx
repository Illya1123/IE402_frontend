import React, { useState, useEffect } from "react";

const AdminRouteList = ({ onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("https://ie402-backend.onrender.com/routes/get-all-routes");
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
      route.endLongitude.includes(search)
  );

  return (
    <>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded-md"
      />
      <div className="max-h-80 overflow-y-auto rounded-lg shadow-md border border-gray-300">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left">Tên Tuyến Đường</th>
              <th className="py-3 px-4 text-left">Mô Tả</th>
              <th className="py-3 px-4 text-center">Vĩ Độ Bắt Đầu</th>
              <th className="py-3 px-4 text-center">Kinh Độ Bắt Đầu</th>
              <th className="py-3 px-4 text-center">Vĩ Độ Kết Thúc</th>
              <th className="py-3 px-4 text-center">Kinh Độ Kết Thúc</th>
              <th className="py-3 px-4 text-center">Chiều Dài (km)</th>
              <th className="py-3 px-4 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((route) => (
              <tr key={route.id} className="border-b">
                <td className="py-3 px-4">{route.name}</td>
                <td className="py-3 px-4">{route.description}</td>
                <td className="py-3 px-4 text-center">{route.startLatitude}</td>
                <td className="py-3 px-4 text-center">{route.startLongitude}</td>
                <td className="py-3 px-4 text-center">{route.endLatitude}</td>
                <td className="py-3 px-4 text-center">{route.endLongitude}</td>
                <td className="py-3 px-4 text-center">{parseFloat(route.length).toFixed(1)}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onEdit(route)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  >
                    Cập Nhật
                  </button>
                  <button
                    onClick={() => onDelete(route.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
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
