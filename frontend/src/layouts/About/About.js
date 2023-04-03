import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useLayoutEffect } from "react";
import "./About.css";
import axios from 'axios';
import Member from "./membre.css";
import Footer from "../../components/footer";
const About = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('./team.json')
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
            {members.map((member) => (
              <Col>
                <Member key={member.id} member={member}></Member>
              </Col>
            ))}
            </Row>
        </div>
      </div>
      <Footer/>
    </main>
  );
};
export default About