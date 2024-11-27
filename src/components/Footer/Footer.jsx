import React from "react";
import './footer.css'

import footer_video from '../../Assets/footer_video.mp4'

import { FiSend } from "react-icons/fi";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";


const Footer = () => {
    return (
        <div className="footer">
            <div className="videoDiv">
                <video src={footer_video} loop autoPlay muted type="video/mp4"></video>
            </div>

            <div className="secContent container">
                <div className="contactDiv flex">
                    <div className="text">
                        <small>KEEP IN TOUCH</small>
                        <h2>Travel with us</h2>
                    </div>

                    <div className="inputDiv flex">
                        <input type="text" placeholder="Enter Email Address" />
                        <button className="btn flex" type="submit">
                            SEND
                            <FiSend className="icon"/>
                        </button>
                    </div>
                </div>

                 <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <a href="#" className="logo flex">
                                <MdOutlineTravelExplore className="icon"/>
                                Travel
                            </a>
                        </div>

                        <div className="footerParagraph">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </div>

                        <div className="footerSocials flex">
                            <AiOutlineTwitter className="icon"/>
                            <AiFillYoutube className="icon"/>
                            <AiFillInstagram className="icon"/>
                            <FaTripadvisor className="icon"/>
                        </div>
                    </div>

                    <div className="footerLinks grid">
                        <div className="linkGroup">
                            <span className="groupTitle">
                                OUR AGENCY
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			Services
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			Insurance
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			Agency
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			Tourism
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			Payment
                            </li>
                        </div>

                        <div className="linkGroup">
                            <span className="groupTitle">
                                PARTNERS
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			Bookings
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			RentCars
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			HostelWorld
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			Trivago
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			TripAdvisor
                            </li>
                        </div>

                        <div className="linkGroup">
                            <span className="groupTitle">
                                LAST MINUTE
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			London
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			California
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			Indonesia
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			Europe
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon"/>
                    			Oceania
                            </li>
                        </div>
                    </div>

                    <div className="footerDiv flex">
                        <small>BEST TRAVEL WEBSITE THEME</small>
                        <small>COPYRIGHTS RESERVED - Rei</small>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default Footer