import TouristPanel from "./TouristPanel";
import { TouristCard } from "../../components/TouristCard/TouristCard";
import TourGuildAvatar1 from "../../Assets/tourGuildImages/tourGuide1.jpeg";
import TourGuildAvatar2 from "../../Assets/tourGuildImages/tourGuide2.jpeg";
import TourGuildAvatar3 from "../../Assets/tourGuildImages/tourGuide3.jpeg";
import TourGuildAvatar4 from "../../Assets/tourGuildImages/tourGuide4.jpeg";

import img from '../../Assets/img1.jpg'
import img1 from '../../Assets/img2.jpg'
import img2 from '../../Assets/img3.jpg'
import img3 from '../../Assets/img4.jpg'

import { HiOutlineSearch } from "react-icons/hi";

const Data = [
    {
        id: 1,
        imgSrc: img,
        destTitle: 'Bà Nà Hills',
        location: 'Đà Nẵng, Việt Nam',
        grade: 'THƯ GIÃN VĂN HÓA',
        fees: '$700',
        description: "Bà Nà Hills là một khu nghỉ dưỡng trên núi tuyệt đẹp gần Đà Nẵng, Việt Nam. Nơi đây mang đến sự kết hợp độc đáo giữa vẻ đẹp tự nhiên, kiến trúc thuộc địa Pháp và các trò chơi giải trí thú vị. Trải nghiệm bốn mùa trong một ngày, đi cáp treo dài nhất thế giới và chiêm ngưỡng Cầu Vàng.",
        startDate: '1/12/2024',
        endDate: '5/12/2024',
        tourGuide: 'Quốc Anh',
        avatar: TourGuildAvatar1
    },

    {
        id: 2,
        imgSrc: img1,
        destTitle: 'Vịnh Hạ Long',
        location: 'Hà Nội, Việt Nam',
        grade: 'THƯ GIÃN PHONG CẢNH',
        fees: '$700',
        description: "Vịnh Hạ Long là Di sản Thế giới UNESCO ở Việt Nam, nổi tiếng với hàng nghìn đảo đá vôi với hình dạng và kích thước khác nhau. Khám phá các vịnh nhỏ, bãi biển hoang sơ và các làng chài sôi động bằng thuyền hoặc kayak.",
        startDate: '5/12/2024',
        endDate: '8/12/2024',
        tourGuide: 'Nhật Minh',
        avatar: TourGuildAvatar2
    },

    {
        id: 3,
        imgSrc: img2,
        destTitle: 'Phú Yên',
        location: 'Phú Yên, Việt Nam',
        grade: 'THƯ GIÃN PHONG CẢNH',
        fees: '$700',
        description: "Phú Yên, một viên ngọc quý còn chưa được khám phá ở miền Trung Việt Nam, nổi bật với những bãi biển hoang sơ, vách đá hùng vĩ và những ngọn hải đăng cổ. Khám phá các hình thù đá độc đáo ở Gành Đá Đĩa, thư giãn trên bãi Xép yên bình và ngắm hoàng hôn tuyệt đẹp tại Mũi Điện. Hòa mình vào văn hóa địa phương và thưởng thức các món hải sản tươi ngon.",
        startDate: '24/12/2024',
        endDate: '31/12/2024',
        tourGuide: 'Anh Kiệt',
        avatar: TourGuildAvatar3
    },

    {
        id: 4,
        imgSrc: img3,
        destTitle: 'Đà Lạt',
        location: 'Lâm Đồng, Việt Nam',
        grade: 'THƯ GIÃN PHONG CẢNH',
        fees: '$700',
        description: "Đà Lạt, một trạm nghỉ mát tuyệt vời ở Việt Nam, mang đến một khí hậu mát mẻ, vẻ đẹp thiên nhiên ngoạn mục và sự kết hợp độc đáo giữa kiến trúc thuộc địa Pháp và văn hóa bản địa. Khám phá những thung lũng thơ mộng, vườn hoa rực rỡ và những hồ nước yên bình. Thưởng thức ẩm thực địa phương ngon lành và tận hưởng không khí lãng mạn của thành phố.",
        startDate: '20/1/2025',
        endDate: '11/1/2025',
        tourGuide: 'Đức Phú',
        avatar: TourGuildAvatar4
    },
]


const TouristFavourite = () => {
    return (
        <div className="flex pt-[125px] h-[2000px]">
            <div className="h-full w-1/3">
                <TouristPanel></TouristPanel>
            </div>
            
            <div className="w-2/3 h-full flex-1 text-start text-xl space-y-5 ">
                <div className="py-3 mr-10 bg-white shadow rounded-lg">
                    <h2 className="ml-2 text-2xl font-semibold">Danh sách tour quan tâm</h2>
                    <div className="flex flex-wrap space-y-2 ml-20 py-3 justify-between mx-[200px]">
                        <div className="h-[40px] flex justify-between items-center rounded border">
                            <input 
                                type="text" 
                                placeholder="Tên tour ..."
                                className="h-full pl-3 text-sm border-none rounded-l"                                
                            />
                            <button
                                className="h-full rounded-r text-black rounded-none hover:bg-blue-300"
                            >
                                <HiOutlineSearch></HiOutlineSearch>
                            </button>                            
                        </div>
                        <div>
                            <select 
                                name="" 
                                id=""
                                className="px-2 rounded border bg-white"
                            >
                                <option value="">Sắp xếp theo giá tour</option>
                                <option value="">Sắp xếp theo ngày đặt</option>
                                <option value="">Sắp xếp theo ngày khởi hành</option>
                            </select>
                        </div>
                    </div>
                </div>            
                <div className="mr-10 flex-grow">
                    {
                        Data.length > 0 ? (
                            Data.map((destination) => (                                
                                <TouristCard item={destination} type={"Favourite"}></TouristCard>
                            )) 
                        ) : (
                            <p>Loading ...</p>
                        )
                    }                    
                </div>
            </div>
        </div>
    );
};

export default TouristFavourite;