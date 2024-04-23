import React, { useState } from 'react';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, CardImg, Button, ButtonGroup, Form, FormGroup, Input } from 'reactstrap';
import { Loading } from './LoadingComponent';
import Catlist from './Cats';
import MediaQuery from 'react-responsive';
import { Link } from "react-router-dom";
import ReactStars from 'react-stars';
import './details.css'

function RenderRev ({reviews}) {
    return (
        <ul className="list-unstyled">
            {reviews.map((rev) => {
                return (
                        <li>
                        <p>{rev.review}</p>
                        <p>{rev.rating} ⭐</p>
                        <p>-- {rev.author.firstname} {rev.author.lastname} </p>
                        </li>
                );
            })}
        </ul>
    )
}

const Deats = (props) => {

    const [shirtColor, setShirtColor] = useState(
        props.clothes ? props.clothes.colors[0] : ""
      );
      
      const handleShirtColorChange = (color) => {
        setShirtColor(color);
      };

    const [selectedSize, setSelectedSize] = useState(''); // State to keep track of selected shirt size

    const [fullscreenImage, setFullscreenImage] = useState("");

    const handleClick = (imageUrl) => {
        setFullscreenImage(imageUrl);
    };

    const handleCloseFullscreen = () => {
        setFullscreenImage(null);
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = () => {
        props.postReview(props.clothes._id, rating, review);
    };

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

    else if (props.clothes != null) {

        const handleAddToCart = () => {
            props.postCart(props.clothes._id, props.clothes.images[shirtColor][0], selectedSize, shirtColor, props.clothes.price)
            alert("Added To Cart")
        };

        const Color = props.clothes.colors.map((element) => {
            return (
                <div style={{
                    width: '30px',
                    height: '30px',
                    backgroundColor: element,
                  }} 
                  className="rounded-circle color-circle mr-2" 
                  onClick={() => handleShirtColorChange(element)}/>
            );
        });
    
        const Sizes = props.clothes.sizes.map((size) => {
            return (
                <Button outline color="dark" onClick={() => handleSizeChange(size)} active={selectedSize === size}>{size}</Button>
            )
        })
        
        const Img = props.clothes.images[shirtColor].map((element) => {
            return (<>
                        <MediaQuery minWidth={639}>
                            <div className="img-box" 
                            style={{backgroundImage: `url(${element})`, backgroundPosition: "center", backgroundSize: "cover"}}
                            onClick={() => handleClick(element)}></div>
                        </MediaQuery>
                        <MediaQuery maxWidth={638}>
                                <Col xs={6} className="px-1">
                                    <CardImg  style={{backgroundPosition: "center", backgroundSize: "cover", marginBottom: "5px", borderRadius: "15px", height: "35vh"}} src={element}
                                              onClick={() => handleClick(element)}/>
                                </Col>
                        </MediaQuery>
                    </>
            );
        });

        const Similar = props.similar.clothes.map((element) => {
            if (element.category == props.clothes.category && element._id != props.clothes._id) {
                return (
                    <Catlist key={element._id} child={element}/>
                )
            }
        })
    
        return (
            <Container className='lg-container'>
                <Row>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.clothes.name}</BreadcrumbItem>
                    </Breadcrumb>
                </Row>
                <Row>
                    <MediaQuery minWidth={639}>
                        <Col md={9} xs={4}>
                            <div className="gallery">
                                {Img}
        
                                {fullscreenImage && (
                                    <div className="fullscreen-preview" onClick={handleCloseFullscreen}>
                                        <img src={fullscreenImage} alt="Full Screen Preview" />
                                    </div>
                                )}
                            </div>
                        </Col>
                    </MediaQuery>
                    <MediaQuery maxWidth={638}>
                        {Img}

                        {fullscreenImage && (
                            <div className="fullscreen-preview" onClick={handleCloseFullscreen}>
                                <img src={fullscreenImage} alt="Full Screen Preview" />
                            </div>
                        )}
                    </MediaQuery>
                    <Col md={3}>
                        <h4>{props.clothes.name}</h4>
                        <h5 className='text-muted'>{props.clothes.price} $</h5>
                        <p>{props.clothes.description}</p>
                            <div className="mt-3 d-flex">
                                {Color}
                            </div>  
                        <div className="mt-3">
                            <ButtonGroup>
                                {Sizes}
                            </ButtonGroup>
                        </div>
                        <div className="mt-3">
                            <Button color="dark" onClick={handleAddToCart}>Add to Cart</Button>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                <Col>
                    <h5>Add a Review</h5>
                    <Row className='mt-4'>
                        <Col md={9}>
                        <ReactStars
                                className='mb-2'
                                count={5} // Number of stars
                                value={rating} // Current rating
                                onChange={handleRatingChange} // Handle rating change
                                size={24} // Size of the stars
                                activeColor="#ffd700" // Color of the active star
                            />
                            <Form>
                                <FormGroup>
                                    <Input
                                        type="textarea"
                                        placeholder="Write your review here"
                                        style={{
                                            backgroundColor: "#EDEADF",
                                            borderColor: '#CDCDCD',
                                            borderRadius: '7px',
                                            padding: '10px',
                                            minHeight: '100px',
                                            overflow: 'hidden',
                                            resize: 'none'
                                        }}
                                        onChange={handleReviewChange}
                                    />
                                </FormGroup>
                            </Form>
                        </Col>
                        <MediaQuery minWidth={639}>
                            <Col md={3} className='mt-5'>
                                <Button color="dark" onClick={handleSubmit}>
                                    Submit Review
                                </Button>
                            </Col>
                        </MediaQuery>
                        <MediaQuery maxWidth={638}>
                            <Col md={3} className='mt-1 mb-4'>
                                <Button color="dark" onClick={handleSubmit}>
                                    Submit Review
                                </Button>
                            </Col>
                        </MediaQuery>
                    </Row>
                    <RenderRev reviews={props.reviews}/>
                </Col>
            </Row>
            <h2>You Might Also Like</h2>
            <Row className='mt-4'>
                {Similar}
            </Row>
            </Container>
        );
    }
    
    else
        return(
            <div></div>
        );
};

export default Deats;