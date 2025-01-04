import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { baseUrl } from "../../../api";

const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
};

const AdminTourForm = ({ onSubmit, tourToEdit, clearEdit }) => {
  const [tour, setTour] = useState({
    route_id: "",
    guide_id: "",
    tourName: "",
    img: null,
    description: "",
    startDate: "",
    endDate: "",
    price: "",
    limitOfNumOfGuest: "",
    tourType: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [guides, setGuides] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/users/filter/2`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.status === "success" && result.data.rows) {
          setGuides(result.data.rows);
        } else {
          throw new Error("Failed to fetch guides");
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Could not fetch guide data",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchGuides();
  }, []);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseUrl}/routes/get-all-routes`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.status === "success" && result.data) {
          setRoutes(result.data);
        } else {
          throw new Error("Failed to fetch routes");
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Could not fetch route data",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    fetchRoutes();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      setAvatar(files[0]);
    } else {
      setTour({ ...tour, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = null;

      if (avatar) {
        const formData = new FormData();
        formData.append("image", avatar);

        const response = await fetch(`${baseUrl}/upload`, {
          method: "POST",
          body: formData,
        });

        const responseData = await response.json();
        if (responseData.imageUrl) {
          imageUrl = responseData.imageUrl;
        } else {
          throw new Error("Image upload failed");
        }
      }

      const tourData = {
        route_id: tour.route_id,
        guide_id: tour.guide_id,
        tourName: tour.tourName,
        img: imageUrl,
        description: tour.description,
        startDate: formatDate(tour.startDate),
        endDate: formatDate(tour.endDate),
        price: tour.price,
        limitOfNumOfGuest: tour.limitOfNumOfGuest,
        tourType: tour.tourType,
      };

      const token = localStorage.getItem("token");

      const response = await fetch(`${baseUrl}/tours/create-tour`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tourData),
      });

      if (response && response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Tour added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        setTour({
          route_id: "",
          guide_id: "",
          tourName: "",
          img: null,
          description: "",
          startDate: "",
          endDate: "",
          price: "",
          limitOfNumOfGuest: "",
          tourType: "",
        });
        setAvatar(null);
        if (clearEdit) clearEdit();
        window.location.reload();
      } else {
        throw new Error("Failed to add tour");
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
    <div className="flex gap-2">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl relative grid gap-4 bg-gray-100 p-8 m-4 rounded-lg shadow-lg border-t border-l border-r border-b border-gray-200"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          {tourToEdit ? "Cập nhật Tour" : "Thêm Tour Mới"}
        </h2>
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <select
          name="route_id"
          value={tour.route_id}
          onChange={handleChange}
          required
        >
          <option value="">Chọn Tuyến Đường</option>
          {routes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </select>
        <select
          name="guide_id"
          value={tour.guide_id}
          onChange={handleChange}
          required
        >
          <option value="">Chọn Hướng Dẫn Viên</option>
          {guides.map((guide) => (
            <option key={guide.extraInfo.id} value={guide.extraInfo.id}>
              {`${guide.lastName} ${guide.firstName}`}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="tourName"
            placeholder="Tên Tour"
            value={tour.tourName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tourType"
            placeholder="Loại Tour"
            value={tour.tourType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Giá tiền"
            value={tour.price}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="limitOfNumOfGuest"
            placeholder="Số lượng khách tối đa"
            value={tour.limitOfNumOfGuest}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="date"
          name="startDate"
          placeholder="Ngày bắt đầu"
          value={tour.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          placeholder="Ngày kết thúc"
          value={tour.endDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Mô tả"
          value={tour.description}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-slate-950 px-2.5 py-1.5 border-2 border-solid border-transparent focus:outline-none transition-shadow duration-300 ease-[cubic-bezier(0.075,_0.82,_0.165,_1)]"
        >
          {tourToEdit ? "Cập nhật" : "Thêm"} Tour
        </button>
      </form>

      <div className="w-48 h-48 bg-gray-200 border border-gray-300 rounded-md flex justify-center items-center">
        {avatar ? (
          <img
            src={URL.createObjectURL(avatar)}
            alt="Preview"
            className="object-cover w-full h-full rounded-md"
          />
        ) : (
          <span>Preview Image</span>
        )}
      </div>
    </div>
  );
};

export default AdminTourForm;
