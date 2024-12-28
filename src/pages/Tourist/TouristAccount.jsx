// Page for user's information and account
import React from "react";
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import TouristPanel from "./TouristPanel.jsx";
import { InfoModal, AccountModal, ChangePassModal } from "./TouristAccountUpdate.jsx";
import { getUserById, getCustomerById, updateCustomerById, updateAccountById } from "../../api/customer.js";

const TouristAccount = () => {
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const [isModalAccountOpen, setIsModalAccountOpen] = useState(false);
    const [isModalChangePassOpen, setIsModalChangePassOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    // Variables for form
    const [formInfoData, setFormInfoData] = useState({});
    const [formAccountData, setFormAccountData] = useState({});
    const [formPassData, setFormPassData] = useState({});

    // Variables for user information
    const [userInformation, setUserInformation] = useState([]);
    const [customerInformation, setCustomerInformation] = useState([]);

    const fetchData = async(userId) => {        
        try{
            const userData = await getUserById(userId);
            const customerData = await getCustomerById(userId);
            setUserInformation(userData.data);
            setCustomerInformation(customerData.data);          
            // 
            setFormInfoData({
                "full-name": userData?.data?.lastName + ' ' + userData?.data?.firstName,
                "birth-date": customerData?.data?.birthdate,
                "address": customerData?.data?.address,
            });
            // 
            setFormAccountData({
                "email": userData?.data?.email,
                "phone": userData?.data?.sdt, 
            });
            // 
            setFormPassData({
                "password": userData?.data?.password,
            });
        } catch (error) {
            console.error("Error getting data.")
        }        
    };


    useEffect(() => {        
        const account_id = localStorage.getItem("account_id");
        fetchData(account_id);
    }, []);    
    
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

    const handleSaveInfo = async(updatedData) => { 
        // Checking full name length 
        if (updatedData['full-name'].length <= 1) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tên có độ dài tối thiểu 2 kí tự. Hãy nhập lại!',
            });
            return;
        }

        // Checking address length
        if (updatedData['address'].length < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Địa chỉ không được rỗng. Hãy nhập lại!',
            });
            return;
        }        
        // Send updated data to server
        let account_id = localStorage.getItem("account_id");
        await updateCustomerById(account_id, updatedData);
        setFormInfoData(updatedData);
        closeModalInfo();
    };

    // Function for checking phone number format
    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10,11}$/;
        return phoneRegex.test(phone);
    };

    // Function for checking email format
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const handleSaveAccount = async(updatedData) => {        
        // Checking email format
        if (!validateEmail(updatedData['email'])) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email không hợp lệ. Hãy nhập lại!',
            });
            return;
        }

        // Checking phone number format
        if (!validatePhone(updatedData['phone'])) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Số điện thoại phải có ít nhất 10 ký tự số. Hãy nhập lại!',
            });
            return;
        }
        
        // Send updated data to server
        let account_id = localStorage.getItem("account_id");
        try {
            await updateAccountById(account_id, updatedData);
            setFormAccountData(updatedData);
            closeModalAccount();
        } catch (error) {
            if (error.response && error.response.data) {                
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message || 'An error occurred!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Lỗi hệ thống!',
                });
            }
        };        
    };

    const handleSavePass = (updatedData) => {
        setFormPassData(updatedData);
        // Send updated data to server

        closeModalPass();
    };

    const handleShowPassword = () => {
        setShowPassword(preValue => !preValue);
    };
    return (
        <div className="flex pt-[125px] h-[1200px]">
            <div className="h-full w-1/3">
                <TouristPanel username={formInfoData['full-name']} email={formAccountData['email']}></TouristPanel>
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
                                    value={formInfoData['full-name']}
                                    name="full-name"
                                    type="text"
                                    className="w-full rounded border"
                                    disabled={true}
                                />                                
                            </div>
                            <div className="flex space-x-5">
                                <div className="flex flex-col space-y-2 w-1/2">
                                    <label htmlFor="birth-date" className="block">Ngày sinh</label>
                                    <input
                                        value={formInfoData['birth-date'] ? formInfoData['birth-date'].split('/').reverse().join('-') : ''}
                                        name="birth-date"
                                        type="date" 
                                        className="w-full rounded border p-2"
                                        disabled={true}
                                    />
                                </div>                     
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="address">Địa chỉ</label>
                                <input 
                                    value={formInfoData['address']}
                                    name="address"
                                    type="text" 
                                    className="w-full rounded border"
                                    disabled={true}
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
                                    value={formAccountData['email']}
                                    name="email"
                                    type="text" 
                                    className="w-full rounded border"
                                    disabled={true}
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input
                                    value={formAccountData['phone']}
                                    name="phone"
                                    type="text" 
                                    className="w-full rounded border"
                                    disabled={true}
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
                                    value={formPassData['password']}
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="w-full rounded border"
                                    disabled={true}
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