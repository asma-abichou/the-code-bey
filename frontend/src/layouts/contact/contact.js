import React from "react";
import "./Contact.css"; //importing css style
import { Col, Form, Row, Button } from "react-bootstrap"; //importing BOOTSTRAP
import { useOutletContext } from "react-router-dom";
import { useLayoutEffect } from "react";
import Footer from "../../components/footer";
import img from "../../static/images/hawa3.png";
import "./Contact.scss";
const Contact = () => {
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, []);

  return (
    <main className="contact" data-aos="fade">
      <div className="container">
        <div className="contact-heading-box">
          <h2>We’re Here to Help You</h2>
          <p className="para">
            We always want to hear from you! Let us know how we can best help
            you and we'll do our very best.
          </p>
          <img src={img} className="logoo"></img>
        </div>
        {/*-----------------------INPUT FIELDS--------------------------*/}
        <Form className="full-width mx-auto pb-4">
          <Col xs={1} md={2} className="mb-3">
            <Row>
              <Form.Group
                className="sm-mb"
                as={Col}
                controlId="formGridPassword"
              >
                <Form.Label className="text-white contact">
                  Full Name :{" "}
                </Form.Label><br></br>
                <Form.Control type="text" placeholder="Full Name " />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="text-white">Email : </Form.Label><br></br>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Row>
          </Col>
          <Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label className="text-white">Address : </Form.Label><br></br>
              <Form.Control type="text" placeholder="jammel,monastir" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            Tell us a few words :{" "}
            <Form.Control
              as="textarea"
              placeholder=""
              style={{ height: "150px" }}
            />
          </Form.Group>

          <Button variant="" type="submit" className="">
            Submit
          </Button>
        </Form>
        <Footer />
      </div>
    </main>
  );
};

export default Contact;