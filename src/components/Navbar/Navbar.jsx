import React, { useState } from "react";
import './navbar.css'
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";

const Navbar = () => {
    const [active, setActive] = useState('navBar')

    // func to toggle navbar
    const showNav = () => {
        setActive('navBar activeNavbar')
    }
    // func to remove navbar
    const removeNavbar = () => {
        setActive('navBar')
    }

    return (
        <section className="navBarSection">
            <header className="header flex">
                <div className="logoDiv">
                    <a href="#" className="logo flex">
                        <h1><MdOutlineTravelExplore className="icon"/>
                        Travel
                        </h1>
                    </a>
                </div>

                <ul className="outerNavLists flex">

                        <li className="navItem">
                            <a href="#" className="navLink">Trang chủ</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Hoạt động</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Dịch vụ</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Thông tin</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Trang</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Tin tức</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Liên lạc</a>
                        </li>
                    </ul>

                <div className={active}>
                    <ul className="navLists flex">

                        <li className="navItem">
                            <a href="#" className="navLink">Bảo hiểm du lịch</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Sân chơi</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Làm đẹp & Spa</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Du thuyền</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Wi bu</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Phiếu quà tặng</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Khuyến mãi</a>
                        </li>
                    </ul>                    

                    <button className="btn">
                            <a href="#">Đặt vé ngay</a>
                        </button>

                    <div onClick={removeNavbar} className="closeNavbar">
                    <AiFillCloseCircle className="icon"/>
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                <TbGridDots className="icon"/>
                </div>
            </header>
        </section>
    )
}

export default Navbar