import React from "react";
import './main.css'

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
        destTitle: 'Ba Na Hills',
        location: 'Da Nang, Viet Nam',
        grade: 'CULTURAL RELAX',
        fees: '$700',
        description: "Ba Na Hills is a stunning mountain resort near Da Nang, Vietnam. It offers a unique blend of natural beauty, French colonial architecture, and thrilling amusement park attractions. Experience four seasons in one day, ride the world's longest cable car, and marvel at the Golden Bridge."
    },

    {
        id: 2,
        imgSrc: img1,
        destTitle: 'Ha Long Bay',
        location: 'Ha Noi, Viet Nam',
        grade: 'CULTURAL RELAX',
        fees: '$700',
        description: "Ha Long Bay is a UNESCO World Heritage Site in Vietnam, renowned for its thousands of limestone karsts and isles in various shapes and sizes. Explore hidden lagoons, pristine beaches, and vibrant fishing villages by boat or kayak."
    },

    {
        id: 3,
        imgSrc: img2,
        destTitle: 'Phu Yen',
        location: 'Phu Yen, Viet Nam',
        grade: 'CULTURAL RELAX',
        fees: '$700',
        description: "Phu Yen, a hidden gem in Central Vietnam, boasts pristine beaches, dramatic cliffs, and ancient lighthouses. Explore the unique rock formations of Gành Đá Đĩa, relax on the serene Bãi Xép, and witness the stunning sunset at Mũi Điện. Immerse yourself in the local culture and savor fresh seafood delicacies."
    },

    {
        id: 4,
        imgSrc: img3,
        destTitle: 'Da Lat',
        location: 'Lam Dong, Viet Nam',
        grade: 'CULTURAL RELAX',
        fees: '$700',
        description: "Da Lat, a charming hill station in Vietnam, offers a cool, refreshing climate, stunning natural beauty, and a unique blend of French colonial architecture and indigenous culture. Explore picturesque valleys, vibrant flower gardens, and serene lakes. Indulge in delicious local cuisine and experience the city's romantic atmosphere."
    },

]

const Main = () => {
    return (
        <section className="main container section">

            <div className="secTitle">
                <h3 className="title">
                    Most visited destrinations
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

                                    <button className="btn flex">
                                        DETAILS <HiOutlineClipboardCheck className="icon"/>
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