import React from "react";
import { Card } from "react-bootstrap";
import "./membre.css";

const Member = ({ member }) => {
  const { firstName, lastName, email } = member;

  return (
    <Card className="team-member border-0">
      <div className="img-box" data-aos="fade-left">
        <Card.Img variant="top" src={require("../../static/images/teacher (2).jpg")} />
        <p className="hide-email">email: {email}</p>
      </div>

      <Card.Body>
        <p>{`${firstName} ${lastName}`}</p>
        <p>{email}</p>
      </Card.Body>
    </Card>
  );
};

export default Member;
