import React from "react";
import { Row, Col, CardImg, Button } from 'reactstrap';
import { SectionXPos } from "./Animations";
import { SectionYPos } from "./Animations";
import MediaQuery from "react-responsive";
import hr1 from "../images/Hero/pexels-photo-1536619.jpeg"
import hr2 from "../images/Hero/pexels-photo-845434.jpeg"
import hr3 from "../images/Hero/pexels-photo-963696.webp"
import hr1phn from "../images/Hero/pexels-photo-1536619 - phn.jpeg"
import hr2phn from "../images/Hero/pexels-photo-845434 phn.jpeg"
import hr3phn from "../images/Hero/pexels-photo-963696 - phn.jpg"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";

const HeroSec = () => {
    return (
        <div className="headerback" style={{overflow: "hidden"}}>
            <Row className="m-0 g-0">
                <MediaQuery minWidth={639}>
                    <Col md={6} xs={12} className="d-flex justify-content-center align-items-center px-0">
                        <div className="hero-text">
                            <h1 className="display-4 font-weight-bold">Where Style Meets Substance</h1>
                            <p className="lead">Explore our products and services.</p>
                            <Button outline color="light">Shop Now</Button>
                        </div>
                    </Col>
                    <Col md={6} xs={12} className="px-0">
                        <SectionXPos>
                            <Swiper
                                autoplay={{
                                    delay: 5500,
                                    disableOnInteraction: false,
                                }}
                                slidesPerView={1}
                                modules={[Autoplay]}
                                loop={true}
                            >
                                <SwiperSlide>
                                    <img className="headerimg" src={hr1} alt="Ad" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img className="headerimg" src={hr2} alt="Ad" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img className="headerimg" src={hr3} alt="Ad" />
                                </SwiperSlide>
                            </Swiper>
                        </SectionXPos>
                    </Col>
                </MediaQuery>
                <MediaQuery maxWidth={638}>
                    <Col md={6} xs={12} className="d-flex justify-content-center align-items-center px-0">
                        <div className="hero-text" style={{padding: "80px 10px 80px 10px"}}>
                            <h1 className="display-4 font-weight-bold">Where Style Meets Substance</h1>
                            <p className="lead">Explore our products and services.</p>
                            <Button outline color="light">Shop Now</Button>
                        </div>
                    </Col>
                    <Col md={6} xs={12} className="px-0">
                        <SectionYPos>
                            <Swiper
                                autoplay={{
                                    delay: 5500,
                                    disableOnInteraction: false,
                                }}
                                slidesPerView={1}
                                modules={[Autoplay]}
                                loop={true}
                            >
                                <SwiperSlide>
                                    <CardImg className="headerimg" src={hr1phn} alt="Ad" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <CardImg className="headerimg" src={hr2phn} alt="Ad" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <CardImg className="headerimg" src={hr3phn} alt="Ad" />
                                </SwiperSlide>
                            </Swiper>
                        </SectionYPos>
                    </Col>
                </MediaQuery>
            </Row>
        </div>
    );
};

export default HeroSec;