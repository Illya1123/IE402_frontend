import React from "react";
import './main.css'
import detail from "../../pages/TourDetail/detail";
import { useNavigate } from "react-router-dom";
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiOutlineClipboardCheck} from 'react-icons/hi'


import img from '../../Assets/img1.jpg'
import img1 from '../../Assets/img2.jpg'
import img2 from '../../Assets/img3.jpg'
import img3 from '../../Assets/img4.jpg'

const Data = [
    {
        id: 1,
        imgSrc: img,
        destTitle: 'Bà Nà Hill',
        location: 'Đà Nẵng, Việt Nam',
        grade: 'DU LỊCH',
        fees: '1.300.000 vnđ',
        description: "Bà Nà Hills là khu nghỉ dưỡng trên núi tuyệt đẹp gần Đà Nẵng, Việt Nam. Nơi đây có sự kết hợp độc đáo giữa vẻ đẹp thiên nhiên, kiến ​​trúc thuộc địa Pháp và các điểm tham quan công viên giải trí thú vị. Trải nghiệm bốn mùa trong một ngày, đi cáp treo dài nhất thế giới và chiêm ngưỡng Cầu Vàng."
    },

    {
        id: 2,
        imgSrc: img1,
        destTitle: 'Vịnh Hạ Long',
        location: 'Hà Nội, Việt Nam',
        grade: 'DI SẢN',
        fees: '1.400.000 vnđ',
        description: "Vịnh Hạ Long là Di sản Thế giới được UNESCO công nhận tại Việt Nam, nổi tiếng với hàng ngàn núi đá vôi và đảo có nhiều hình dạng và kích thước khác nhau. Khám phá các đầm phá ẩn giấu, bãi biển nguyên sơ và làng chài sôi động bằng thuyền hoặc thuyền kayak."
    },

    {
        id: 3,
        imgSrc: img2,
        destTitle: 'Phú Yên',
        location: 'Phú Yên, Việt Nam',
        grade: 'DU LỊCH',
        fees: '600.000 vnđ',
        description: "Phú Yên, viên ngọc ẩn giấu ở miền Trung Việt Nam, tự hào có những bãi biển nguyên sơ, vách đá ngoạn mục và ngọn hải đăng cổ kính. Khám phá những khối đá độc đáo của Gành Đá Đĩa, thư giãn trên Bãi Xép thanh bình và ngắm hoàng hôn tuyệt đẹp ở Mũi Điện. Đắm mình vào văn hóa địa phương và thưởng thức những món hải sản tươi ngon."
    },

    {
        id: 4,
        imgSrc: img3,
        destTitle: 'Đà Lạt',
        location: 'Lâm Đồng, Việt Nam',
        grade: 'THƯ GIÃN',
        fees: '1.500.000 vnđ',
        description: "Đà Lạt, một thị trấn đồi quyến rũ ở Việt Nam, có khí hậu mát mẻ, trong lành, vẻ đẹp thiên nhiên tuyệt đẹp và sự kết hợp độc đáo giữa kiến ​​trúc thuộc địa Pháp và văn hóa bản địa. Khám phá những thung lũng đẹp như tranh vẽ, những vườn hoa rực rỡ và những hồ nước thanh bình. Thưởng thức ẩm thực địa phương ngon tuyệt và trải nghiệm bầu không khí lãng mạn của thành phố."
    },

]

const Main = () => {
    const navigate = useNavigate();
    return (
        <section className="main container section">

            <div className="secTitle">
                <h3 className="title">
                    Địa điểm thu hút khách du lịch nhất
                </h3>
            </div>

            <div className="secContent grid">
                {
                    Data.map(({id, imgSrc, destTitle, location, grade, fees, description }) => {
                        return(
                            <div key={id} className="singleDestination">
                                <div className="imageDiv">
                                    <img src={imgSrc} alt={destTitle} />
                                </div>

                                <div className="cardInfo">
                                    <h4 className="destTitle">{destTitle}</h4>
                                    <span className="continent flex">
                                        <HiOutlineLocationMarker className="icon"/>
                                        <span className="name">{location}</span>
                                    </span>

                                    <div className="fees flex">
                                        <div className="grade">
                                            <span>{grade}<small>+1</small></span>
                                        </div>
                                        <div className="price">
                                            <h5>{fees}</h5>
                                        </div>
                                    </div>

                                    <div className="desc">
                                        <p>{description}</p>
                                    </div>

                                    <button className="btn flex" onClick={() => navigate("/detail")}>
                                        <span>CHI TIẾT</span> <HiOutlineClipboardCheck className="icon"/>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Main