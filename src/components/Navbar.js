import React from 'react';
import { Container, Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, 
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label } from 'reactstrap';
import Burger from './Burger';
import MediaQuery from 'react-responsive';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

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
              <RouterLink to="/home"><NavbarBrand className='text-dark pr-4'>VerGo</NavbarBrand></RouterLink>
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
                      <li>Pants</li>
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
                      <div onClick={this.toggleModal}>
                        <span className="fa fa-solid fa-user fa-lg mr-5"></span>
                        {this.props.auth.isFetching ?
                            <i class="fa fa-sign-in" aria-hidden="true"></i>
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
                        <span className="fa fa-solid fa-user fa-lg mr-3"></span>Login
                        {this.props.auth.isFetching ?
                            <i class="fa fa-sign-in" aria-hidden="true"></i>
                          : null
                        }
                      </div>
                      :
                      <div>
                        <RouterLink to= "/cart"><i class="fa fa-shopping-cart mr-4" aria-hidden="true"></i></RouterLink>
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
          </div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleLogin}>
                <FormGroup>
                  <Label htmlFor="username">Email</Label>
                  <Input type="text" id="username" name="username"
                    innerRef={(input) => this.username = input} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" id="password" name="password"
                    innerRef={(input) => this.password = input} />
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" name="remember"
                      innerRef={(input) => this.remember = input} />
                    Remember me
                  </Label>
                </FormGroup>
                <Button type="submit" value="submit" color="primary">Login</Button>
              </Form>
              <p></p>
              <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Login with Google</Button>
            </ModalBody>
          </Modal>
        </div>
      </>
    );
  }
}
