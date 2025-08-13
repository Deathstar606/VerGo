import React, { useEffect } from 'react';
import HeroSec from './HeroSec';
import NewArr from "./NewArrival";
import Deats from './Details';
import Catlist from './Cats';
import Mens from './Mens';
import Carts from './Cart';
import RenderItem from './Featured';
import AboutUs from "./AboutUs";
import Category from "./Category";
import Footer from "./Footer";
import { Container, Row } from "react-bootstrap";
import Example from './Navbar';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleLogin, loginUser, logoutUser, fetchDeals, fetchClothes, fetchFeats,
          fetchReviews, postReview, fetchCarts, postCart, deleteCart } from '../Redux/ActionCreators';
import { Breadcrumbs } from './Details';
import { AnimatePresence, motion } from 'framer-motion';

import { MoonLoader } from 'react-spinners';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    deals: state.deals,
    feats: state.feats,
    clothes: state.clothes,
    reviews: state.reviews,
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => ({    //method defination
  fetchDeals: () => {dispatch(fetchDeals())},
  fetchFeats: () => {dispatch(fetchFeats())},
  fetchClothes: () => {dispatch(fetchClothes())},
  fetchReviews: () => dispatch(fetchReviews()),
  postReview: (clothId, rating, comment) => dispatch(postReview(clothId, rating, comment)),
  fetchCarts: () => {dispatch(fetchCarts())},
  postCart: (clothId, image, size, color, price) => dispatch(postCart(clothId, image, size, color, price)),
  deleteCart: (clothId) => {dispatch(deleteCart(clothId))},
  googleLogin: () => dispatch(googleLogin()),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
});

const Main = (props) => {
  
  const location = useLocation();

  useEffect(() => {
    props.fetchDeals();
    props.fetchFeats();
    props.fetchClothes();
    props.fetchReviews();
    props.fetchCarts();
  }, []);

  const Pants = () => {
    if (props.clothes.clothes.length > 0) {
      const pantsArray = props.clothes.clothes.filter(
        (element) => element.category === 'pant'
      );
      const parr = pantsArray.map((element) => (
        <Catlist key={element._id} child={element} />
      ));
      return (
        <motion.div
          style={{ backgroundColor: '#EDEADF' }}
          transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
          initial = {{x: 1000, opacity: 0}}
          animate= {{x: 0, opacity: 1}}
          exit= {{x: -1000, opacity: 0}}>
          <Container style={{ maxWidth: '85%' }}>
            <Row>
                        <div style={{display: "inline-block", marginBottom: "10px", marginLeft: "10px"} }>
                            <Breadcrumbs items={[
                                { link: '/home', active: false },
                                { name: "Home / Pants", link: '', active: true }
                            ]} />
                        </div>
            </Row>
            <Row>{parr}</Row>
          </Container>
        </motion.div>
      );
    }
  };

  const ClothesId = () => {
    const match = useLocation();
    return (
      <motion.div
        transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
        initial = {{x: 1000, opacity: 0}}
        animate= {{x: 0, opacity: 1}}
        exit= {{x: -1000, opacity: 0}}>
        <div style={{ backgroundColor: '#EDEADF' }}>
          <Deats
            clothes={
              props.clothes.clothes.filter(
                (cloth) => cloth._id === match.pathname.split('/')[1]
              )[0]
            }
            reviews={
              props.reviews.reviews.filter(
                (rev) => rev.cloth === match.pathname.split('/')[1]
              )
            }
            similar={props.clothes}
            isLoading={props.clothes.isLoading}
            errMess={props.clothes.errMess}
            postReview={props.postReview}
            postCart={props.postCart}
          />
        </div>
      </motion.div>
    );
  };

  const Home = () => {
    if (
      props.feats.feats.length > 0 &&
      props.clothes.clothes.length > 0
    ) {
      return (
        <>
          <motion.div
            transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
            initial = {{x: 1000, opacity: 0}}
            animate= {{x: 0, opacity: 1}}
            exit= {{x: -1000, opacity: 0}}>
            <HeroSec />
              <div style={{ backgroundColor: '#EDEADF' }}>
                <NewArr />
                <RenderItem
                  feats={props.feats}
                  clothes={props.clothes}
                />
                <AboutUs />
                <Category />
              </div>
          </motion.div>
        </>
      );
    }
  };

  if (props.clothes.isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
        <MoonLoader color="black" size={70} />
      </div>
    );
  }

  else 
  return (
    <>
      <Example
        auth={props.auth}
        loginUser={props.loginUser}
        logoutUser={props.logoutUser}
        googleLogin={props.googleLogin}
        cartLength={props.auth.isAuthenticated ? props.cart.cart.length : undefined}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/home" element={<Home />} />
          <Route path="/pants" element={<Pants />} />
          <Route
            path="/mens"
            element={<Mens clothes={props.clothes} />}
          />
          <Route
            path="/cart"
            element={
              <Carts
                clothes={props.clothes}
                cart={props.cart}
                deleteCart={props.deleteCart}
              />
            }
          />
          <Route path="/:clothId" element={<ClothesId />} />
          <Route
            path="*"
            element={<Navigate to="/home" replace />}
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);