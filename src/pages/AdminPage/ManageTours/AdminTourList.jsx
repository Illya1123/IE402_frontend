import React, { useState } from "react";

const AdminTourList = ({ tours, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const filteredTours = tours.filter(
    (tour) =>
      tour.destTitle.toLowerCase().includes(search.toLowerCase()) ||
      tour.location.toLowerCase().includes(search.toLowerCase())  ||
      tour.grade.toLowerCase().includes(search.toLowerCase())  ||
      tour.fees.includes(search)  ||
      tour.description.toLowerCase().includes(search.toLowerCase())  ||
      tour.duration.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
    <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
        <thead>
        <tr className="bg-gray-200">
            <th className="py-3 px-4 text-left">Địa điểm</th>
            <th className="py-3 px-4 text-center">Chi phí</th>
            <th className="py-3 px-4 text-center">Lịch trình</th>
            <th className="py-3 px-4 text-center">Hành động</th>
        </tr>
        </thead>
        <tbody>
        {filteredTours.map((tour) => (
            <tr key={tour.id} className="border-b">
            <td className="py-3 px-4">{tour.location}</td>
            <td className="py-3 px-4">{tour.fees}</td>
            <td className="py-3 px-4">{tour.duration}</td>
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
</>
  );
};

export default AdminTourList;
