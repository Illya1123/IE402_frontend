import React, { useState, useEffect } from "react";

const AdminDestinateList = ({ onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:5000/destinations/getAll");
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
      destination.closeHour.includes(search)
  );

  return (
    <>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      {/* Bao quanh bảng với một div để thêm cuộn */}
      <div className="max-h-80 overflow-y-auto rounded-lg shadow-md border border-gray-300">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left">Tên Địa Điểm</th>
              <th className="py-3 px-4 text-left">Mô Tả</th>
              <th className="py-3 px-4 text-center">Giờ Mở Cửa</th>
              <th className="py-3 px-4 text-center">Giờ Đóng Cửa</th>
              <th className="py-3 px-4 text-center">Đánh Giá</th>
              <th className="py-3 px-4 text-center">Vĩ Độ</th>
              <th className="py-3 px-4 text-center">Kinh Độ</th>
              <th className="py-3 px-4 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredDestinations.map((destination) => (
              <tr key={destination.id} className="border-b">
                <td className="py-3 px-4">{destination.name}</td>
                <td className="py-3 px-4">{destination.description}</td>
                <td className="py-3 px-4 text-center">{destination.openHour}</td>
                <td className="py-3 px-4 text-center">{destination.closeHour}</td>
                <td className="py-3 px-4 text-center">{destination.rate}</td>
                <td className="py-3 px-4 text-center">{destination.latitude}</td>
                <td className="py-3 px-4 text-center">{destination.longitude}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onEdit(destination)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  >
                    Cập Nhật
                  </button>
                  <button
                    onClick={() => onDelete(destination.id)}
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

export default AdminDestinateList;
