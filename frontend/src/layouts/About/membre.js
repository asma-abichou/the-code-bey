import React from "react";
import { Card } from "react-bootstrap";
import "./membre.css"
import img from "../../static/images/teacher.jpg"
const Member = (props) => {
  const { member } = props;
  const teacher = member?.teacher || {};
  const { firstName = '', lastName = '', email = '' } = teacher;
  const courses = member?.courses || [];
  const { title = '', description = '', duration = '', img= '' } = courses[0] || {};
  return (
    <Card className="team-member border-0">
      <div className="img-box" data-aos="fade-left">
        <Card.Img variant="top" src={img} />
        <p className="hide-email">email: {email}</p>
      </div>

      <Card.Body>
        <h6>{`${firstName} ${lastName}`}</h6>
        {img}
        <p>{title}</p>
        <p>{description}</p>
        <p>{duration}</p>
      </Card.Body>
    </Card>
  );
};

export default Member;
