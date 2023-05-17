import React from "react";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useLayoutEffect } from "react";
import axios from "../../api/axios";
import Member from "./membre";
import Footer from "../../components/footer";
import "./About.css"

const About = () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
  )}`;

  const [members, setMembers] = useState({});

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/teacher/profile")
      .then((response) => setMembers(response.data))
      .catch((error) => console.log(error));
  }, []);

  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, [])

  return (
    <main>
      <div className="about">
        <div className="about-header">
          <h1>
            <span className="heading-about-primary">Improving Lives</span>{" "}
            <br />
            <span className="heading-about-secondary">Through Learning..</span>
          </h1>
        </div>
        <div className="about-team container py-5">
          <h2 className="text-center mb-3 pb-2">Meet Our Teachers</h2>
          <hr className="line" />
          <Row xs={1} md={4} className="g-3">
            <Col>
              <Member member={members}></Member>
            </Col>
          </Row>
        </div>
      </div>
      <Footer/>
    </main>
  );
};

export default About;
