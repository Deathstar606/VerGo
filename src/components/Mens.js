import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, CardImg, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import Catlist from './Cats';
import men1 from "../images/mens/FALL-WINTER-TRENDS.jpg"
import men2 from "../images/mens/casual-dressing-tips1.jpg"
import men3 from "../images/mens/casual-men-dress-code-style-luxe-digital.jpg"
import men4 from "../images/mens/casual-dressing-tips1 phn.jpg"
import men5 from "../images/mens/FALL-WINTER-TRENDS phn.jpg"
import men6 from "../images/mens/casual-men-dress-code-style-luxe-digital phn.jpg"
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import required modules
import { EffectFade, Autoplay } from 'swiper/modules';
import './DishBreadcrumb.css';
import "./card.css"

import { Breadcrumbs } from './Details';
import MediaQuery from 'react-responsive';
import { motion } from 'framer-motion';

const Mens = (props) => {

    const [swiper, setSwiper] = useState(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (props.clothes.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    
    else if (props.clothes.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.feats.errMess}</h4>
                </div>
            </div>
        )
    }

    else if (props.clothes.clothes) {

        const catdes = props.clothes.clothes.map((cloth) => {
            return (
              <Catlist key={cloth._id} child={cloth} />
            );
          });

        return (
            <motion.div
            transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
            initial = {{x: 1000, opacity: 0}}
            animate= {{x: 0, opacity: 1}}
            exit= {{x: -1000, opacity: 0}}>
                <div style={{backgroundColor: "#EDEADF"}}>
                <Row className="m-0 g-0">
                            <Col md={4} xs={12} className="d-flex justify-content-center align-items-center px-0 pt-5 pb-5" style={{backgroundColor: "#333333"}}>
                                <h1 className='font-weight-bold text-center' style={{padding: "20px 20px 20px 20px", color: "#9a9a9a"}}>
                                    For Him... Curated Menswear
                                </h1>
                            </Col>
                            <Col md={8} xs={12} className="px-0">
                                <MediaQuery minWidth={639}>
                                    <Swiper
                                        autoplay={{
                                            delay: 5850,
                                            disableOnInteraction: false,
                                        }}
                                        effect="fade"
                                        fadeEffect={{ crossFade: true }}
                                        onSwiper={setSwiper}
                                        modules={[EffectFade, Autoplay]}
                                        speed={850}
                                        >
                                        <SwiperSlide><CardImg className='zoom-in' src={men1}/></SwiperSlide>
                                        <SwiperSlide><CardImg className='zoom-in' src={men2}/></SwiperSlide>
                                        <SwiperSlide><CardImg className='zoom-in' src={men3}/></SwiperSlide>
                                    </Swiper>
                                </MediaQuery>
                                <MediaQuery maxWidth={638}>
                                    <Swiper
                                        autoplay={{
                                            delay: 4800,
                                            disableOnInteraction: false,
                                        }}
                                        effect="fade"
                                        fadeEffect={{ crossFade: true }}
                                        onSwiper={setSwiper}
                                        modules={[EffectFade, Autoplay]}
                                        speed={1000}
                                        >
                                        <SwiperSlide><CardImg className='zoom-in' src={men4}/></SwiperSlide>
                                        <SwiperSlide><CardImg className='zoom-in' src={men5}/></SwiperSlide>
                                        <SwiperSlide><CardImg className='zoom-in' src={men6}/></SwiperSlide>
                                    </Swiper>
                                </MediaQuery>
                            </Col>
                        </Row>
                        <MediaQuery maxWidth={639}>
                            <div style={{display: "inline-block", marginBottom: "10px", marginLeft: "10px", marginTop: "10px"} }>
                                <Breadcrumbs items={[
                                    { link: '/home', active: false },
                                    { name: "Home / Mens", link: '', active: true }
                                ]} />
                            </div>
                        </MediaQuery>
                    <Container style={{maxWidth: "85%"}}>
                        <MediaQuery minWidth={640}>
                            <div style={{display: "inline-block", marginBottom: "10px", marginLeft: "10px", marginTop: "10px"} }>
                                <Breadcrumbs items={[
                                    { link: '/home', active: false },
                                    { name: "Home / Mens", link: '', active: true }
                                ]} />
                            </div>
                        </MediaQuery>
                        <Row>
                            {catdes}
                        </Row>
                    </Container>
                </div>
            </motion.div>
        )
    }
}

export default Mens;