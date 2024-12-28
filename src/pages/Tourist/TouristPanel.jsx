import React, { useEffect, useState } from "react";
import axios from "axios";
import userIcon from "../../Assets/userImages/default-avatar.jpeg";
import { HiOutlineIdentification, HiOutlineShoppingCart, HiOutlineHeart } from "react-icons/hi";
import { BiLogOutCircle } from "react-icons/bi";
import { getUserById } from "../../api/customer";

const TouristPanel = ({ username, email }) => {
    const [avatar, setAvatar] = useState(null);
    
    const fetchData = async(user_id) => {
        const response = await getUserById(user_id);
        if (response.data.avatar !== null) {
            // Get avatar by using api
            setAvatar(response.data.avatar);
        };
    };
    
    const handleUpdateAvatar = async(e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async() => {                
                const avatarImg = reader.result.split(',')[1];
                setAvatar(avatarImg); // Save base64 part of image
                
                const formData = new FormData();
                formData.append("avatar", file);
                
                // Send image to server
                try {
                    let account_id = localStorage.getItem("account_id");
                    const token = localStorage.getItem('token');                    
                    const response = await axios.patch(`http://localhost:5000/users/avatar-update/${account_id}`,
                        formData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': "multipart/form-data"
                        }
                    });
                    console.log(response)
                } catch (error) {
                    console.error(
                    "Update failed:",
                    error.response ? error.response.data : error.message,
                    );
                    throw error;
                }
            };
            reader.readAsDataURL(file);            
        }
    };

    useEffect(() => {        
        const user_id = localStorage.getItem('account_id');        
        fetchData(user_id);
    }, []);

    return (        
        <div className="py-3 mx-3 border border-2 rounded-lg space-y-2 bg-white shadow">
            <div className="h-[5rem] md:h-[9.5rem] lg:h-[5rem] xl:h-[7rem] 2xl:h-[5rem] flex-1">
                    <div className="flex flex-col lg:flex-row mx-2 space-x-2 space-y-1 lg:space-y-0">
                        <button 
                            className="w-full lg:w-1/4 ml-0 lg:ml-auto"
                            onClick={() => document.getElementById('avatarInput').click()}
                        >
                            {
                            avatar === null ? (
                                <img
                                    src={userIcon}
                                    alt="Ảnh đại diện"
                                    className="h-[75px] w-[80px] rounded-full ml-5"
                                ></img>
                            ) : (
                                <img
                                    src={`data:image/png;base64,${avatar}`}
                                    alt="Ảnh đại diện"
                                    className="h-[75px] w-[80px] rounded-full ml-5"
                                ></img>
                            ) 
                            }
                        </button>

                        <input
                            id="avatarInput"
                            type="file"
                            accept="image/*"
                            onChange={handleUpdateAvatar}
                            style={{ display: 'none' }}
                        />

                        <div className="hidden md:block lg:w-3/4 space-y-1">
                            <h3 className="ml-2 text-start text-xl font-semibold">{username}</h3>
                            <h5 className="ml-2 text-start italic">{email}</h5>
                        </div>
                    </div>
            </div>
            <hr/>
            <ul className="mx-2 space-y-1">                                                    
                <li className="hover:bg-[#c3c7c4]">
                    <a href="/tourist-account" className="h-[40px] w-full cursor-pointer block leading-[40px] text-start pl-2 flex flex-wrap gap-2 justify-center md:justify-start ">
                        <HiOutlineIdentification className="w-[30px] h-[30px]" />
                        <span className="hidden md:block">Thông tin của tôi</span>
                    </a>
                </li>
                <li className="hover:bg-[#c3c7c4]">
                    <a href="/tourist-booking" className="h-[40px] w-full cursor-pointer block leading-[40px] text-start pl-2 flex flex-wrap gap-2 justify-center md:justify-start ">
                        <HiOutlineShoppingCart className="w-[30px] h-[30px]" />
                        <span className="hidden md:block">Các tour đã đặt</span>
                    </a>
                </li>
                <li className="hover:bg-[#c3c7c4]">
                    <a href="/tourist-favourite" className="h-[40px] w-full cursor-pointer block leading-[40px] text-start pl-2 flex flex-wrap gap-2 justify-center md:justify-start ">
                        <HiOutlineHeart className="w-[30px] h-[30px]" />
                        <span className="hidden md:block">Các tour quan tâm</span>
                    </a>
                </li>
                <li>
                    <hr />
                </li>
                <li>
                    <button className="h-[40px] w-full rounded-none hover:bg-[#c3c7c4] flex justify-center md:justify-start pl-2 text-black flex flex-wrap gap-2">
                        <BiLogOutCircle className="w-[30px] h-[30px]" />
                        <span className="hidden md:block text-black">Đăng xuất</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default TouristPanel;