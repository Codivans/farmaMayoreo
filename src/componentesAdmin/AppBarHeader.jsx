import React,{ useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { VscSyncIgnored, VscSignIn } from 'react-icons/vsc';

// Mui
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
      right: -4,
      top: 12,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
  },
  }));

export function AppBarHeader({open, setOpen}){  
  const [state, setState] = React.useState({right: false,});
  let navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
  };


    return(
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 2,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Manager 
            </Typography>
          </Toolbar>    
        </AppBar>
    )
}