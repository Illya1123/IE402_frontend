import React, { useState, useEffect } from "react";

const AdminBookingForm = ({ onSubmit, bookingToEdit, clearEdit }) => {
  const [booking, setBooking] = useState({
    id: "",
    customerName: "",
    tourName: "",
    quantity: "",
    status: "Pending",
  });

  useEffect(() => {
    if (bookingToEdit) {
      setBooking(bookingToEdit);
    }
  }, [bookingToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(booking);
    setBooking({
      id: "",
      customerName: "",
      tourName: "",
      quantity: "",
      status: "Pending",
    });
    if (clearEdit) clearEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative m-4 grid max-w-2xl gap-4 rounded-lg border-b border-l border-r border-t border-gray-200 bg-gray-100 p-8 shadow-lg"
    >
      <input
        type="text"
        name="customerName"
        placeholder="Tên khách hàng"
        value={booking.customerName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="tourName"
        placeholder="Tên tour"
        value={booking.tourName}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Số lượng vé"
        value={booking.quantity}
        onChange={handleChange}
        required
      />
      <select name="status" value={booking.status} onChange={handleChange}>
        <option value="Pending">Tình trạng</option>
        <option value="Paid">Đã thanh toán</option>
        <option value="Cancelled">Đã hủy</option>
      </select>
      <button
        type="submit"
        className="border-2 border-solid border-transparent bg-slate-950 px-2.5 py-1.5 transition-shadow duration-300 ease-[cubic-bezier(0.075,_0.82,_0.165,_1)] focus:outline-none"
      >
        {bookingToEdit ? "Cập nhật" : "Thêm"} Đặt Vé
      </button>
    </form>
  );
};

export default AdminBookingForm;
