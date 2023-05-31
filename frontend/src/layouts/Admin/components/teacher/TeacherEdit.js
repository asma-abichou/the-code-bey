import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const TeacherEdit = () => {
  const { id } = useParams();
 

  const [response, setResponse] = useState({});
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [IsSubmitted,  setIsSubmitted] = useState("");

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/teacher/show/${id}`
        );
        setResponse(response.data);
        setNom(response.data.firstName);
        setPrenom(response.data.lastName);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    
    fetchTeacher();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updatedTeacher = {
        firstName: nom,
        lastName: prenom,
        username,
        email,
      };
      setIsSubmitted(true);
    toast("Update done !!"); 


      await axios.put(
        `http://127.0.0.1:8000/api/admin/teachers/edit/${id}`,
        updatedTeacher
      );
       // Redirect to the Teachers page after successful update
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <div
        className="addcourse form-container box"
        style={{ backgroundColor: "transparent", color: "black" }}
      >
        <form className="form2" onSubmit={handleSubmit} style={{ color: "black" }}>
          <div className="form-title">
            <h1 className="Sign">Edit Teacher</h1>
          </div>
          <div className="form-row">
            <label htmlFor="id">ID :</label>
            <input disabled type="text" id="id" value={id} />
            <label htmlFor="nom">Nom :</label>
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(event) => setNom(event.target.value)}
            />
            <label htmlFor="prenom">Prenom :</label>
            <input
              type="text"
              id="prenom"
              value={prenom}
              onChange={(event) => setPrenom(event.target.value)}
            />
            <label htmlFor="username">Username :</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="email">Email :</label>
            <input disabled
              type="email"
              id="email"
              value={email}
             
            />
          </div>

          <div className="form-row">
            <button type="submit">Soumettre</button>
          </div>
        </form>
      
         
      </div>
      <ToastContainer />
    </div>
  );
};

export default TeacherEdit;
