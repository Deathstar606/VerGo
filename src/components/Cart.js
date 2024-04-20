import React, { useState, useEffect } from 'react';
import { Col, Breadcrumb, BreadcrumbItem, Button, CardImg, Row, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { motion } from 'framer-motion';

function RenderMenuItem ({child, deleteCart}) {

    const [quantity, setQuantity] = useState(1);

    const handleSelect = (eventKey) => {
      setQuantity(parseInt(eventKey));
    };

   return (
            <>
            <Col md={6} xs={12} className='d-flex mb-5'>
                <Col md={6}>
                    <div className="cart-container">
                        <CardImg src={child.image} style={{ borderRadius: "25px" }} />
                        <div className="overlay">
                            <span className="close-icon" onClick={() => deleteCart(child.clothid)}>
                            &#10005;
                            </span>
                        </div>
                    </div>
                </Col>
                <Col md={6} className='d-flex align-items-center'>
                    <div>
                        <Link to={`/${child.clothid}`}>
                            <h4>Name</h4>
                        </Link>
                        <h5 className="text-muted">Price</h5>
                        <p>
                            {child.size}
                            <span className="ml-2">{child.color}</span>
                        </p>
                        <DropdownButton
                            id="quantity-dropdown"
                            title={`Quantity: ${quantity}`}
                            onSelect={handleSelect}
                            variant="outline-dark"
                        >
                            <Dropdown.Item eventKey="1">1</Dropdown.Item>
                            <Dropdown.Item eventKey="2">2</Dropdown.Item>
                            <Dropdown.Item eventKey="3">3</Dropdown.Item>
                            <Dropdown.Item eventKey="4">4</Dropdown.Item>
                            <Dropdown.Item eventKey="5">5</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </Col>
            </Col>
            </>
    );
}

const Carts = (props) => {

    if (props.cart.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.cart.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.favo.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.cart.cart[0]) {

        const cloth = props.cart.cart.map((element) => {
        
            return (
                <RenderMenuItem child={element} deleteCart={props.deleteCart}/>
            )
        })

        return(
            <motion.div
            transition={{delay: 0.2, duration: 1, type: "tween", ease: "easeIn"}}
            exit= {{x: -1000, opacity: 0}}>
                <div style={{backgroundColor: "#EDEADF"}}>
                    <Container className='lg-container'>
                        <Row className='pt-2'>
                            <Breadcrumb>
                                <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active>Cart</BreadcrumbItem>
                            </Breadcrumb>
                        </Row>
                        <Row>
                            {cloth}
                        </Row>
                        <div className='d-flex justify-content-end pb-4'>
                            <Button variant="dark">
                                Check Out <span className="ml-2">&#8594;</span>
                            </Button>
                        </div>
                    </Container>
                </div>
            </motion.div>
        );
    }
    
    else {
        return(
            <div className="d-flex justify-content-center" style={{backgroundColor: "#EDEADF"}}>
                <h4 className='p-5'>Your Cart is Empty</h4>
            </div>
        )
    }
}
export default Carts;