import React from 'react';
import { Container, Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, 
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import Burger from './Burger';
import MediaQuery from 'react-responsive';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaGoogle, FaTimes, FaUser, FaShoppingBag, FaSignInAlt } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
  } 

  handleLogin(event) {
    this.toggleModal();
    this.props.loginUser({username: this.username.value, password: this.password.value});
    event.preventDefault();

  }

  handleGoogleLogin(event) {
      this.toggleModal();
      this.props.googleLogin();
      event.preventDefault();
  }

  handleLogout() {
      this.props.logoutUser();
  }

  render() {
    return (
      <>
        <MediaQuery maxWidth={639}>
          <Burger/>
        </MediaQuery>
        <div className='d-flex justify-content-center' style={{backgroundColor: "#EDEADF"}}>
          <div className='nav-c pt-2 pb-2'>
            <Navbar light expand="md">
              <NavbarBrand href="/" className='text-dark pr-4'>VerGo</NavbarBrand>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav navbar>
                  <NavItem className='nav-ele'>
                    <div>Category</div>
                    <ul className='nav-sub' style={{ listStyleType: 'none' }}>
                        <RouterLink to="/mens"><li>Men</li></RouterLink>
                        <li>Women</li>
                    </ul>
                  </NavItem>
                  <NavItem className='nav-ele'>
                    <div>Appeareal</div>
                    <ul className='nav-sub' style={{ listStyleType: 'none' }}>
                      <li>Shirts</li>
                      <RouterLink to="/pants"><li>Pants</li></RouterLink>
                      <li>Hoodies</li>
                    </ul>
                  </NavItem>
                  <NavItem className='nav-ele'>
                    <ScrollLink to="aboutus" spy={true} smooth={true} offset={-40} duration={500}><div>About Us</div></ScrollLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <MediaQuery maxWidth={638}>
              <Nav className="ml-auto" navbar> 
                  <NavItem>
                    {!this.props.auth.isAuthenticated ?
                      <div className='mr-4' style={{paddingTop: "2px"}} onClick={this.toggleModal}>
                        <FaUser className='mr-1'/> Login
                        {this.props.auth.isFetching ?
                            {/* <i class="fa fa-sign-in" aria-hidden="true"></i> */}
                          : null
                        }
                      </div>
                      :
                      <div>
                        <div className="navbar-text text-dark mr-1">   
                          <img
                            src={this.props.auth.user.photoURL}
                            alt={this.props.auth.user.displayName}
                            className="rounded-circle mr-2"
                            style={{ width: '30px' }}
                          />
                        Signout
                        </div>
                        <span onClick={this.handleLogout}>
                          <span className="fa fa-sign-out fa-lg mr-4"></span>
                          {this.props.auth.isFetching ?
                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                            : null
                          }
                        </span>
                      </div>
                    }
                  </NavItem>
                </Nav>
              </MediaQuery>
              <MediaQuery minWidth={639}>
              <Nav className="ml-auto" navbar> 
                  <NavItem>
                    {!this.props.auth.isAuthenticated ?
                      <div onClick={this.toggleModal}>
                        <FaUser className='mr-4'/>Login
                        {this.props.auth.isFetching ?
                            <i class="fa fa-sign-in" aria-hidden="true"></i>
                          : null
                        }
                      </div>
                      :
                      <div>
                        <RouterLink to= "/cart"><FaShoppingBag className='mr-3'/></RouterLink>
                        <div className="navbar-text text-dark mr-3">    
                          <img
                            src={this.props.auth.user.photoURL}
                            alt={this.props.auth.user.displayName}
                            className="rounded-circle mr-2"
                            style={{ width: '30px' }}
                          />
                        </div>
                        <span onClick={this.handleLogout}>
                          <span className="fa fa-sign-out fa-lg"></span> Logout
                          {this.props.auth.isFetching ?
                            <span className="fa fa-spinner fa-pulse fa-fw"></span>
                            : null
                          }
                        </span>
                      </div>
                    }
                  </NavItem>
                </Nav>
              </MediaQuery>
            </Navbar>
            <AnimatePresence>
              {this.state.isModalOpen && (
                <motion.div 
                className='modal-back'
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}>
                    <motion.div 
                      className='d-flex justify-content-center m-5'
                      initial={{ opacity: 0, y: -70}}
                      animate={{ opacity: 1, y: 0}}
                      exit={{ opacity: 0, y: -70}}>
                        <Container className='d-flex justify-content-center' style={{position: "absolute"}}>
                            <Col md={5} xs={12} className="p-4" style={{borderRadius: "20px", backgroundColor: "whitesmoke"}}>
                              <h2 className="text-center mb-4">Login</h2>
                              <Form onSubmit={this.handleLogin}>
                              <FormGroup>
                                <Label htmlFor="username">Email</Label>
                                <Input type="text" id="username" name="username"
                                  placeholder='Your Name'
                                  innerRef={(input) => this.username = input} />
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                  placeholder='Password'
                                  innerRef={(input) => this.password = input} />
                              </FormGroup>
                                <div className='d-flex justify-content-center pb-2'>
                                  <Button variant="primary" type="submit">
                                    Login
                                  </Button>
                                </div>
                                <div className='d-flex justify-content-center pb-2'>Or</div>
                                <div className='d-flex justify-content-center'>
                                  <Button onClick={this.handleGoogleLogin} variant="secondary outline">
                                    <FaGoogle className="mr-1" /> Sign in with Google
                                  </Button>
                                </div>
                                <FaTimes onClick={this.toggleModal} style={{position: "absolute", top: "10", right: "10"}}/>
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
}