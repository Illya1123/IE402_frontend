import React, { useState, useEffect } from "react";
import { baseUrl } from "../../../api/index";

const AdminRouteDestinationsList = ({ onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/routes/get-all-route-destinations`,
        );
        const result = await response.json();

        if (result.status === "success") {
          setDestinations(result.data);
        } else {
          console.error("Failed to fetch route destinations");
        }
      } catch (error) {
        console.error("Error fetching route destinations:", error);
      }
    };

    const fetchTours = async () => {
      try {
        const response = await fetch(`${baseUrl}/tours/getAllTour`);
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

    fetchDestinations();
    fetchTours();
  }, []);

  const filteredDestinations = destinations.filter(
    (destination) =>
      (destination.route_id.toLowerCase().includes(search.toLowerCase()) ||
        destination.destinate_id.toLowerCase().includes(search.toLowerCase()) ||
        destination.longitude.includes(search) ||
        destination.latitude.includes(search) ||
        destination.order.toString().includes(search)) &&
      (selectedTour === "" || destination.route_id === selectedTour),
  );

  return (
    <>
      <div className="mb-4">
        <label htmlFor="tour-select" className="block text-sm font-medium">
          Chọn Tour
        </label>
        <select
          id="tour-select"
          value={selectedTour}
          onChange={(e) => setSelectedTour(e.target.value)}
          className="w-full rounded-md border p-2"
        >
          <option value="">Tất cả các tour</option>
          {tours.map((tour) => (
            <option key={tour.id} value={tour.route_id}>
              {tour.tourName}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Tìm kiếm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-md border p-2"
      />

      <div className="max-h-80 overflow-y-auto rounded-lg border border-gray-300 shadow-md">
        <table className="min-w-full table-auto bg-white">
          <thead className="sticky top-0 z-10 bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Route ID</th>
              <th className="px-4 py-3 text-left">Destinate ID</th>
              <th className="px-4 py-3 text-center">Order</th>
              <th className="px-4 py-3 text-center">Longitude</th>
              <th className="px-4 py-3 text-center">Latitude</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDestinations.map((destination) => (
              <tr key={destination.destinate_id} className="border-b">
                <td className="px-4 py-3">{destination.route_id}</td>
                <td className="px-4 py-3">{destination.destinate_id}</td>
                <td className="px-4 py-3 text-center">{destination.order}</td>
                <td className="px-4 py-3 text-center">
                  {destination.longitude}
                </td>
                <td className="px-4 py-3 text-center">
                  {destination.latitude}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onEdit(destination)}
                    className="rounded-md bg-yellow-500 px-4 py-2 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(destination.destinate_id)}
                    className="ml-2 rounded-md bg-red-500 px-4 py-2 text-white"
                  >
                    Delete
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

export default AdminRouteDestinationsList;
