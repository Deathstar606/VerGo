import React from 'react';
import { CardImg, Col, Container, Row } from 'react-bootstrap';
import { SectionXNeg } from './Animations';
import about from "../images/About.png"

const AboutUs = () => {
  return (
    <div style={{backgroundColor: "#E7D9BF", padding: "50px 0px 50px 0px", marginTop: "70px"}}>
      <Container id="aboutus" className='about-container'>
        <Row>
          <Col md={6}>
            <SectionXNeg>
              <CardImg src={about}/>
            </SectionXNeg>
          </Col>
          <Col md={6} className='d-flex align-items-center'>
            <div className='mt-4'>
              <section className='scroll-rev'>
                  <h4>
                    <span>
                      Elevate your style effortlessly with our curated collection of clothing, accessories, and footwear.
                      Stay ahead of the fashion curve with our trend forecasts and style guides.
                      Join our community and discover endless inspiration for expressing your unique identity.
                    </span>
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
