import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { stack as Menu } from 'react-burger-menu'
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import "./Burger.css"

class Burger extends React.Component {

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu right>
        <Container>
          <Row>
            <Col xs={12}>
              <a id="home" href="/">Home</a>
            </Col>
            <Col xs={12}>
              <RouterLink to="/cart" style={{maxWidth: "100%"}} spy={true} smooth={true} offset={-40} duration={500}>Carts</RouterLink>
            </Col>
            <Col xs={12}>
              <ScrollLink to="aboutus" spy={true} smooth={true} offset={-40} duration={500}>About Us</ScrollLink>
            </Col>
          </Row>
        </Container>
      </Menu>
    );
  }
}

export default Burger