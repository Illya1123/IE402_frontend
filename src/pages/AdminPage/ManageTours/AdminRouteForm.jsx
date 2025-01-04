import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { baseUrl } from "../../../api/index";

const AdminRouteForm = ({ onSubmit, routeToEdit, clearEdit }) => {
  const [destinations, setDestinations] = useState([]);
  const [route, setRoute] = useState({
    name: "",
    description: "",
    startLatitude: "",
    startLongitude: "",
    endLatitude: "",
    endLongitude: "",
    startLocationId: "",
    endLocationId: "",
  });

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${baseUrl}/destinations/getAll`);
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

  useEffect(() => {
    if (route.startLocationId && route.endLocationId) {
      const startDestination = destinations.find(
        (destination) => destination.id === route.startLocationId
      );
      const endDestination = destinations.find(
        (destination) => destination.id === route.endLocationId
      );

      if (startDestination && endDestination) {
        setRoute((prevRoute) => ({
          ...prevRoute,
          name: `${startDestination.name} - ${endDestination.name}`,
        }));
      }
    }
  }, [route.startLocationId, route.endLocationId, destinations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute({ ...route, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (route.startLocationId === route.endLocationId) {
      Swal.fire({
        title: "Error!",
        text: "The start and end locations must be different.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const fetchLocationDetails = async (locationId) => {
        const response = await fetch(`${baseUrl}/destinations/get/${locationId}`);
        const result = await response.json();
        if (result.status === "success") {
          return result.data;
        }
        throw new Error("Failed to fetch destination details");
      };

      const startDestination = await fetchLocationDetails(route.startLocationId);
      const endDestination = await fetchLocationDetails(route.endLocationId);

      const routeData = {
        name: route.name,
        description: route.description,
        startLatitude: startDestination.latitude,
        startLongitude: startDestination.longitude,
        endLatitude: endDestination.latitude,
        endLongitude: endDestination.longitude,
      };

      console.log(routeData);

      const token = localStorage.getItem("token");

      const response = await fetch(`${baseUrl}/routes/create-route`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routeData),
      });

      if (response && response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Route added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        setRoute({
          name: "",
          description: "",
          startLatitude: "",
          startLongitude: "",
          endLatitude: "",
          endLongitude: "",
          startLocationId: "",
          endLocationId: "",
        });

        if (clearEdit) clearEdit();
        window.location.reload();
      } else {
        throw new Error("Failed to add route");
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

  const handleLocationChange = (e, type) => {
    const selectedDestinationId = e.target.value;
    setRoute({
      ...route,
      [type]: selectedDestinationId,
    });
  };

  return (
    <div className="flex gap-2 justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative grid gap-6 bg-gray-100 p-12 m-4 rounded-lg shadow-lg border-t border-l border-r border-b border-gray-200"
        style={{ transform: "scale(1)" }}
      >
        <h2 className="text-xl font-bold text-center mb-4">
          {routeToEdit ? "Cập nhật Tuyến đường" : "Thêm Tuyến đường Mới"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Tên Tuyến Đường"
          value={route.name}
          onChange={handleChange}
          disabled
        />

        <input
          type="text"
          name="description"
          placeholder="Mô tả"
          value={route.description}
          onChange={handleChange}
          required
        />

        <select
          name="startLocationId"
          value={route.startLocationId}
          onChange={(e) => handleLocationChange(e, "startLocationId")}
          required
        >
          <option value="">Chọn Địa Điểm Bắt Đầu</option>
          {destinations.map((destination) => (
            <option key={destination.id} value={destination.id}>
              {destination.name}
            </option>
          ))}
        </select>

        <select
          name="endLocationId"
          value={route.endLocationId}
          onChange={(e) => handleLocationChange(e, "endLocationId")}
          required
        >
          <option value="">Chọn Địa Điểm Kết Thúc</option>
          {destinations.map((destination) => (
            <option key={destination.id} value={destination.id}>
              {destination.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-slate-950 px-2.5 py-1.5 border-2 border-solid border-transparent focus:outline-none transition-shadow duration-300 ease-[cubic-bezier(0.075,_0.82,_0.165,_1)]"
        >
          {routeToEdit ? "Cập nhật" : "Thêm"} Tuyến Đường
        </button>
      </form>
    </div>
  );
};

export default AdminRouteForm;
