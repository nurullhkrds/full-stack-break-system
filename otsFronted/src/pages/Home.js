import React, { useState ,useEffect} from "react";
import MyProfile from "../pages/auth/myProfile/MyProfile";
import { Button, Modal,message, Popconfirm } from "antd";
import { IconButton } from "@mui/material";
import { AiOutlineFieldTime } from "react-icons/ai";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { endBreaks, getOneUserAsync, startBreak, theLastBreaks } from "../service";
import { useNavigate } from "react-router-dom";
import { FaHourglassStart } from "react-icons/fa";
import { MdTimerOff } from "react-icons/md";
import { Typography } from 'antd';
import { TbClockX } from 'react-icons/tb';
import { GiSandsOfTime } from 'react-icons/gi';
import '../styles/Home.css'
import UserBreaks from "./user/UserBreaks";

function Home() {
  const { Text } = Typography;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve initial timer state from localStorage or default to 0
  const initialElapsedTime = parseInt(localStorage.getItem('elapsedTime')) || 0;

  const [open, setOpen] = React.useState(false);
  const [breaks, setBreaks] = React.useState('');
  const [confirmLoading, setConfirmLoading] = useState(false);

  const authBreaks = useSelector((state) => state.user.theLastBreak);
const breakStatus = useSelector((state) => state.user.theLastBreakStatus);

// Bu satırda authUser değerini almak için bekleme yapmıyoruz.
const authUser = useSelector((state) => state.user.authUser);
const userStatus = useSelector((state) => state.user.authUserStatus);

  // Start clock saniye
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(initialElapsedTime);



  useEffect(() => {
    const fetchData = async () => {
      if (userStatus === "idle") {
        // Auth kullanıcısını al ve bekle
        await getAuthUser();
      }
  
      if (authUser) {
        if (breakStatus === "idle") {
          // Auth kullanıcısının son molasını al ve bekle
          await getTheLastBreaks(authUser.id);
        }
      }
    };
  
    fetchData();
  }, [authUser, userStatus, breakStatus]);

  const getAuthUser = async () => {
    await dispatch(getOneUserAsync());
  };

  const getTheLastBreaks = async (id) => {
    await dispatch(theLastBreaks(id));
  };




  useEffect(() => {
    let interval;

    if (authUser?.isBreak) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setElapsedTime(0);
    }

    if (isRunning) {
      const startTime = new Date().getTime();

      interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const newElapsedTime = currentTime - startTime;

        // Update localStorage with the new elapsed time
        localStorage.setItem('elapsedTime', newElapsedTime.toString());

        setElapsedTime(newElapsedTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, authUser?.isBreak]);

  const startTimer = () => {
    setIsRunning(authUser?.isBreak);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);

    // Clear elapsed time from localStorage when the timer is stopped
    localStorage.removeItem('elapsedTime');
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${minutes} dakika ${seconds} saniye`;
  };

  // Finish clock saniye

  // Start modal open and close
  const handleOpen = () => {
    setOpen(true);
    startTimer(); // Modal açıldığında sayaç başlatılır
  };

  const handleChange = (event) => {
    setBreaks(event.target.value);
  };

  const handleOk = () => {
    if (!breaks) {
      message.error('Lütfen bir mola seçin.');
      return;
    }

    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(startBreak({ userId:authUser?.id, type: breaks }));
      stopTimer(); // Mola başladığında sayaç durdurulur
      navigate(0);
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
    stopTimer(); // Modal kapatıldığında sayaç durdurulur
  };
  // Finish modal open and close



  // Start->the last break
  const confirm = (e) => {
    dispatch(endBreaks(authBreaks?.breakId));
    navigate(0);
  };

  const cancel = (e) => {
  };
  // Finish->the last break

  return (
    <main>
      <div style={{display:"flex", justifyContent:"space-around"}}>

      <section>
        <MyProfile />
        {authUser?.isBreak ? (
          <Popconfirm
            title="Mola Bitir"
            description="Mola sonlandırılacak emin misin ?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Evet"
            cancelText="Hayır"
          >
            <IconButton>
              <TbClockX style={{ width: '140px', height: '140px' }} />
            </IconButton>
            <div className={`digital-clock ${authUser?.isBreak ?'break-mode' : ''}`}>
      Sayaç: {formatTime(elapsedTime)}
    </div>          </Popconfirm>
        ) : (
          
            <IconButton onClick={handleOpen} style={{ marginTop: 30, width: '150px', height: '150px' }}>
              <GiSandsOfTime style={{ width: '150px', height: '150px' }} />
            </IconButton>
          
        )}
      </section>



      <section style={{width:"1000px"}}>
        <UserBreaks/>

      </section>

      </div>
    
      <section>
        <Modal
          title="Title"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Mola</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={breaks}
                label="Age"
                onChange={handleChange}
                required
              >
                <MenuItem value={'Yemek Molası'}>Yemek Molası</MenuItem>
                <MenuItem value={'Eğitim Molası'}>Eğitim Molası</MenuItem>
                <MenuItem value={'Toplantı'}>Toplantı</MenuItem>
                <MenuItem value={'Cuma Namazı'}>Cuma Namazı</MenuItem>
                <MenuItem value={'Diğer'}>Diğer</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Modal>
      </section>
    </main>
  );
}

export default React.memo(Home);
