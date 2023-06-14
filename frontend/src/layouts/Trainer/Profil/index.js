import React, { useEffect, useLayoutEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Outlet, useOutletContext, Link, Navigate } from "react-router-dom";
import "./styles.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import img from "../../../static/images/teacher.jpg";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import EditIcon from "@mui/icons-material/Edit";

const Profil = () => {
  const token=localStorage.getItem("token")
  const drawerWidth = 240;
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);
  const [profileData, setProfileData] = useState({});
  const { auth } = useAuth();
  const username = auth.user;
  const id = auth.id;
  useLayoutEffect(() => {
    showNav();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/teacher/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchProfileData();
  }, []);
  
const img1=profileData.teacher?.picture;
const picture= `http://127.0.0.1:8000${img1}`;
  const firstName = profileData.teacher?.firstName;
  const lastName = profileData.teacher?.lastName;
  const email = profileData.teacher?.email;
  const courseTitles = profileData.courses?.map((course) => course.title);
  console.log(courseTitles);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
const navigateToEditCourse = (title) => {
  Navigate(`/editcourse/${title}`);
};


  return (
    <div className="profile-conatiner">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {[
            { text: "Addcourse", link: "/Addcourse" },
            { text: "Addcategory", link: "/Addcategory" },
            { text: "editcourse", link: "/editcourse" },
            { text: "LiveStream", link: "/streams" },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.link}>
                <ListItemIcon>
                  {item.text === "Addcategory" ? (
                    <InboxIcon />
                  ) : item.text === "Addcourse" ? (
                    <InboxIcon />
                  ) : (
                    <MailIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Card sx={{ maxWidth: 1900 }}>
        <CardMedia component="img" alt="" height="140" image={img} />
        <Avatar
          className="avatar"
          alt={firstName}
          src={picture}
          sx={{ width: 150, height: 150 }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="trainer-name"
          >
            {firstName} {lastName}
          </Typography>
          <Link to={"edit/" + id}>
            <EditIcon color="primary"></EditIcon>
            {/* Button to navigate to the edit page */}
          </Link>
          <Typography variant="body2" color="text.secondary">
            Formateur expérimenté en programmation, doté d'une solide expertise dans l'enseignement des langages de programmation
          </Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ width: "200%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Informations" value="1" />
                  <Tab label="Courses" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">{email}</TabPanel>
              <TabPanel value="2">
                <Stack direction="row" spacing={1}>
                  {courseTitles &&
                    courseTitles.map((title) => (
                      <Chip
                        key={title}
                        label={title}
                        variant="outlined"
                      />
                    ))}
                </Stack>
              </TabPanel>
            </TabContext>
          </Box>
        </CardActions>
      </Card>
    </div>
  );
};

export default Profil;
