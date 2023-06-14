import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import "./dropdown.css"
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);
  const role = localStorage.getItem("roles");
  const { auth } = useAuth();
  const pages =
    role === "ROLE_TEACHER"
      ? [
          { name: "ProfileTeacher", link: "/profil" },
          { name: "Admin", link: "/admin" },
        ]
      : role === "ROLE_ADMIN"
      ? [{ name: "ProfileUser", link: "/admin" }]
      : [{ name: "ProfileUser", link: "/userprofil" }];

  const navigate = useNavigate();
  const username = localStorage.getItem('user').charAt(0).toUpperCase();

  const logout = async () => {
    // Remove the stored items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("pwd");
    localStorage.removeItem("user");
    localStorage.removeItem("is_staff");
    localStorage.removeItem("refreshtoken");

    // Clear the authentication state

    // Redirect the user to the desired location (e.g., home page)
    navigate("/");
    window.location.reload();
  };

  const handleClick = () => {
    setAnchorEl((prevAnchorEl) => !prevAnchorEl);
  };
  const handleClose = () => {
    setAnchorEl(false);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            onClose={handleClose}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 50, height: 50 }}>{username}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate(pages[0].link)}>
          <Avatar /> Profile
        </MenuItem>

        <Divider />

        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
