import React from "react";
import { useLayoutEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../../api/axios"
const StudentShow = () => {
  const { id } = useParams();
  
  const [response, setResponse] = useState([]);
  useLayoutEffect(() => {
   
    chargeStudentId();
  }, []);
  const chargeStudentId = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/admin/students/show/${id}`, {
       
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setResponse(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  //ta3mel get by id


  // Get authentication token from local storage

  const [nom, setNom] = useState(response.firstName);
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
              <label htmlFor="nom">firstName:</label>
              <input
              disabled
                type="text"
                id="nom"
                value={response.firstName}
              />
              <label htmlFor="prenom">lastName :</label>
              <input
              disabled
                type="text"
                id="prenom"
                value={response.lastName}
              />
              <label htmlFor="username">Username :</label>
              <input
              disabled
                type="text"
                id="username"
                value={response.username}
              />
              <label htmlFor="email">Email :</label>
              <input
              disabled
                type="email"
                id="email"
                value={response.email}
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
