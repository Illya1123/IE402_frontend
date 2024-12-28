import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AdminRouteDestinatesForm = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState("");

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await fetch("https://ie402-backend.onrender.com/routes/get-all-routes");
        const result = await response.json();

        if (result.status === "success") {
          setRoutes(result.data);
        } else {
          console.error("Failed to fetch routes");
        }
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRouteId) {
      Swal.fire({
        title: "Error!",
        text: "Please select a route.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = { route_id: selectedRouteId };

      const response = await fetch(`https://ie402-backend.onrender.com/routes/${selectedRouteId}/destinations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("API Response:", response);

      if (response && response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Route destinates created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        setSelectedRouteId("");
      } else {
        throw new Error("Failed to create route destinates");
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
        className="grid gap-6 bg-gray-100 p-12 m-4 rounded-lg shadow-lg border-t border-l border-r border-b border-gray-200"
        style={{ transform: "scale(1)" }}
      >
        <h2 className="text-xl font-bold text-center mb-4">Thêm Địa Điểm Vào Tuyến Đường</h2>

        <select
          name="route"
          value={selectedRouteId}
          onChange={(e) => setSelectedRouteId(e.target.value)}
          required
        >
          <option value="">Chọn Tuyến Đường</option>
          {routes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-slate-950 px-2.5 py-1.5 border-2 border-solid border-transparent focus:outline-none transition-shadow duration-300 ease-[cubic-bezier(0.075,_0.82,_0.165,_1)]"
        >
          Gửi Dữ Liệu
        </button>
      </form>
    </div>
  );
};

export default AdminRouteDestinatesForm;
