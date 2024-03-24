import {useRef} from "react";
import { Container, Row, Col, CardImg } from "react-bootstrap";
import { useInView } from "framer-motion";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";
import { StaggeredText } from "./Animations";
import dem from "../images/Demo.jpg"
import "./card.css"

function Section({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <div
            style={{
                opacity: isInView ? 1 : 0,
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
              }}>
        {children}
      </div>
    </section>
  );
}

function Dealcard({ deals }) {
    return(
        <Col md={3} className="mr-3">
            <Section>
                <div className="dealcard card-container">
                    <CardImg src={deals.image}/>
                        <div className="curd-body">
                            <h4>{deals.name}</h4>
                        </div>
                </div>
            </Section>
        </Col>
    )
}

function Deals(props) {

    const deal = props.deals.deals.map((prod) => {  
        return (
            <Dealcard deals={prod}/>
        );
    });

    if (props.deals.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }

    else if (props.deals.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.dishes.errMess}</h4>
                </div>
            </div>
        )
    }

    else
    return(
            <>
            <Container className="lg-container">
                <div className="d-flex justify-content-center">
                    <h2 className="headerdec mt-5" id="casestu"><StaggeredText text={"Deals"}></StaggeredText></h2>
                </div>
                <Row className="mt-5 d-flex justify-content-center">
                    {deal}               
                </Row>
            </Container>
            </>                   
    );
}

export default Deals;