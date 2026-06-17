import React, { useState, useEffect } from "react";
import { baseUrl } from "../../../api/index";

const AdminTourList = ({ onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${baseUrl}/tours/getAllTour`);
        const result = await response.json();

        if (result.status === "success") {
          setTours(result.data);
        } else {
          console.error("Failed to fetch tours");
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  const filteredTours = tours.filter(
    (tour) =>
      tour.tourName.toLowerCase().includes(search.toLowerCase()) ||
      tour.description.toLowerCase().includes(search.toLowerCase()) ||
      tour.price.toString().includes(search) ||
      tour.tourType.toLowerCase().includes(search.toLowerCase()),
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-md border p-2"
      />
      {/* Div chứa bảng thêm cuộn dọc */}
      <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-300 shadow-md">
        <table className="min-w-full table-auto bg-white">
          <thead className="sticky top-0 z-10 bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Tên Tour</th>
              <th className="px-4 py-3 text-left">Mô Tả</th>
              <th className="px-4 py-3 text-center">Giá</th>
              <th className="px-4 py-3 text-center">Loại Tour</th>
              <th className="px-4 py-3 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredTours.map((tour) => (
              <tr key={tour.id} className="border-b">
                <td className="px-4 py-3">{tour.tourName}</td>
                <td className="px-4 py-3">{tour.description}</td>
                <td className="px-4 py-3 text-center">
                  {formatCurrency(tour.price)}
                </td>
                <td className="px-4 py-3 text-center">{tour.tourType}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onEdit(tour)}
                    className="rounded-md bg-yellow-500 px-4 py-2 text-white"
                  >
                    Cập Nhật
                  </button>
                  <button
                    onClick={() => onDelete(tour.id)}
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

export default AdminTourList;
