import React, { useEffect, useState } from "react";
import userIcon from "../../Assets/userImages/default-avatar.jpeg";
import { HiOutlineIdentification, HiOutlineShoppingCart, HiOutlineHeart } from "react-icons/hi";
import { BiLogOutCircle } from "react-icons/bi";
import { getUserById } from "../../api/customer";

const TouristPanel = () => {
    const [avatar, setAvatar] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchData = async(user_id) => {
            const response = await getUserById(user_id);
            if (response.avatar !== null) {
                setAvatar(response.data.avatar);
            };
            setUserName(response.data.lastName + ' ' + response.data.firstName);
        };
        const user_id = localStorage.getItem('account_id');        
        fetchData(user_id);
    }, []);      
    return (        
        <div className="py-3 mx-3 border border-2 rounded-lg space-y-2 bg-white shadow">
            <div className="h-[5rem] md:h-[9.5rem] xl:h-[8rem] 2xl:h-[5rem] flex-1">
                    <div classNameb="flex flex-wrap mx-2 space-x-2 space-y-2">
                        <div>
                            <img
                                src={ avatar !== null ? avatar : userIcon}
                                alt="Ảnh đại diện"
                                className="h-[75px] w-[100px] rounded-full"
                            ></img>
                        </div>                            
                        <div className="w-3/4 space-y-2">
                            <h3 className="hidden md:block ml-2 text-start text-xl font-semibold">{userName}</h3>
                            <h5 className="hidden lg:block ml-2 text-start italic">anhkietnguyen</h5>
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