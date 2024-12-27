// Modal.js
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { updatePassword } from '../../api/customer';

export const InfoModal = ({ isOpen, onClose, onSave, formData, setFormData }) => {
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState() ;   
    const [address, setAddress] = useState("");

    useEffect(() => {
        setFullName(formData['full-name']);
        setBirthDate(formData['birth-date']);
        setAddress(formData['address']);
    }, [isOpen]);
    
    if (!isOpen) return null;    

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
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-2 rounded border"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="birth-date" className="block">Ngày sinh</label>
                        <input
                            name="birth-date"
                            type="date"
                            value={birthDate ? birthDate.split('/').reverse().join('-') : ''}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className="w-full p-2 rounded border"
                        />
                    </div>                    
                    <div className="flex flex-col mb-4">
                        <label htmlFor="address" className="block">Địa chỉ</label>
                        <input
                            name="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
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
                            onClick={() => onSave({
                                'full-name': fullName,
                                'birth-date': birthDate,
                                address: address
                            })}
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
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        setEmail(formData['email']);
        setPhone(formData['phone']);
    }, [isOpen]);

    if (!isOpen) return null;
    
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 rounded border"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="phone" className="block">Số điện thoại</label>
                        <input
                            name="phone"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                            onClick={() => (onSave({
                                email: email, 
                                phone: phone
                            }))}
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
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    if (!isOpen) return null;
    
    // Function for checking password format
    const validatePassword = (password) => {        
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,19}$/;
        return passwordRegex.test(password);
    };    

    const handleUpdatePassword = async(currentPass, newPass, confirmPass) => {        

        // Check confirm password
        if (newPass !== confirmPass) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mật khẩu xác nhận không khớp!',
            });
            return;
        }

        // Check currentPassword & newPassword format
        if (currentPass === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mật khẩu hiện tại không được để trống!',
            });
            return;
        }
    
        if (!validatePassword(newPass)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mật khẩu mới phải chứa ít nhất 8 ký tự, một chữ cái, một số và một ký tự đặc biệt!',
            });
            return;
        }    

        // Send new password to server - check current password in server
        let account_id = localStorage.getItem("account_id");
        try {
            const response = await updatePassword(account_id, currentPass, newPass);        
            // Update Form and Alert to client
            if (response.status) {
                onSave(formData);
                Swal.fire({
                    icon: 'success',
                    title: 'success',
                    text: "Thay đổi mật khẩu thành công!"
                });    
            };
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Mật khẩu hiện tại nhập vào không đúng!',
            });
        };  
    };

    return (
        <div className="fixed inset-0 top-10 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] max-h-[80vh] overflow-auto">
                <h3 className="text-2xl font-semibold mb-4">Cập nhật mật khẩu</h3>
                <form onSubmit={(e) => e.preventDefault()}>                    
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password">Nhập mật khẩu hiện tại</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={"text"}
                                placeholder='Nhập mật khẩu hiện tại ...'
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full p-2 rounded border"
                            />                            
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password">Nhập mật khẩu mới</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={"text"}
                                placeholder='Nhập mật khẩu mới ...'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 rounded border"
                            />                            
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password-confirm">Nhập lại mật khẩu mới</label>
                        <div className="relative">
                            <input
                                name="password-confirm"
                                type={"text"}
                                placeholder='Nhập lại mật khẩu mới ...'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-2 rounded border"
                            />                            
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
                            onClick={() => {handleUpdatePassword(currentPassword, newPassword, confirmPassword);}}
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
