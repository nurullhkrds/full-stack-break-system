import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Box,
  List,
  ListItem,
  ListItemSecondaryAction,
  Modal,
  Radio,
  TextField,
} from "@mui/material";


import { useSelector, useDispatch } from "react-redux";
import { getOneUserAsync, updateAvatar } from "../../../service";
import { useNavigate } from "react-router-dom";

const style = {
  
  position: "absolute",
  top: "50%",
  left: "50%",
  height: 250,
  overflow: "auto",
  transform: "translate(-50%, -50%)",
  width: 220,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  
};

function MyProfile() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const authUser=useSelector((state)=>state.user.authUser)


  useEffect(()=>{
      getAuthUser()
  },[localStorage.getItem("userid"),dispatch])

  const getAuthUser=async()=>{
    await dispatch(getOneUserAsync())
  }




  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(updateAvatar({userId: authUser?.id,avatar:selectedValue}));

  };
  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };







  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "25px",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          image={`/avatars/avatar${
            selectedValue ? selectedValue : authUser?.avatar
          }.png`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {authUser?.firstname} {authUser?.lastname}

          </Typography>
            {authUser?.email}
          <Typography gutterBottom variant="p" component="div">
           
          </Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen} size="small">
            Avatarı Değiştir
          </Button>

          
        </CardActions>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <List dense>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11].map((key) => {
                  const labelId = `checkbox-list-secondary-label-${key}`;
                  return (
                    <ListItem key={key} button>
                      <CardMedia
                        style={{ maxWidth: 100 }}
                        component="img"
                        alt={`Avatar n°${key}`}
                        image={`/avatars/avatar${key}.png`}
                        title="User Avatar"
                      />
                      <ListItemSecondaryAction>
                        <Radio
                          edge="end"
                          value={key}
                          onChange={handleChange}
                          checked={"" + selectedValue === "" + key}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Typography>
          </Box>
        </Modal>
      </div>

    
    </div>
  );
}

export default MyProfile;