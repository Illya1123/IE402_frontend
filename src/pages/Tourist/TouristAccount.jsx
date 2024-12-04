// Page for user's information and account
import React from "react";
import { useState } from "react";
import TouristPanel from "./TouristPanel.jsx";
import { InfoModal, AccountModal, ChangePassModal } from "./TouristAccountUpdate.jsx";

const TouristAccount = () => {
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const [isModalAccountOpen, setIsModalAccountOpen] = useState(false);
    const [isModalChangePassOpen, setIsModalChangePassOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const [formInfoData, setFormInfoData] = useState({
        "full-name": "Nguyễn Anh Kiệt",
        "birth-date": "1990-01-01",
        "gender": "Nam",
        "address": "Hà Nội",
    });

    const [formAccountData, setFormAccountData] = useState({
        "email": "kiet@example.com",
        "phone": "0901234567",    
    });

    const [formPassData, setFormPassData] = useState({
        "password": "123456789",
    });
    
    const openInfoModel = () => {
        setIsModalInfoOpen(true);
    };

    const openAccountModal = () => {
        setIsModalAccountOpen(true);
    };

    const openChangePassword = () => {
        setIsModalChangePassOpen(true);
    };

    const closeModalInfo = () => {
        setIsModalInfoOpen(false);
    };

    const closeModalAccount = () => {
        setIsModalAccountOpen(false);
    };

    const closeModalPass = () => {
        setIsModalChangePassOpen(false);
    };

    const handleSaveInfo = (updatedData) => {
        setFormInfoData(updatedData);
        closeModalInfo();
    };

    const handleSaveAccount = (updatedData) => {
        setFormAccountData(updatedData);
        closeModalAccount();
    };

    const handleSavePass = (updatedData) => {
        setFormPassData(updatedData);
        closeModalPass();
    };

    const handleShowPassword = () => {
        setShowPassword(preValue => !preValue);
    };

    return (
        <div className="flex pt-[125px] h-[1200px]">
            <div className="h-full w-1/3">
                <TouristPanel></TouristPanel>
            </div>
            <div className="w-2/3 h-full flex-1 text-start text-xl space-y-4">
                <div className="w-full flex flex-wrap justify-between">
                    <h2 className="text-2xl font-semibold">Quản lý tài khoản</h2>                    
                </div>
                <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between">
                        <h3 className="">Thông tin cá nhân</h3>
                        <button
                            className="mr-10 bg-green-500 rounded"
                            onClick={openInfoModel}
                        >
                            <span className="font-bold">Cập nhật</span>
                        </button>
                    </div>                    
                    <div className="bg-white rounded-lg shadow mr-10 py-3">
                        <section className="mx-5 lg:ml-10 space-y-5">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="full-name">Họ và tên</label>
                                <input 
                                    name="full-name"
                                    type="text" 
                                    className="w-full rounded border"
                                />                                
                            </div>
                            <div className="flex space-x-5">
                                <div className="flex flex-col space-y-2 w-1/2">
                                    <label htmlFor="birth-date" className="block">Ngày sinh</label>
                                    <input 
                                        name="birth-date"
                                        type="date" 
                                        className="w-full rounded border p-2"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2 w-1/2">
                                    <label htmlFor="gender" className="block">Giới tính</label>
                                    <select 
                                        name="gender" 
                                        id="gender"
                                        className="w-full rounded border p-2 bg-white"
                                    >
                                        <option value="">Nam</option>
                                        <option value="">Nữ</option>
                                        <option value="">Khác</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="address">Địa chỉ</label>
                                <input 
                                    name="address"
                                    type="text" 
                                    className="w-full rounded border"
                                />
                            </div>
                        </section>         
                    </div>           
                </div>
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between">
                        <h3 className="">Thông tin tài khoản</h3>
                        <button
                                className="mr-10 bg-green-500 rounded"
                                onClick={openAccountModal}
                            >
                                <span className="font-bold">Cập nhật</span>
                        </button>
                    </div>                    
                    <div className="bg-white rounded-lg shadow mr-10 py-3">
                        <section className="mx-5 lg:ml-10 space-y-5">
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="email">Email</label>
                                <input 
                                    name="email"
                                    type="text" 
                                    className="w-full rounded border"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input 
                                    name="phone"
                                    type="text" 
                                    className="w-full rounded border"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password">Mật khẩu</label>
                                    <button
                                        className="mr-10 bg-green-500 rounded"
                                        onClick={openChangePassword}
                                    >
                                        <span className="font-bold">Cập nhật</span>
                                    </button>
                                </div>                                
                                <input 
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full rounded border"
                                />
                                <button
                                    type="button"
                                    onClick={handleShowPassword}
                                    className="mt-2 text-blue-500"
                                >
                                    {showPassword ? "Ẩn" : "Hiện"} mật khẩu
                                </button>
                            </div>
                        </section>    
                    </div>                    
                </div>
            </div>
            {/* Modal for User information */}
            <InfoModal
                isOpen={isModalInfoOpen}
                onClose={closeModalInfo}
                onSave={handleSaveInfo}
                formData={formInfoData}
                setFormData={setFormInfoData}
            />
            {/* Modal for Account */}
            <AccountModal
                isOpen={isModalAccountOpen}
                onClose={closeModalAccount}
                onSave={handleSaveAccount}
                formData={formAccountData}
                setFormData={setFormAccountData}
            />
            {/* Modal for changePassword */}
            <ChangePassModal
                isOpen={isModalChangePassOpen}
                onClose={closeModalPass}
                onSave={handleSavePass}
                formData={formPassData}
                setFormData={setFormPassData}
            />
        </div>
    )
}

export default TouristAccount;