import React, { useState } from "react";
import Swal from "sweetalert2";

const AdminDestinateForm = ({ onSubmit, destinationToEdit, clearEdit }) => {
  const [destination, setDestination] = useState({
    name: "",
    description: "",
    openHour: "",
    closeHour: "",
    rate: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestination({ ...destination, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const destinationData = {
        name: destination.name,
        description: destination.description,
        openHour: destination.openHour,
        closeHour: destination.closeHour,
        rate: destination.rate,
        latitude: destination.latitude,
        longitude: destination.longitude,
      };

      const token = localStorage.getItem("token");

      const response = await fetch("https://ie402-backend.onrender.com/destinations/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(destinationData),
      });

      if (response && response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Destination added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        setDestination({
          name: "",
          description: "",
          openHour: "",
          closeHour: "",
          rate: "",
          latitude: "",
          longitude: "",
        });

        if (clearEdit) clearEdit();
        window.location.reload();
      } else {
        throw new Error("Failed to add destination");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative grid gap-6 bg-gray-100 p-12 m-4 rounded-lg shadow-lg border-t border-l border-r border-b border-gray-200"
        style={{ transform: "scale(1.1)" }} // Zoom effect
      >
        <h2 className="text-xl font-bold text-center mb-4">
          {destinationToEdit ? "Cập nhật Địa Điểm" : "Thêm Địa Điểm Mới"}
        </h2>
        
        <input
          type="text"
          name="name"
          placeholder="Tên Địa Điểm"
          value={destination.name}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="description"
          placeholder="Mô tả"
          value={destination.description}
          onChange={handleChange}
          required
        />
        
        <input
          type="time"
          name="openHour"
          placeholder="Giờ mở cửa"
          value={destination.openHour}
          onChange={handleChange}
          required
        />
        
        <input
          type="time"
          name="closeHour"
          placeholder="Giờ đóng cửa"
          value={destination.closeHour}
          onChange={handleChange}
          required
        />
        
        <input
          type="number"
          name="rate"
          placeholder="Đánh giá"
          value={destination.rate}
          onChange={handleChange}
          required
          min="0"
          max="5"
          step="1"
        />
        
        <input
          type="text"
          name="latitude"
          placeholder="latitude"
          value={destination.latitude}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="longitude"
          placeholder="longitude"
          value={destination.longitude}
          onChange={handleChange}
          required
        />
        
        <button
          type="submit"
          className="bg-slate-950 px-2.5 py-1.5 border-2 border-solid border-transparent focus:outline-none transition-shadow duration-300 ease-[cubic-bezier(0.075,_0.82,_0.165,_1)]"
        >
          {destinationToEdit ? "Cập nhật" : "Thêm"} Địa Điểm
        </button>
      </form>
    </div>
  );
};

export default AdminDestinateForm;
