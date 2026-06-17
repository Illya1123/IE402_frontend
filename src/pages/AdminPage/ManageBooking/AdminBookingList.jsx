import React, { useState } from "react";

const AdminBookingList = ({ bookings, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customerName.toLowerCase().includes(search.toLowerCase()) ||
      booking.tourName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="min-w-full table-auto rounded-lg bg-white shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-3 text-left">Tên Tài Khoản</th>
            <th className="px-4 py-3 text-left">Tên tour</th>
            <th className="px-4 py-3 text-left">Số lượng</th>
            <th className="px-4 py-3 text-left">Tình trạng</th>
            <th className="px-4 py-3 text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.id} className="border-b">
              <td className="px-4 py-3">{booking.customerName}</td>
              <td className="px-4 py-3">{booking.tourName}</td>
              <td className="px-4 py-3">{booking.quantity}</td>
              <td className="px-4 py-3">{booking.status}</td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onEdit(booking)}
                  className="rounded-md bg-yellow-500 px-4 py-2 text-white"
                >
                  Cập Nhật
                </button>
                <button
                  onClick={() => onDelete(booking.id)}
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
  );
};

export default AdminBookingList;
