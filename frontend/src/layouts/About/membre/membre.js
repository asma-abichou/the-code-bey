import React from "react";
import "./membre.css"; //importin css style
import { Card } from "react-bootstrap"; //importing BOOTSTRAP

const Member = (props) => {
  const { member } = props;
  const { email, jobTitle, fullName, img } = member;
  return (
    <Card className="team-member border-0">
      <div className="img-box" data-aos="fade-left">
        <Card.Img variant="top" src={img} />
        <p className="hide-email">email: {email}</p>
      </div>

      <Card.Body>
        <h6>{fullName}</h6>
        <p>{jobTitle}</p>
      </Card.Body>
    </Card>
  );
};

export default Member;