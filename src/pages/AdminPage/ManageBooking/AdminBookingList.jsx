import React, { useState } from "react";

const AdminBookingList = ({ bookings, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customerName.toLowerCase().includes(search.toLowerCase()) ||
      booking.tourName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
    <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
    <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
        <thead>
        <tr className="bg-gray-200">
            <th className="py-3 px-4 text-left">Tên Tài Khoản</th>
            <th className="py-3 px-4 text-left">Tên tour</th>
            <th className="py-3 px-4 text-left">Số lượng</th>
            <th className="py-3 px-4 text-left">Tình trạng</th>
            <th className="py-3 px-4 text-center">Hành Động</th>
        </tr>
        </thead>
        <tbody>
        {filteredBookings.map((booking) => (
            <tr key={booking.id} className="border-b">
            <td className="py-3 px-4">{booking.customerName}</td>
            <td className="py-3 px-4">{booking.tourName}</td>
            <td className="py-3 px-4">{booking.quantity}</td>
            <td className="py-3 px-4">{booking.status}</td>
            <td className="py-3 px-4 text-center">
                <button
                    onClick={() => onEdit(booking)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                >
                Cập Nhật
                </button>
                <button
                    onClick={() => onDelete(booking.id)}
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
  );
};

export default AdminBookingList;
