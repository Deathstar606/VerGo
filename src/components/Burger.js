import React, {useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container, Row, Col } from 'reactstrap';
import { stack as Menu } from 'react-burger-menu';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './Burger.css';

export default function Burger({auth, cartLength}) {
  console.log("Burger component rendered with auth:", auth, "and cartLength:", cartLength);
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  // Function to close menu
  const closeMenu = () => setMenuOpen(false);
  const [openMenu, setOpenMenu] = useState(null);

  const handleToggle = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
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
      }, 1300);
    }
  };

  return (
    <Menu right isOpen={menuOpen} onStateChange={(state) => setMenuOpen(state.isOpen)}>
      <Container>
        <Row>
          <Col xs={12}>
            <div>
              <RouterLink to="/home" style={{ color: 'white' }} onClick={closeMenu} >
                Home
              </RouterLink>
            </div>
          </Col>
          {auth && (
            <Col xs={12}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <RouterLink to="/cart" style={{ color: 'white', display: 'inline-flex', alignItems: 'center' }} onClick={closeMenu}>
                  Cart
                  <span
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      padding: '0.2rem 0.5rem',
                      marginLeft: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      minWidth: '20px',
                      textAlign: 'center',
                      display: 'inline-block',
                      lineHeight: '1'
                    }}
                  >
                    {cartLength}
                  </span>
                </RouterLink>
              </div>
            </Col>
          )}
          <Col xs={12}>
            <div onClick={() => handleToggle('category')} style={{color: "white"}}>
              <div className={`burg-menu pr-2 pt-1`}>
                Category
              </div>
              <AnimatePresence>
                {openMenu === 'category' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ paddingTop: "10px" }}
                  >
                    <RouterLink to="/mens" style={{textDecoration: "none", color: "inherit"}} onClick={closeMenu}>
                      <h5 style={{fontWeight: "400px"}} className='ml-3'>Men</h5>
                    </RouterLink>
                    <RouterLink to="/" style={{textDecoration: "none", color: "inherit"}} onClick={closeMenu}>
                      <h5 style={{fontWeight: "400px"}} className='ml-3'>Women</h5>
                    </RouterLink>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Col>
          <Col xs={12}>
            <div onClick={() => handleToggle('apparel')} style={{color: "white"}}>
              <div className={`burg-menu pr-2 pt-1`}>
                Apparel
              </div>
              <AnimatePresence>
                {openMenu === 'apparel' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ paddingTop: "10px" }}
                  >
                    <RouterLink to="/" style={{textDecoration: "none", color: "inherit"}} onClick={closeMenu}>
                      <h5 style={{fontWeight: "400px"}} className='ml-3'>Shirt</h5>
                    </RouterLink>
                    <RouterLink to="/pants" style={{textDecoration: "none", color: "inherit"}} onClick={closeMenu}>
                      <h5 style={{fontWeight: "400px"}} className='ml-3'>Pant</h5>
                    </RouterLink>
                    <RouterLink to="/" style={{textDecoration: "none", color: "inherit"}} onClick={closeMenu}>
                      <h5 style={{fontWeight: "400px"}} className='ml-3'>Hoodie</h5>
                    </RouterLink>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Col>
          <Col xs={12}>
            <div className='pt-1'>
              <ScrollLink
                to="aboutus"
                spy={true}
                smooth={true}
                offset={-40}
                duration={500}
                onClick={(e) => {
                  ensureHome(e);   // your existing function
                  closeMenu();     // close the burger menu
                }}
                style={{color: "white"}}
                >
                  About Us
                </ScrollLink>
            </div>
          </Col>
        </Row>
      </Container>
    </Menu>
  );
}
