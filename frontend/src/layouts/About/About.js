import React, { useEffect, useLayoutEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axios from "../../api/axios";
import Member from "./membre";
import Footer from "./../../components/footer";
import "./About.css";
import { useOutletContext } from "react-router-dom";

const About = () => {
 
  
  const [members, setMembers] = useState([]);
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  useLayoutEffect(() => {
    showNav();
  }, [])
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        // Retrieve JWT token from localStorage
        const response = await fetch("http://127.0.0.1:8000/api/teacher/list-teacher", {
          headers: {
             // Use the retrieved token in the Authorization header
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        } else {
          // Handle non-2xx response
          console.log("Error:", response.status);
        }
      } catch (error) {
        // Handle network error
        console.log(error);
      }
    };
  
    fetchTeachers();
  }, []);
  

  return (
    <main>
      <div className="about">
        <div className="about-header">
          <h1>
            <span className="heading-about-primary">Improving Lives</span> <br />
            <span className="heading-about-secondary">Through Learning..</span>
          </h1>
        </div>
        <div className="about-team container py-5">
          <h2 className="aboutteacher">Meet Our Teachers :</h2>
          <hr className="line" />
          <Row xs={2} md={4} className="g-4 justify-content-center">
            {members.map((member) => (
              <Col key={member.id}>
                <Member member={member} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default About;