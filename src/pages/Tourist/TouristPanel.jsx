import React, { useEffect, useState } from "react";
import axios from "axios";
import userIcon from "../../Assets/userImages/default-avatar.jpeg";
import {
  HiOutlineIdentification,
  HiOutlineShoppingCart,
  HiOutlineHeart,
} from "react-icons/hi";
import { BiLogOutCircle } from "react-icons/bi";
import { getUserById } from "../../api/customer";
import { baseUrl } from "../../api";

const TouristPanel = ({ username, email }) => {
  const [avatar, setAvatar] = useState(null);

  const fetchData = async (user_id) => {
    const response = await getUserById(user_id);
    if (response.data.avatar !== null) {
      // Get avatar by using api
      setAvatar(response.data.avatar);
    }
  };

  const handleUpdateAvatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const avatarImg = reader.result.split(",")[1];
        setAvatar(avatarImg); // Save base64 part of image

        const formData = new FormData();
        formData.append("avatar", file);

        // Send image to server
        try {
          let account_id = localStorage.getItem("account_id");
          const token = localStorage.getItem("token");
          const response = await axios.patch(
            `${baseUrl}/users/avatar-update/${account_id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            },
          );
          console.log(response);
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
    const user_id = localStorage.getItem("account_id");
    fetchData(user_id);
  }, []);

  return (
    <div className="mx-3 space-y-2 rounded-lg border border-2 bg-white py-3 shadow">
      <div className="h-[5rem] flex-1 md:h-[9.5rem] lg:h-[5rem] xl:h-[7rem] 2xl:h-[5rem]">
        <div className="mx-2 flex flex-col space-x-2 space-y-1 lg:flex-row lg:space-y-0">
          <button
            className="ml-0 w-full lg:ml-auto lg:w-1/4"
            onClick={() => document.getElementById("avatarInput").click()}
          >
            {avatar === null ? (
              <img
                src={userIcon}
                alt="Ảnh đại diện"
                className="ml-5 h-[75px] w-[80px] rounded-full"
              ></img>
            ) : (
              <img
                src={`data:image/png;base64,${avatar}`}
                alt="Ảnh đại diện"
                className="ml-5 h-[75px] w-[80px] rounded-full"
              ></img>
            )}
          </button>

          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={handleUpdateAvatar}
            style={{ display: "none" }}
          />

          <div className="hidden space-y-1 md:block lg:w-3/4">
            <h3 className="ml-2 text-start text-xl font-semibold">
              {username}
            </h3>
            <h5 className="ml-2 text-start italic">{email}</h5>
          </div>
        </div>
      </div>
      <hr />
      <ul className="mx-2 space-y-1">
        <li className="hover:bg-[#c3c7c4]">
          <a
            href="/tourist-account"
            className="block flex h-[40px] w-full cursor-pointer flex-wrap justify-center gap-2 pl-2 text-start leading-[40px] md:justify-start"
          >
            <HiOutlineIdentification className="h-[30px] w-[30px]" />
            <span className="hidden md:block">Thông tin của tôi</span>
          </a>
        </li>
        <li className="hover:bg-[#c3c7c4]">
          <a
            href="/tourist-booking"
            className="block flex h-[40px] w-full cursor-pointer flex-wrap justify-center gap-2 pl-2 text-start leading-[40px] md:justify-start"
          >
            <HiOutlineShoppingCart className="h-[30px] w-[30px]" />
            <span className="hidden md:block">Các tour đã đặt</span>
          </a>
        </li>
        <li className="hover:bg-[#c3c7c4]">
          <a
            href="/tourist-favourite"
            className="block flex h-[40px] w-full cursor-pointer flex-wrap justify-center gap-2 pl-2 text-start leading-[40px] md:justify-start"
          >
            <HiOutlineHeart className="h-[30px] w-[30px]" />
            <span className="hidden md:block">Các tour quan tâm</span>
          </a>
        </li>
        <li>
          <hr />
        </li>
        <li>
          <button className="flex h-[40px] w-full flex-wrap justify-center gap-2 rounded-none pl-2 text-black hover:bg-[#c3c7c4] md:justify-start">
            <BiLogOutCircle className="h-[30px] w-[30px]" />
            <span className="hidden text-black md:block">Đăng xuất</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TouristPanel;
