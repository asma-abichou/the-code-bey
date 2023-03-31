import React, { useState, useEffect, createContext, useContext } from "react";

import axios from "axios";

const UserContext = createContext();

function ProfileComponent() {
const [username, setUsername] = useState("");
const [imageURI, setImageURI] = useState("");

useEffect(() => {
const fetchData = async () => {
let token = localStorage.getItem("token");
let response = await axios.post("http://localhost:5000/username", {
token,
});
let data = response.data;
console.log(data);
setUsername(data.username);
};
if (!username) {
fetchData();
}
}, []);

useEffect(() => {
let localImageURI = localStorage.getItem("imageURI");
if (localImageURI) {
setImageURI(localImageURI);
}
}, []);

return (
<UserContext.Provider value={{ username, imageURI }}>
<Navbar status={true} username={username} imageURI={imageURI} />
<main className="profile-main">
<img
src={imageURI}
alt="Profile Picture"
style={{
borderRadius: "50%",
width: "150px",
height: "auto",
marginTop: "50px",
}}
/>
<h2 style={{ fontSize: "2rem", marginBottom: "0px" }}>{username}</h2>
<h4 style={{ fontSize: "1.5rem" }}>Student</h4>
<p>
Currently learning Industrial IoT on Google Cloud Platform, Security
Best Practices in Google Cloud
</p>
</main>
</UserContext.Provider>
);
}

function useUserContext() {
const context = useContext(UserContext);
if (!context) {
throw new Error("useUserContext must be used within a UserContextProvider");
}
return context;
}

export { ProfileComponent, useUserContext };