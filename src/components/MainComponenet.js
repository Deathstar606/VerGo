import React, { Component } from 'react';
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
import { Container, Row, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Example from './Navbar';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleLogin, loginUser, logoutUser, fetchDeals, fetchClothes, fetchFeats,
          fetchReviews, postReview, fetchCarts, postCart, deleteCart } from '../Redux/ActionCreators';
import './transitions.css'; // Import your CSS file for transitions

const mapStateToProps = state => {
  return {
    auth: state.auth,
    deals: state.deals,
    feats: state.feats,
    clothes: state.clothes,
    reviews: state.reviews,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => ({    //method defination
  fetchDeals: () => {dispatch(fetchDeals())},
  fetchFeats: () => {dispatch(fetchFeats())},
  fetchClothes: () => {dispatch(fetchClothes())},
  fetchReviews: () => dispatch(fetchReviews()),
  postReview: (clothId, rating, comment) => dispatch(postReview(clothId, rating, comment)),
  fetchCarts: () => {dispatch(fetchCarts())},
  postCart: (clothId, image, size, color) => dispatch(postCart(clothId, image, size, color)),
  deleteCart: (clothId) => {dispatch(deleteCart(clothId))},
  googleLogin: () => dispatch(googleLogin()),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser())
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDeals();
    this.props.fetchFeats();
    this.props.fetchClothes();
    this.props.fetchReviews();
    this.props.fetchCarts();
  }

  render() {

    const Pants = () => {
      if (this.props.clothes.clothes.length > 0) {
        const pantsArray = this.props.clothes.clothes.filter(element => element.category === "pant");
        const parr = pantsArray.map(element => (
          <Catlist key={element._id} child={element} />
        ));
      return (
        <Container style={{maxWidth: "85%"}}>
          <Row>
            <Breadcrumb className="pl-3 pt-3">
                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Pants</BreadcrumbItem>
            </Breadcrumb>
          </Row>
          <Row>
            {parr}
          </Row>
        </Container>
      )
      }
    }
    
    const ClothesId = ({match}) => {
        return(
        <div style={{backgroundColor: "#EDEADF"}}>
          <Deats clothes={this.props.clothes.clothes.filter((cloth) => cloth._id === match.params.clothId)[0]}
            reviews={this.props.reviews.reviews.filter((rev) => rev.cloth === match.params.clothId)}
            similar = {this.props.clothes}
            isLoading={this.props.clothes.isLoading}
            errMess={this.props.clothes.errMess}
            postReview={this.props.postReview}
            postCart={this.props.postCart}/>
        </div>
        )
    }

    const Home = () => {
      if (this.props.feats.feats.length > 0 && this.props.clothes.clothes.length > 0) {
        return (
          <>
            <HeroSec/>
            <div style={{backgroundColor: "#EDEADF"}}>
              <NewArr/>
              <RenderItem feats={this.props.feats} clothes={this.props.clothes}/>
              <AboutUs/>
              <Category/>
            </div>
          </>
        )
      }
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      this.props.auth.isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/home',
            state: { from: props.location }
          }} />
    )} />
  );

    return (
      <>
        <Example auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          googleLogin={this.props.googleLogin}/>
          
        <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/pants" component={Pants}/>
            <Route path="/mens" component={() => <Mens clothes={this.props.clothes}/>}/>
            <PrivateRoute exact path="/cart" component={() => <Carts cart={this.props.cart} deleteCart={this.props.deleteCart}/>} />
            <Route exact path="/:clothId" component={ClothesId} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer/>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
