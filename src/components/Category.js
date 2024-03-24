import React from "react";
import { Container, Row, Col, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import "./card.css"
import men from "../images/category/man-with-sunglasses-wearing-white-t-shirt-posing.jpg"
import women from "../images/category/cute-pretty-beautiful-woman-wears-loose-sweater-black-trousers-holds-her-hands-pocket.jpg"
 
function Category () {
    return (
        <Container className="lg-container pb-5">
            <Row className="mt-5 justify-content-center text-center">
                <Col md={6} className="py-2">
                    <div className="d-flex justify-content-center catcard">
                        <Link to= "/mens">
                            <div>
                                <CardImg className="catimg" src={men}/>
                                <div className="cat-body">
                                    <h4 style={{borderBottom: "1px solid #ccc", paddingBottom: "5px"}}>Men's</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Col>
                <Col md={6} className="py-2">
                    <div className="d-flex justify-content-center catcard">
                        <div>
                            <CardImg src={women} className="catimg"/>
                            <div className="cat-body">
                                <h4 style={{borderBottom: "1px solid #ccc", paddingBottom: "5px"}}>Women's</h4>
                            </div>
                        </div>
                    </div>
                </Col>        
            </Row>
        </Container>
    )
}

export default Category;