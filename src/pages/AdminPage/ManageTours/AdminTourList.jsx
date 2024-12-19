import React, { useState, useEffect } from "react";

const AdminTourList = ({ onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:5000/tours/getAllTour");
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
      tour.tourType.toLowerCase().includes(search.toLowerCase())
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
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      {/* Div chứa bảng thêm cuộn dọc */}
      <div className="max-h-80 overflow-y-auto rounded-lg shadow-md border border-gray-300">
        <table className="min-w-full table-auto bg-white">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-4 text-left">Tên Tour</th>
              <th className="py-3 px-4 text-left">Mô Tả</th>
              <th className="py-3 px-4 text-center">Giá</th>
              <th className="py-3 px-4 text-center">Loại Tour</th>
              <th className="py-3 px-4 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {filteredTours.map((tour) => (
              <tr key={tour.id} className="border-b">
                <td className="py-3 px-4">{tour.tourName}</td>
                <td className="py-3 px-4">{tour.description}</td>
                <td className="py-3 px-4 text-center">{formatCurrency(tour.price)}</td>
                <td className="py-3 px-4 text-center">{tour.tourType}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onEdit(tour)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  >
                    Cập Nhật
                  </button>
                  <button
                    onClick={() => onDelete(tour.id)}
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

export default AdminTourList;
