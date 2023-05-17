import React, { useLayoutEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Outlet, useOutletContext } from "react-router-dom";
import "./styles.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
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
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import EditIcon from "@mui/icons-material/Edit";

const Profil = () => {
  const drawerWidth = 240;
  const [animationIsFinished, setAnimationIsFinished] = useOutletContext();
  const showNav = () => setAnimationIsFinished(true);

  const { auth } = useAuth();
  const username = auth.user;
  const id = auth.id;
  useLayoutEffect(() => {
    showNav();
  }, []);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

            { text: "chat", link: "/chat" },
            { text: "LiveStream", link: "/livestream" },
          ].map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.link}>
                <ListItemIcon>
                  {" "}
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
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={img}
        />
        <Avatar
          className="avatar"
          alt="Remy Sharp"
          src="../../../static/images/teacher.jpg"
          sx={{ width: 150, height: 150 }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="trainer-name"
          >
            {username}
          </Typography>
          <Link to={"edit/" + "1"}>
            <EditIcon color="primary"></EditIcon>{/*bouton edit badel el 1 b id  */}
          </Link>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
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
              <TabPanel value="1">Informations</TabPanel>
              <TabPanel value="2">Courses</TabPanel>
            </TabContext>
          </Box>
        
        </CardActions>
      </Card>
    </div>
  );
};

export default Profil;