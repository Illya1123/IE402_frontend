import React, { useState } from "react";
import AdminBookingForm from "./AdminBookingForm";
import AdminBookingList from "./AdminBookingList";

import AdminPanel from '../AdminPanel';

const AdminManageTickets = () => {
    const [bookings, setBookings] = useState([]);
    const [bookingToEdit, setBookingToEdit] = useState(null);
  
    const addOrUpdateBooking = (booking) => {
      if (bookingToEdit) {
        setBookings(
          bookings.map((b) => (b.id === bookingToEdit.id ? { ...b, ...booking } : b))
        );
      } else {
        setBookings([
          ...bookings,
          { ...booking, id: Math.random().toString(36).substr(2, 9) },
        ]);
      }
      setBookingToEdit(null);
    };
  
    const deleteBooking = (id) => {
      setBookings(bookings.filter((booking) => booking.id !== id));
    };
  
    const editBooking = (booking) => {
      setBookingToEdit(booking);
    };

    return (
        <div className="flex h-[1000px]">
            <div className="h-screen w-1/4">
                <AdminPanel />
            </div>     
            <div className="w-3/4 h-screen flex-1 text-start text-xl space-y-4">     
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Quản lý đặt vé</h1>
                <AdminBookingForm
                    onSubmit={addOrUpdateBooking}
                    bookingToEdit={bookingToEdit}
                    clearEdit={() => setBookingToEdit(null)}
                />
                <AdminBookingList bookings={bookings} onEdit={editBooking} onDelete={deleteBooking} />
            </div>  
        </div>
    )
}

export default AdminManageTickets