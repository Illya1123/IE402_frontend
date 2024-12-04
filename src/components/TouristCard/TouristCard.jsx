import { HiOutlineLocationMarker, HiOutlineShoppingCart, HiOutlineTrash, HiOutlineCalendar, HiPhoneOutgoing } from 'react-icons/hi';

export const TouristCard = ({ item, type }) => {
    return (
        <div 
            onClick={() => {console.log("Go to detail");}}
            className='my-3 bg-[#e1e1eb] rounded-lg shadow-custom hover:bg-white transition-all duration-300 ease-in-out group'
        >
            <div key={item.id} className="flex items-center rounded-lg p-4 my-4">
            <div className="w-1/3 h-full">
                <img 
                    src={item.imgSrc} 
                    alt={item.destTitle} 
                    className="w-full h-[250px] lg:h-[300px] object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110" 
                />
            </div>
            <div className="w-2/3 pl-6">
                <h3 className="text-2xl font-semibold">{item.destTitle}</h3>
                <div className='flex flex-wrap items-center gap-3 mt-1'>
                    <p className="flex items-center text-gray-500 text-md">
                        <HiOutlineLocationMarker className="mr-2" />
                        {item.location}
                    </p>
                    <p className='flex items-center text-gray-500 text-sm'>
                        <HiOutlineCalendar className='mr-2'/>
                        {item.startDate} - {item.endDate}
                    </p>
                </div>                
                <hr className='mt-2'/>
                <div className='h-[50px] flex flex-wrap items-center'>                    
                    <p className="font-semibold text-md text-gray-500 hidden md:block">{item.grade}</p> 
                    <p className="text-[35px] text-green-500 ml-3">{item.fees}</p>
                </div>                        
                <hr className='mt-2'/>
                <p className="hidden lg:block text-gray-600 text-sm mt-3">{item.description}</p>
                <div className="flex flex-wrap justify-between mt-3">
                    <div className='flex flex-wrap gap-2'>
                        {
                            type === "Cart-On-Process" && 
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex flex-wrap items-center gap-2">
                                <HiPhoneOutgoing />
                                <p className='hidden lg:block'>Phản hồi</p>
                            </button>                        
                        }
                        {
                            type === "Favourite" && 
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex flex-wrap items-center gap-2">
                                <HiOutlineShoppingCart></HiOutlineShoppingCart>
                                <p className='hidden lg:block'>Đặt tour</p>
                            </button>                        
                        }
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex flex-wrap items-center gap-2">
                            <HiOutlineTrash></HiOutlineTrash>
                            <p className='hidden lg:block'>Hủy tour</p>
                        </button>
                    </div>
                    <button 
                        onClick={() => {console.log(`Nhấn hướng dẫn viên: ${item.tourGuide}`);}}
                        className='object-cover transition-transform duration-300 ease-in-out hover:scale-110'
                    >
                        <img 
                            src={item.avatar}
                            alt="Ảnh đại diện của hướng dẫn viên" 
                            className='h-[70px] w-[75px] rounded-full'
                        />
                        <p className='text-black italic'>{item.tourGuide}</p>                        
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
};