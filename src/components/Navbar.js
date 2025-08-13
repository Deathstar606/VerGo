import React, { useState, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MediaQuery from "react-responsive";
import {
  Navbar, NavbarBrand, Collapse, Nav, NavItem,
  Container, Col, Form, FormGroup, Label, Input, Button
} from "reactstrap";
import Burger from "./Burger";
import { FaUser, FaShoppingBag, FaGoogle, FaTimes } from "react-icons/fa";

export default function Example(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    toggleModal();
    props.loginUser({
      username: usernameRef.current.value,
      password: passwordRef.current.value
    });
  };

  const handleGoogleLogin = (event) => {
    event.preventDefault();
    toggleModal();
    props.googleLogin();
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  const ensureHome = (e) => {
    if (location.pathname !== "/home") {
      e.preventDefault();
      navigate("/home");
      setTimeout(() => {
        const element = document.getElementById("aboutus");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 1000);
    }
  };

  return (
    <>
      <MediaQuery maxWidth={639}>
        <Burger />
      </MediaQuery>
      <div className="d-flex justify-content-center" style={{ backgroundColor: "#EDEADF" }}>
        <div className="nav-c pt-2 pb-2">
          <Navbar light expand="md">
            <NavbarBrand href="/" className="text-dark pr-4" style={{ fontSize: "50px" }}>VerGo</NavbarBrand>
            <Collapse isOpen={isOpen} navbar>
              <Nav navbar>
                <NavItem className="nav-ele">
                  <div>Category</div>
                  <ul className="nav-sub" style={{ listStyleType: "none" }}>
                    <RouterLink to="/mens" style={{ textDecoration: "none", color: "orange" }}><li>Men</li></RouterLink>
                    <li className="text-muted">Women</li>
                  </ul>
                </NavItem>
                <NavItem className="nav-ele">
                  <div>Appeareal</div>
                  <ul className="nav-sub" style={{ listStyleType: "none" }}>
                    <li className="text-muted">Shirts</li>
                    <RouterLink to="/pants" style={{ textDecoration: "none", color: "orange" }}><li>Pants</li></RouterLink>
                    <li className="text-muted">Hoodies</li>
                  </ul>
                </NavItem>
                <NavItem className="nav-ele">
                  <ScrollLink
                    to="aboutus"
                    spy={true}
                    smooth={true}
                    offset={-40}
                    duration={500}
                    onClick={ensureHome}
                  >
                    <div>About Us</div>
                  </ScrollLink>
                </NavItem>
              </Nav>
            </Collapse>

            {/* Mobile view */}
            <MediaQuery maxWidth={638}>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {!props.auth.isAuthenticated ? (
                    <div className="mr-4" style={{ paddingTop: "2px" }} onClick={toggleModal}>
                      <FaUser className="mr-1" /> Login
                    </div>
                  ) : (
                    <div>
                      <div className="navbar-text text-dark mr-1">
                        <img
                          src={props.auth.user.photoURL}
                          alt={props.auth.user.displayName}
                          className="rounded-circle mr-2"
                          style={{ width: "30px" }}
                        />
                      </div>
                      <span onClick={handleLogout}>
                        <span className="mr-4">Signout</span>
                      </span>
                    </div>
                  )}
                </NavItem>
              </Nav>
            </MediaQuery>

            {/* Desktop view */}
            <MediaQuery minWidth={639}>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  {!props.auth.isAuthenticated ? (
                    <div onClick={toggleModal}>
                      <FaUser className="mr-3" /><span style={{ cursor: "pointer" }}>Login</span>
                    </div>
                  ) : (
                    <div style={{ position: "relative" }}>
                      <RouterLink to="/cart">
                        <FaShoppingBag color="black" className="mr-3" />
                        {props.cartLength !== undefined && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-5px",
                              right: "110px",
                              background: "red",
                              color: "white",
                              borderRadius: "50%",
                              padding: "1px 6px",
                              fontSize: "12px"
                            }}
                          >
                            {props.cartLength}
                          </span>
                        )}
                      </RouterLink>
                      <div className="navbar-text text-dark mr-1">
                        <img
                          src={props.auth.user.photoURL}
                          alt={props.auth.user.displayName}
                          className="rounded-circle mr-2"
                          style={{ width: "30px" }}
                        />
                      </div>
                      <span onClick={handleLogout}>
                        <span className="fa fa-sign-out fa-lg"></span> <span style={{ cursor: "pointer" }}>Logout</span>
                      </span>
                    </div>
                  )}
                </NavItem>
              </Nav>
            </MediaQuery>
          </Navbar>

          {/* Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="modal-back"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="d-flex justify-content-center"
                  style={{ marginTop: "20vh" }}
                  initial={{ opacity: 0, y: -70 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -70 }}
                >
                  <Container className="d-flex justify-content-center" style={{ position: "absolute" }}>
                    <Col md={5} xs={12} className="p-4" style={{ borderRadius: "20px", backgroundColor: '#edeadfde' }}>
                      <h2 className="text-center mb-4">Login</h2>
                      <Form onSubmit={handleLogin}>
                        <FormGroup>
                          <Label htmlFor="username">Email</Label>
                          <Input
                            style={{ borderRadius: "10px" }}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Your Name"
                            innerRef={usernameRef}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            style={{ borderRadius: "10px" }}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            innerRef={passwordRef}
                          />
                        </FormGroup>
                        <div className="d-flex justify-content-center pb-2 pt-1">
                          <Button onClick={handleLogin} style={{ borderRadius: "10px" }} outline type="submit">
                            Login
                          </Button>
                        </div>
                        <div className="d-flex justify-content-center pb-2">Or</div>
                        <div className="d-flex justify-content-center">
                          <Button onClick={handleGoogleLogin} style={{ borderRadius: "10px" }} outline>
                            <FaGoogle className="mr-1" /> Sign in with Google
                          </Button>
                        </div>
                        <FaTimes onClick={toggleModal} style={{ position: "absolute", top: "10", right: "10" }} />
                      </Form>
                    </Col>
                  </Container>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
