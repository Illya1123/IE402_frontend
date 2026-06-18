import React, { useState } from "react";
import Swal from "sweetalert2";
import { baseUrl } from "../../../api/index";

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

      const response = await fetch(`${baseUrl}/destinations/create`, {
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
    <div className="flex justify-center gap-2">
      <form
        onSubmit={handleSubmit}
        className="relative m-2 grid gap-0 rounded-lg border-b border-l border-r border-t border-gray-200 bg-gray-100 p-5 shadow-lg"
        style={{ transform: "scale(1)" }}
      >
        <h2 className="mb-2 text-center text-xl font-bold">
          {destinationToEdit ? "Cập nhật Địa Điểm" : "Thêm Địa Điểm Mới"}
        </h2>

        {/* Destination Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tên Địa Điểm
          </label>
          <input
            type="text"
            name="name"
            placeholder="Tên Địa Điểm"
            value={destination.name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <input
            type="text"
            name="description"
            placeholder="Mô tả"
            value={destination.description}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        {/* Open and Close Hours on the same row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giờ Mở Cửa
            </label>
            <input
              type="time"
              name="openHour"
              placeholder="Giờ mở cửa"
              value={destination.openHour}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giờ Đóng Cửa
            </label>
            <input
              type="time"
              name="closeHour"
              placeholder="Giờ đóng cửa"
              value={destination.closeHour}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>

        {/* Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Đánh Giá
          </label>
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
            className="mt-1 w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        {/* Latitude and Longitude on the same row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={destination.latitude}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={destination.longitude}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="border-2 border-solid border-transparent bg-slate-950 px-2.5 py-1 transition-shadow duration-300 ease-[cubic-bezier(0.075,_0.82,_0.165,_1)] focus:outline-none"
        >
          {destinationToEdit ? "Cập nhật" : "Thêm"} Địa Điểm
        </button>
      </form>
    </div>
  );
};

export default AdminDestinateForm;
