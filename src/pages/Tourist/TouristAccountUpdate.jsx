// Modal.js
import React from 'react';
import { useState } from 'react';

export const InfoModal = ({ isOpen, onClose, onSave, formData, setFormData }) => {
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    return (
        <div className="fixed inset-0 top-10 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-h-[80vh] overflow-auto">
                <h3 className="text-2xl font-semibold mb-4">Cập nhật thông tin</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="full-name" className="block">Họ và tên</label>
                        <input
                            name="full-name"
                            type="text"
                            value={formData['full-name']}
                            onChange={handleChange}
                            className="w-full p-2 rounded border"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="birth-date" className="block">Ngày sinh</label>
                        <input
                            name="birth-date"
                            type="date"
                            value={formData['birth-date']}
                            onChange={handleChange}
                            className="w-full p-2 rounded border"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="gender" className="block">Giới tính</label>
                        <select
                            name="gender"
                            value={formData['gender']}
                            onChange={handleChange}
                            className="w-full p-2 rounded border"
                        >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="address" className="block">Địa chỉ</label>
                        <input
                            name="address"
                            type="text"
                            value={formData['address']}
                            onChange={handleChange}
                            className="w-full p-2 rounded border"
                        />
                    </div>                   
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="bg-gray-300 p-2 rounded"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            className="bg-green-500 text-white p-2 rounded"
                            onClick={() => onSave(formData)}
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export const AccountModal = ({ isOpen, onClose, onSave, formData, setFormData }) => {
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    return (
        <div className="fixed inset-0 top-10 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-h-[80vh] overflow-auto">
                <h3 className="text-2xl font-semibold mb-4">Cập nhật tài khoản</h3>
                <form onSubmit={(e) => e.preventDefault()}>                    
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="block">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={formData['email']}
                            onChange={handleChange}
                            className="w-full p-2 rounded border"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="phone" className="block">Số điện thoại</label>
                        <input
                            name="phone"
                            type="text"
                            value={formData['phone']}
                            onChange={handleChange}
                            className="w-full p-2 rounded border"
                        />
                    </div>                    
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="bg-gray-300 p-2 rounded"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            className="bg-green-500 text-white p-2 rounded"
                            onClick={() => onSave(formData)}
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export const ChangePassModal = ({ isOpen, onClose, onSave, formData, setFormData }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    
    return (
        <div className="fixed inset-0 top-10 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-h-[80vh] overflow-auto">
                <h3 className="text-2xl font-semibold mb-4">Cập nhật mật khẩu</h3>
                <form onSubmit={(e) => e.preventDefault()}>                    
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password">Mật khẩu</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={isPasswordVisible ? "text" : "password"}  // Toggle between password and text
                                value={formData['password']}
                                onChange={handleChange}
                                className="w-full p-2 rounded border"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-0.5 text-gray-500"
                            >
                                {isPasswordVisible ? "Ẩn" : "Hiện"}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="bg-gray-300 p-2 rounded"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            className="bg-green-500 text-white p-2 rounded"
                            onClick={() => onSave(formData)}
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
