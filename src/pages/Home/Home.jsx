import React from "react";
import './home.css';
import video from '../../Assets/home_video.mp4';
import {GrLocation} from 'react-icons/gr';
import {HiFilter} from 'react-icons/hi';
import {FiFacebook} from 'react-icons/fi';
import {AiOutlineInstagram} from 'react-icons/ai';
import {FaTripadvisor} from 'react-icons/fa';
import {BsListTask} from 'react-icons/bs';
import {TbApps} from 'react-icons/tb';
import Main from '../../components/Main/Main.jsx';

const Home = () => {
    const [price, setPrice] = React.useState(5000);
    return (
        <>
        <section className="home">
            <div className="overlay"></div>
            <video src={video} typeof="video/mp4" loop autoPlay muted></video>
            <div className="homeContent container">
                <div className="textDiv">

                    <span className="smallText">
                        Các dịch vụ
                    </span>

                    <h1 className="homeTitle">
                        Tìm kiếm hành trình của bạn ngay
                    </h1>

                </div>

                <div className="cardDiv grid">

                    <div className="destinationInput">
                        <label htmlFor="city">
                            Tìm kiếm chuyến du lịch:
                            </label>
                        <div className="input flex">
                            <input type="text" placeholder="Nhập địa điểm..."/>
                            <GrLocation className="icon"/>
                        </div>
                    </div>

                    <div className="dateInput">
                        <label htmlFor="date">
                            Chọn ngày khởi hành:
                            </label>
                        <div className="input flex">
                            <input type="date" />
                        </div>
                    </div>

                    <div className="priceInput">
                        <div className="label_total flex">
                            <label htmlFor="price">
                                Ngân sách:
                                </label>
                            <h3 className="total">₫{price}</h3>
                        </div>
                        <div className="input flex">
                            <input type="range" max="2000000" min="800000" onChange={(e)=> setPrice(e.target.value)} />
                        </div>
                    </div>

                    <div className="searchOptions flex">
                        <HiFilter className="icon"/>
                        <span>KHÁM PHÁ</span>
                    </div>
                </div>

                <div className="homeFooterIcons flex">
                    <div className="rightIcons">
                        <FiFacebook className="icon"/>
                        <AiOutlineInstagram className="icon"/>
                        <FaTripadvisor className="icon"/>
                    </div>

                    <div className="leftIcons">
                        <BsListTask className="icon"/>
                        <TbApps className="icon"/>
                    </div>
                </div>
            </div>
        </section>
        <Main />
        </>
    )
}

export default Home