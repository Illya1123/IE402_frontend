import React, { useState, useEffect } from "react";
import { baseUrl } from "../../../api/index";

const AdminDestinateList = ({ onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${baseUrl}/destinations/getAll`);
        const result = await response.json();

        if (result.status === "success") {
          setDestinations(result.data);
        } else {
          console.error("Failed to fetch destinations");
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(search.toLowerCase()) ||
      destination.description.toLowerCase().includes(search.toLowerCase()) ||
      destination.rate.toLowerCase().includes(search.toLowerCase()) ||
      destination.openHour.includes(search) ||
      destination.closeHour.includes(search),
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
      {/* Bao quanh bảng với một div để thêm cuộn */}
      <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-300 shadow-md">
        <table className="min-w-full table-auto bg-white">
          <thead className="sticky top-0 z-10 bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Tên Địa Điểm</th>
              <th className="px-4 py-3 text-left">Mô Tả</th>
              <th className="px-4 py-3 text-center">Giờ Mở Cửa</th>
              <th className="px-4 py-3 text-center">Giờ Đóng Cửa</th>
              <th className="px-4 py-3 text-center">Đánh Giá</th>
              <th className="px-4 py-3 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredDestinations.map((destination) => (
              <tr key={destination.id} className="border-b">
                <td className="px-4 py-3">{destination.name}</td>
                <td className="px-4 py-3">{destination.description}</td>
                <td className="px-4 py-3 text-center">
                  {destination.openHour}
                </td>
                <td className="px-4 py-3 text-center">
                  {destination.closeHour}
                </td>
                <td className="px-4 py-3 text-center">{destination.rate}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onEdit(destination)}
                    className="rounded-md bg-yellow-500 px-4 py-2 text-white"
                  >
                    Cập Nhật
                  </button>
                  <button
                    onClick={() => onDelete(destination.id)}
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

export default AdminDestinateList;
