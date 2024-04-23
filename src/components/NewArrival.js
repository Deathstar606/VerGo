import React from "react";
import { Container, Row, CardImg, Col } from "reactstrap";
import { StaggeredText } from "./Animations";
import newar1 from "../images/Newarr/casual-dress-code-men-street-style-luxe-digital-1-943x1100.jpg.webp"
import newar2 from "../images/Newarr/aline-kaplan-zara-blazer-trousers-mango-waistcoat-lobus-bag-news-photo-1692315065.jpg"
import newar3 from "../images/Newarr/pexels-photo-4350287.webp"
import dem from "../images/demo.mp4"
import MediaQuery from "react-responsive";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import './video.css';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./card.css"

const VideoBackground = ({ videoSource, children }) => (
    <div className="video-container">
      <video autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
      </video>
        <div className="centered-text">
            {children}
        </div>
    </div>
  );

function NewArr() {

    return(
            <>
            <Container style={{maxWidth: "100%"}}>
                <div className="d-flex justify-content-center">
                    <h2 className="headerdec newarrh" id="casestu"><StaggeredText text={"New Addition"}></StaggeredText></h2>
                </div>
                <Row className="mt-4">
                    <Col md={6} className="px-1 mb-3">
                        <VideoBackground videoSource={dem}>
                            <h1>Vergo</h1>
                        </VideoBackground>
                    </Col>
                    <Col md={6} xs={12}>
                        <MediaQuery minWidth={639}>
                            <Swiper
                            slidesPerView={2}
                            spaceBetween={20} // Added padding between slides
                            modules={[Navigation]}
                            navigation={{
                                nextEl: '.swiper-button-next', // Show navigation only on the right side
                            }}
                            >
                                <SwiperSlide>
                                    <CardImg
                                        className="headerimg"
                                        src={newar1}
                                        alt="Ad"
                                        style={{ height: '55vh' }} // Adjust the height value as needed
                                    />
                                    <h3>Men's Casual Wear</h3>
                                    <p>Express Your Identity</p>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <CardImg
                                        className="headerimg"
                                        src={newar2}
                                        alt="Ad"
                                        style={{ height: '55vh' }} // Adjust the height value as needed
                                    />
                                    <h3>Women's Glamour Wear</h3>
                                    <p>Dress To Impress</p>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <CardImg
                                        className="headerimg"
                                        src={newar3}
                                        alt="Ad"
                                        style={{ height: '55vh' }} // Adjust the height value as needed
                                    />
                                    <h3>Sports Wear</h3>
                                    <p>Give Your 100%</p>
                                </SwiperSlide>

                                    <div className="swiper-button-next"></div>
                                </Swiper>
                        </MediaQuery>
                        <MediaQuery maxWidth={638}>
                            <Swiper
                                slidesPerView={2}
                                spaceBetween={5} // Added padding between slides
                                modules={[Navigation]}
                                navigation={{
                                    nextEl: '.swiper-button-next', // Show navigation only on the right side
                                    prevEl: null,
                                }}
                                >
                                <SwiperSlide>
                                    <CardImg
                                        className="headerimg"
                                        src={newar1}
                                        alt="Ad"
                                        style={{ height: '35vh', objectFit: "cover"}} // Adjust the height value as needed
                                    />
                                    <h3>Men's Casual Wear</h3>
                                    <p>Express Your Identity</p>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <CardImg
                                        className="headerimg"
                                        src={newar2}
                                        alt="Ad"
                                        style={{ height: '35vh', objectFit: "cover" }} // Adjust the height value as needed
                                    />
                                    <h3>Women's Glamour Wear</h3>
                                    <p>Dress To Impress</p>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <CardImg
                                        className="headerimg"
                                        src={newar3}
                                        alt="Ad"
                                        style={{ height: '35vh', objectFit: "cover" }} // Adjust the height value as needed
                                    />
                                    <h3>Sports Wear</h3>
                                    <p>Give Your 100%</p>
                                </SwiperSlide>

                                        <div className="swiper-button-next"></div>
                            </Swiper>
                        </MediaQuery>
                    </Col>
                </Row>
            </Container>
            </>                   
    );
}

export default NewArr;