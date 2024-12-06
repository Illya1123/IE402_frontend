import React, { useState, useEffect } from "react";

const AdminTourForm = ({ onSubmit, tourToEdit, clearEdit }) => {
  const [tour, setTour] = useState({
    id: "",
    imgSrc: null,
    destTitle: "",
    location: "",
    grade: "",
    fees: "",
    description: "",
    duration: "",
  });

  useEffect(() => {
    if (tourToEdit) {
      setTour(tourToEdit);
    }
  }, [tourToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTour({ ...tour, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(tour);
    setTour({ 
        id: '',
        imgSrc: null,
        destTitle: '',
        location: '',
        grade: '',
        fees: '',
        description: '',
        duration: '',
    });
    if (clearEdit) clearEdit();
  };

  return (
    <form 
        onSubmit={handleSubmit}
        className="max-w-2xl relative grid gap-4 bg-gray-100 p-8 m-4 rounded-lg shadow-lg border-t border-l border-r border-b border-gray-200"
    >
      <input
        type="file"
        name="imgSrc"
        placeholder="Upload ảnh"
        value={tour.imgSrc}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="destTitle"
        placeholder="Tiêu đề"
        value={tour.destTitle}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Địa chỉ"
        value={tour.location}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="grade"
        placeholder="Cấp độ"
        value={tour.grade}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="fees"
        placeholder="Chi phí (USD)"
        value={tour.fees}
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
      <input
        type="text"
        name="duration"
        placeholder="Thời gian (ví dụ 3 ngày)"
        value={tour.duration}
        onChange={handleChange}
        required
      />
      <button 
        type="submit"
        className="bg-slate-950 px-2.5 py-1.5 border-2 border-solid border-transparent focus:outline-none transition-shadow duration-300 ease-[cubic-bezier(0.075,_0.82,_0.165,_1)]"
      >{tourToEdit ? "Cập nhật" : "Thêm"} Tour</button>
    </form>
  );
};

export default AdminTourForm;
