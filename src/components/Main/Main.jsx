import React, { useState, useEffect } from "react";
import './main.css';
import { useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from 'react-icons/hi';

const Main = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/tours/getAllTour');
                const result = await response.json();
                if (result.status === "success") {
                    const updatedData = await Promise.all(result.data.map(async (tour) => {
                        const imageUrl = await fetchImage(tour.img);
                        return { ...tour, img: imageUrl };
                    }));
                    setData(updatedData);
                }
            } catch (error) {
                console.error("Error fetching the data: ", error);
            }
        };

        fetchData();
    }, []);

    const fetchImage = async (path) => {
        try {
            const response = await fetch(`http://localhost:5000/photo?path=${path}`);
            if (response.ok) {
                const blob = await response.blob();
                return URL.createObjectURL(blob); 
            } else {
                throw new Error("Image not found");
            }
        } catch (error) {
            console.error("Error fetching the image: ", error);
            return '';
        }
    };

    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 className="title">
                    Địa điểm thu hút khách du lịch nhất
                </h3>
            </div>

            <div className="secContent grid">
                {
                    data.map(({ id, img, tourName, location, tourType, price, description }) => {
                        return (
                            <div key={id} className="singleDestination">
                                <div className="imageDiv">
                                    <img src={img || '/default-image.jpg'} alt={tourName} /> {}
                                </div>

                                <div className="cardInfo">
                                    <h4 className="destTitle">{tourName}</h4>
                                    <span className="continent flex">
                                        <HiOutlineLocationMarker className="icon" />
                                        <span className="name">{location}</span>
                                    </span>

                                    <div className="fees flex">
                                        <div className="grade">
                                            <span>{tourType}<small>+1</small></span>
                                        </div>
                                        <div className="price">
                                            <h5>{price.toLocaleString()} vnđ</h5>
                                        </div>
                                    </div>

                                    <div className="desc">
                                        <p>{description}</p>
                                    </div>

                                    <button className="btn flex" onClick={() => navigate("/detail")}>
                                        <span>CHI TIẾT</span> <HiOutlineClipboardCheck className="icon" />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}

export default Main;
