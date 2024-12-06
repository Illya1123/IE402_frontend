import React from "react";
import './detail.css';

import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FcRating } from "react-icons/fc";
import { TbMoneybag } from "react-icons/tb";

import img1 from "../../Assets/img1.jpg";

const Detail = () => {
    return (
        <section className="detail container section">
            <div className="overall">
                <h1 className="tourName">BÀ NÀ HILL</h1>
                <span className="tourDest flex">
                    <span className="name">Đà Nẵng, Việt Nam</span>
                    <HiOutlineLocationMarker className="icon" />
                </span>
            </div>

            <div className="imageDiv">
                <img src={img1} alt="Bà Nà Hill" />
            </div>

            <div className="detailsWrapper">
                {/* Tour Info Section */}
                <div className="tourInfo">
                    <div className="infoHeader flex">
                        <span className="rating">
                            <FcRating className="icon" />
                            <h3>4.8</h3>
                        </span>
                        <div className="price">
                            <TbMoneybag className="icon" />
                            <h4>1.300.000 ₫</h4>
                        </div>
                        <button className="btn">
                            <a href="">ĐẶT NGAY</a>
                        </button>
                    </div>
                    <div className="desc">
                        <p>
                            Bà Nà Hills là khu nghỉ dưỡng trên núi tuyệt đẹp gần Đà Nẵng, Việt Nam. Nơi đây có sự kết hợp độc đáo giữa vẻ đẹp thiên nhiên, kiến ​​trúc thuộc địa Pháp và các điểm tham quan công viên giải trí thú vị. Trải nghiệm bốn mùa trong một ngày, đi cáp treo dài nhất thế giới và chiêm ngưỡng Cầu Vàng.
                        </p>
                    </div>
                    <div className="tourContent">
                        <h3>Bạn sẽ trải nghiệm</h3>
                        <ul>
                            <li>Khám phá Bà Nà thật dễ dàng với vé Bà Nà Hills</li>
                            <li>Trải nghiệm hệ thống cáp treo được CNN bình chọn là 1 trong những cáp treo ấn tượng nhất thế giới</li>
                            <li>Vui hết mình ở khu vui chơi Fantasy Park nằm ở độ cao 1.489 m</li>
                            <li>Ngắm cảnh trên Cầu Vàng, nơi được tạp chí TIME bình chọn vào năm 2018 là 1 trong 100 địa điểm tuyệt vời nhất trên thế giới</li>
                            <li className="disabled">Chiêm ngưỡng vẻ đẹp Sun World Hòn Thơm</li>
                        </ul>
                        <a href="" className="readMore">Đọc thêm</a>
                    </div>
                </div>

                <div className="review">
                    <div className="reviewPrompt">
                        <h3>Để lại đánh giá khi bạn có thể!</h3>
                        <p>Điều này sẽ giúp các du khách khác khi họ lên kế hoạch du lịch.</p>
                        <a href="" className="reviewThis">Để lại đánh giá</a>
                    </div>
                </div>

                <div className="aboutTour">
                    <p>Ai đến Đà Nẵng mà không đi du lịch Bà Nà Hills thì thật là thiếu sót đấy! Bạn hãy cầm trên tay vé Bà Nà Hills và dành nguyên 1 ngày để khám phá điểm đến ấn tượng này nhé. Với vé Bà Nà Hills này, bạn sẽ có cơ hội chiêm ngưỡng quang cảnh hùng vĩ xung quanh khi hệ thống cáp treo dần đưa bạn lên đỉnh núi.
                        Lên đến Bà Nà Hills, bạn tha hồ bung lựa với hơn 105 trò chơi ở công viên giải trí Fantasy Park mà không mất phí. Chưa hết, khu làng Pháp là địa điểm vô cùng lý tưởng để sống ảo. À mà nhớ hãy dành thời gian ngắm cảnh trên Cầu Vàng, nơi được tạp chí TIME bình chọn vào năm 2018 là 1 trong 100 địa điểm tuyệt vời nhất trên thế giới. Bạn đã sẵn sàng bắt đầu chuyến đi du lịch Bà Nà Hills hứa hẹn nhiều bất ngờ chưa?</p>
                </div>
            </div>
        </section>
    )
}

export default Detail;