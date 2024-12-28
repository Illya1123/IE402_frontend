import React, { useEffect, useState } from "react";
import './detail.css';
import { useParams } from "react-router-dom";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FcRating } from "react-icons/fc";
import { TbMoneybag } from "react-icons/tb";
import getAddressFromLatLng from "../../api/getAddressFromLatLng";

const Detail = () => {
    const { id } = useParams();
    const [tourDetail, setTourDetail] = useState(null);
    const [destinations, setDestinations] = useState([]);
    const [fullDescription, setFullDescription] = useState("");
    const [guideInfo, setGuideInfo] = useState(null);

    useEffect(() => {
        const fetchTourDetail = async () => {
            try {
                const response = await fetch(`https://ie402-backend.onrender.com/tours/get-tour-by-this-id/${id}`);
                const result = await response.json();
                if (result.status === "success") {
                    setTourDetail(result.data);

                    const routeResponse = await fetch(`https://ie402-backend.onrender.com/routes/${result.data.route_id}/destinations`);
                    const routeResult = await routeResponse.json();
                    if (routeResult.status === "success") {
                        const destinationsWithDetails = await Promise.all(
                            routeResult.data.map(async (destination) => {
                                const destResponse = await fetch(
                                    `https://ie402-backend.onrender.com/destinations/get/${destination.destinate_id}`
                                );
                                const destResult = await destResponse.json();
                                if (destResult.status === "success") {
                                    const address = await getAddressFromLatLng(
                                        destResult.data.latitude,
                                        destResult.data.longitude
                                    );
                                    return {
                                        ...destination,
                                        name: destResult.data.name || "Không tìm thấy tên",
                                        openHour: destResult.data.openHour,
                                        closeHour: destResult.data.closeHour,
                                        rate: destResult.data.rate,
                                        latitude: destResult.data.latitude,
                                        longitude: destResult.data.longitude,
                                        address: address,
                                        description: destResult.data.description || "Không tìm thấy mô tả",
                                    };
                                }
                                return {
                                    ...destination,
                                    name: "Không tìm thấy tên",
                                    address: "Không tìm thấy địa chỉ",
                                    description: "Không tìm thấy mô tả",
                                };
                            })
                        );
                        setDestinations(destinationsWithDetails);

                        const concatenatedDescription = destinationsWithDetails
                            .map((destination) => destination.description)
                            .join("\n\n");
                        setFullDescription(result.data.description + "\n\n" + concatenatedDescription);

                        const guideResponse = await fetch(`https://ie402-backend.onrender.com/users/getUser/2`);
                        const guideResult = await guideResponse.json();
                        if (guideResult.status === "success") {
                            const guide = guideResult.data.rows.find(
                                (guide) => guide.extraInfo.id === result.data.guide_id
                            );
                            if (guide) {
                                setGuideInfo({
                                    name: `${guide.lastName} ${guide.firstName}`,
                                    email: guide.email,
                                    language: guide.extraInfo.language,
                                });
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching tour details: ", error);
            }
        };

        fetchTourDetail();
    }, [id]);

    useEffect(() => {
        if (destinations.length > 0) {
            loadMap();
        }
    }, [destinations]);

    const loadMap = () => {
        window.require(["esri/Map", "esri/views/MapView", "esri/Graphic"], (Map, MapView, Graphic) => {
            const map = new Map({
                basemap: "streets-navigation-vector",
            });

            const view = new MapView({
                container: "arcgis-map",
                map: map,
                center: [destinations[0].longitude, destinations[0].latitude],
                zoom: 10,
            });

            const points = destinations.map((destination) => {
                const point = {
                    type: "point",
                    longitude: destination.longitude,
                    latitude: destination.latitude,
                };

                const markerSymbol = {
                    type: "simple-marker",
                    color: [226, 119, 40],
                    outline: {
                        color: [255, 255, 255],
                        width: 2,
                    },
                };

                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbol,
                    attributes: destination,
                    popupTemplate: {
                        title: destination.name,
                        content: `
                            <p><strong>Địa chỉ:</strong> ${destination.address}</p>
                            <p><strong>Giờ mở cửa:</strong> ${destination.openHour}</p>
                            <p><strong>Giờ đóng cửa:</strong> ${destination.closeHour}</p>
                            <p><strong>Đánh giá:</strong> ${destination.rate} ⭐</p>
                        `,
                    },
                });

                view.graphics.add(pointGraphic);
                return [destination.longitude, destination.latitude];
            });

            const polyline = {
                type: "polyline",
                paths: points,
            };

            const lineSymbol = {
                type: "simple-line",
                color: [0, 0, 255],
                width: 2,
            };

            const polylineGraphic = new Graphic({
                geometry: polyline,
                symbol: lineSymbol,
            });

            view.graphics.add(polylineGraphic);
        });
    };

    if (!tourDetail || !guideInfo) {
        return <div>Loading...</div>;
    }

    const { tourName, img, price, limitOfNumOfGuest } = tourDetail;
    const imageUrl = `https://ie402-backend.onrender.com/photo?path=${img}`;

    return (
        <section className="detail container section">
            <div className="overall">
                <h1 className="tourName">{tourName}</h1>
            </div>

            <div className="contentWrapper">
                <div className="detailsSection">
                    <div className="imageDiv">
                        <img src={imageUrl} alt={tourName} />
                    </div>

                    <div className="detailsWrapper">
                        <div className="tourInfo">
                            <div className="infoHeader flex">
                                <span className="rating">
                                    <FcRating className="icon" />
                                    <h3></h3>
                                </span>
                                <div className="price">
                                    <TbMoneybag className="icon" />
                                    <h4>{price.toLocaleString()} ₫</h4>
                                </div>
                                <button className="btn">
                                    <a href="">ĐẶT NGAY</a>
                                </button>
                            </div>
                            <div className="desc">
                                <p>{fullDescription}</p>
                            </div>
                        </div>

                        <div className="guestLimitWrapper">
                            <div className="limitGuests bg-gray-100 p-4 rounded-lg shadow-lg text-right">
                                <h4 className="text-xl font-bold text-orange-500">Giới hạn số lượng khách:</h4>
                                <p className="text-lg text-gray-700">{limitOfNumOfGuest} người</p>
                            </div>
                            <div className="guideInfo bg-gray-100 p-4 rounded-lg shadow-lg mt-6">
                            <h4 className="text-xl font-bold text-orange-500">Hướng dẫn viên:</h4>
                            <p><strong>Tên:</strong> {guideInfo.name}</p>
                            <p><strong>Email:</strong> {guideInfo.email}</p>
                            <p><strong>Ngôn ngữ:</strong> {guideInfo.language}</p>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="mapAndTable">
                    <div id="arcgis-map" style={{ width: "100%", height: "600px" }}></div>

                    <div className="tableSection">
                        <table className="min-w-full table-auto bg-white">
                            <thead className="bg-gray-200 sticky top-0 z-10">
                                <tr>
                                    <th className="py-3 px-4 text-left">Thứ tự</th>
                                    <th className="py-3 px-4 text-left">Tên địa điểm</th>
                                    <th className="py-3 px-4 text-center">Giờ mở cửa</th>
                                    <th className="py-3 px-4 text-center">Giờ đóng cửa</th>
                                    <th className="py-3 px-4 text-center">Đánh giá</th>
                                    <th className="py-3 px-4 text-left">Địa chỉ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {destinations.map((destination, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-3 px-4 text-left">{index + 1}</td>
                                        <td className="py-3 px-4">{destination.name}</td>
                                        <td className="py-3 px-4 text-center">{destination.openHour}</td>
                                        <td className="py-3 px-4 text-center">{destination.closeHour}</td>
                                        <td className="py-3 px-4 text-center">{destination.rate} ⭐</td>
                                        <td className="py-3 px-4">{destination.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Detail;
