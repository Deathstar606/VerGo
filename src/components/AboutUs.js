import React, { useEffect, useState } from 'react';
import { CardImg, Col, Container, Row } from 'react-bootstrap';
import { SectionXNeg } from './Animations';
import about from "../images/About.png";
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutUs = () => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 639);
    };

    handleResize(); // Check initial window width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const backgroundSizeDesk = useTransform(
    scrollYProgress,
    [0.54, 0.69],
    ['0% 100%', '100% 100%']
  );
  const backgroundSizePhn = useTransform(
    scrollYProgress,
    [0.57, 0.69],
    ['0% 100%', '100% 100%']
  );

  return (
    <div style={{ backgroundColor: "#E7D9BF", padding: "50px 0px 50px 0px", marginTop: "70px" }}>
      <Container id="aboutus" className='about-container'>
        <Row>
          <Col md={6}>
            <SectionXNeg>
              <CardImg src={about} />
            </SectionXNeg>
          </Col>
          <Col md={6} className='d-flex align-items-center'>
            <div className='mt-4'>
              <section>
                <h4>
                  <motion.span
                    style={{
                      fontWeight: "500",
                      fontSize: "clamp(20px, 2vw, 34px)",
                      color: "hsla(0, 9%, 33%, 0.3)",
                      backgroundClip: "text",
                      backgroundRepeat: "no-repeat",
                      backgroundImage: "linear-gradient(90deg, rgb(0, 0, 0), rgb(0, 0, 0))",
                      backgroundSize: isMobile ? backgroundSizePhn : backgroundSizeDesk,
                    }}
                  >
                    Elevate your style effortlessly with our curated collection of clothing, accessories, and footwear. Stay ahead of the fashion curve with our trend forecasts and style guides. Join our community and discover endless inspiration for expressing your unique identity.
                  </motion.span>
                </h4>
              </section>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;