import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { MdLogout } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { logoutUser } from '../../service';

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const handleLogout =async () => {
    await dispatch(logoutUser())
    navigate(0)
  }
  return (
    <Box sx={{ flexGrow: 1,}}>
      <AppBar position="static" style={{
        backgroundColor:'#fb8500' ,
        borderEndStartRadius:30,
        borderEndEndRadius:30,
      }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,}}>
            Anasayfa
          </Typography>
          {
            localStorage.getItem("token") ?
              <>
                <Link to={'/myprofile'}>
                  <IconButton>
                    <AiOutlineUser />
                  </IconButton>
                </Link>
                <IconButton onClick={() => handleLogout()}>
                  <MdLogout />
                </IconButton>

              </>
              :
              <Button color="inherit">
                Login
              </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}