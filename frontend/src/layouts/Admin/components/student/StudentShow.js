import React from "react";
import { useLayoutEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const StudentShow = () => {
  const { id } = useParams();
  //ta3mel get by id


  // Get authentication token from local storage

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false); // new state variable

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("username", username);
    formData.append("email", email);
    setIsSubmitted(true);
  };

  return (
    <div>
      <div
        className="addcourse form-container box"
        style={{ backgroundColor: "transparent", color: "black" }}
      >
          <form
            className="form2"
            onSubmit={handleSubmit}
            style={{ color: "black" }}
          >
            <div className="form-title">
              <h1 className="Sign">Student Preview</h1>
            </div>
            <div className="form-row">
              <label htmlFor="id">ID :</label>
              <input
                disabled
                type="text"
                id="id"
                value={id}
              />
              <label htmlFor="nom">Nom :</label>
              <input
              disabled
                type="text"
                id="nom"
                value={nom}
              />
              <label htmlFor="prenom">Prenom :</label>
              <input
              disabled
                type="text"
                id="prenom"
                value={prenom}
              />
              <label htmlFor="username">Username :</label>
              <input
              disabled
                type="text"
                id="username"
                value={username}
              />
              <label htmlFor="email">Email :</label>
              <input
              disabled
                type="email"
                id="email"
                value={email}
              />
            </div>

          </form>
        <a
          href="#"
          className="go-back-link"
          onClick={() => window.history.back()}
        >
          Go back
        </a>
      </div>
    </div>
  );
};

export default StudentShow;
