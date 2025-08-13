import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from './Details';
import { Col, Button, CardImg, Row, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { motion,AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import MediaQery from 'react-responsive';

function RenderMenuItem ({ child, deleteCart, quantity, handleSelect, name }) {
   return (
            <>
            <Col md={6} xs={12} className='d-flex mb-5'>
                <Col md={6}>
                    <div className="cart-container">
                        <CardImg src={child.image} style={{ borderRadius: "25px" }} />
                        <div className="overlay">
                            <span style={{cursor: "pointer"}} className="close-icon" onClick={() => deleteCart(child.clothid)}>
                            &#10005;
                            </span>
                        </div>
                    </div>
                </Col>
                <Col md={6} className='d-flex align-items-center'>
                    <div>
                        <Link to={`/${child.clothid}`}>
                            <h4 style={{color: "black"}}>{name}</h4>
                        </Link>
                        <h5 className="text-muted">{child.price}<span>$</span></h5>
                        <p>
                            {child.size}
                            <span className="ml-2">{child.color}</span>
                        </p>
                        <DropdownButton
                            id={`quantity-dropdown-${child.clothid}`} // Use a unique ID for each dropdown
                            title={`Quantity: ${quantity}`}
                            onSelect={handleSelect} // Pass the event key to handleSelect
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

function Order ({child, quantity, name}) {
    return(
        <>
            <Row className='border-bottom pb-2'>
                <Col md={2} xs={4} className='p-2'>
                    <CardImg style={{borderRadius: "15px"}} src={child.image}/>
                </Col>
                <Col md={7} xs={6} className='d-flex align-items-center'>
                    <div>
                        <div>{name}</div>
                        <div className='d-flex'>Size: {child.size}{" ---- "}Color: {child.color}</div>
                    </div>
                </Col>
                <Col md={3} className='d-flex align-items-center justify-content-end'>
                    <div>$ {child.price} * {quantity}</div>
                </Col>
            </Row>
        </>
    )
}

const Carts = (props) => {

    const [modal, setModal] = useState(false);

    const [quantityMap, setQuantityMap] = useState({});

    const handleSelect = (eventKey, productId) => {
        setQuantityMap((prevQuantityMap) => ({
          ...prevQuantityMap,
          [productId]: parseInt(eventKey),
        }));
      };

    useEffect(() => {
        if (props.cart.cart) {
            const initialQuantityMap = {};
            props.cart.cart.forEach((element) => {
                initialQuantityMap[element.clothid] = 1;
            });
            setQuantityMap(initialQuantityMap);
        }
    }, [props.cart.cart]);

    const handleShow = () => {
        setModal(true);
      };
    
      const handleHide = () => {
        setModal(false);
        setSelectedItems([]);
      };

    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (event, price) => {
        console.log(price)
        if (event.target.checked) {
          setSelectedItems([...selectedItems, price]);
        } else {
          const index = selectedItems.findIndex((p) => p === price);
          if (index !== -1) {
            const updatedItems = [...selectedItems];
            updatedItems.splice(index, 1);
            setSelectedItems(updatedItems);
          }
        }
      };

const Pay = () => {
    alert("Only Demo Application no Payment Method")
}

const total = selectedItems.map(price => price).reduce((acc, price) => acc + price, 0);

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
        // Find matching cloth in props.clothes.clothes
        const matchingCloth = props.clothes.clothes.find(
            (cloth) => cloth._id === element.clothid
        );

            return (
                <RenderMenuItem
                key={element.clothid}
                child={element}
                deleteCart={props.deleteCart}
                quantity={quantityMap[element.clothid] || 1}
                handleSelect={(eventKey) =>
                    handleSelect(eventKey, element.clothid)
                }
                name={matchingCloth.name} 
                />
            );
        });

        const prod = props.cart.cart.map((element) => {
        let val = 0;

        if (Object.keys(quantityMap).length > 0) {
            Object.keys(quantityMap).forEach((key) => {
            if (key === element.clothid) {
                val = quantityMap[element.clothid] * element.price;
            }
            });

            // Find the matching product in props.clothes.clothes
            const matchingCloth = props.clothes.clothes.find(
            (cloth) => cloth._id === element.clothid
            );

            return (
            <Row className="d-flex p-2 mr-1 ml-1 mt-1" key={element.clothid}>
                <div>
                <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, val)}
                />
                </div>
                <Col md={10} xs={12}>
                <Order
                    child={element}
                    quantity={quantityMap[element.clothid]}
                    name={matchingCloth.name} // Pass name to Order
                />
                </Col>
            </Row>
            );
        }
        });

        return(
            <motion.div
            transition={{duration: 0.5, type: "tween", ease: "easeIn"}}
            initial = {{x: 1000, opacity: 0}}
            animate= {{x: 0, opacity: 1}}
            exit= {{x: -1000, opacity: 0}}>
                <div style={{backgroundColor: "#EDEADF"}}>
                    <Container className='lg-container'>
                        <Row className='pt-2'>
                            <div style={{display: "inline-block", marginBottom: "10px", marginLeft: "10px", marginTop: "10px"} }>
                                <Breadcrumbs items={[
                                    { link: '/home', active: false },
                                    { name: "Home / Mens", link: '', active: true }
                                ]} />
                            </div>
                        </Row>
                        <Row>
                            {cloth}
                        </Row>
                        <div className='d-flex justify-content-end pb-4'>
                            <Button onClick={handleShow} variant="dark">
                                Check Out <span className="ml-2">&#8594;</span>
                            </Button>
                            <AnimatePresence>
                                {modal && (
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
                                        <MediaQery minWidth={640}>
                                            <Container style={{position: "absolute", backgroundColor: '#edeadfde', width: "40%", borderRadius: "20px"}}>
                                                {prod}
                                                <Row className='p-3'>
                                                    <Col md={8} xs={7}><Button onClick={Pay} className='m-2 btn-sm btn-dark'>Proceed To Pay</Button></Col>
                                                    <Col md={3} xs={3}>
                                                        <div className='mt-1 d-flex justify-content-end'>Total: ${total.toFixed(2)}</div>
                                                    </Col>
                                                    <FaTimes onClick={handleHide} style={{position: "absolute", top: "15", right: "15"}}/>
                                                </Row>
                                            </Container>
                                        </MediaQery>
                                        <MediaQery maxWidth={639}>
                                            <Container style={{position: "absolute", backgroundColor: '#edeadfde', width: "90%", borderRadius: "20px"}}>
                                                {prod}
                                                <Row className='p-3'>
                                                    <Col md={8} xs={7}><Button onClick={Pay} className='m-2 btn-sm btn-dark'>Proceed To Pay</Button></Col>
                                                    <Col md={3} xs={3}>
                                                        <div className='mt-1 d-flex justify-content-end'>Total: ${total.toFixed(2)}</div>
                                                    </Col>
                                                    <FaTimes onClick={handleHide} style={{position: "absolute", top: "15", right: "15"}}/>
                                                </Row>
                                            </Container>
                                        </MediaQery>
                                    </motion.div>
                                </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </Container>
                </div>
            </motion.div>
        );
    }
    
    else {
        return(
            <div className="d-flex justify-content-center align-items-center" style={{backgroundColor: "#EDEADF", height: "50vh"}}>
                <h4 className='p-5'>Your Cart is Empty</h4>
            </div>
        )
    }
}
export default Carts;