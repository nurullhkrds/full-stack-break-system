import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import Helper from './helper/Helper.js';

const url = process.env.REACT_APP_BASE_ENDPOINT
const SECRET_KEY = 'SAKSADJ206546SMNDKLKLAJSDKLJSADKLAJSDKLSJADKLSDJ';
const helper = new Helper(SECRET_KEY);

export const loginAuth = createAsyncThunk('auth/loginAuth', async (login) => {
  try {
    const response = await axios.post(`${url}/auth/authenticate`, login);
    const encryptedUserId = helper.encrypt(response.data.userId);
    console.log("---",encryptedUserId)
    console.log("---",parseInt(helper.decrypt(encryptedUserId)))


    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userid", encryptedUserId);

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Hata, kullanıcı arayüzü tarafından yönetilsin
  }
});

export const getOneUserAsync = createAsyncThunk('users/getbyid', async () => {
  try {
    const encryptedUserId = localStorage.getItem("userid");
    if (!encryptedUserId) {
      throw new Error("localStorage içinde şifrelenmiş kullanıcı kimliği bulunamadı.");
    }

    const decryptedUserId = helper.decrypt(encryptedUserId);

    // decryptedUserId'nin bir sayı olup olmadığını kontrol et
    if (isNaN(decryptedUserId)) {
      throw new Error("Şifrelenmiş kullanıcı kimliği geçerli bir sayı değil.");
    }

    const data = await axios.get(`${url}/users/getbyid/${parseInt(decryptedUserId, 10)}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });

    return data.data.data;
  } catch (error) {
    console.error("Kullanıcı bilgisi alınamadı:", error);
    throw error; // Hata, kullanıcı arayüzü tarafından yönetilsin
  }
});


export const updateAvatar=createAsyncThunk('users/avatar',async (temp)=>{
  const avatar=temp?.avatar
  const data=await axios.put(`${url}/users/${parseInt(temp?.userId)}`,{avatar},{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  return data.data.data;
})



export const startBreak = createAsyncThunk('breaks/startBreak', async (breaksData) => {
  const data = await axios.post(
    `${url}/break/add`,
    breaksData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    }
  );
  return data.data.data;
});


export const endBreaks = createAsyncThunk('breaks/endBreak', async (breaksId) => {
  const data = await axios.post(
    `${url}/break/delete/${breaksId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    }
  );
  return data.data.data;
});


export const theLastBreaks = createAsyncThunk('theLastBreak/break', async (userId) => {
  console.log(userId)
  const data = await axios.get(
    `${url}/break/getuserendby/${userId}`,
    
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    }
  );
  return data.data.data;
});


export const getAllUsers=createAsyncThunk('users/getAll',async ()=>{

  const data=await axios.get(`${url}/users/getall`,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  return data.data.data;
})


export const getUserById=createAsyncThunk('users/byId',async (userId)=>{

  const data=await axios.get(`${url}/users/getbyid/${userId}`,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  return data.data.data;
})





export const changePassword=createAsyncThunk('users/change',async (password)=>{
  const encryptedUserId = localStorage.getItem("userid");

  const decryptedUserId = helper.decrypt(encryptedUserId);
  const data=await axios.put(`${url}/users/changepassword/${parseInt(decryptedUserId, 10)}`,password,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  return data.data
})




export const getLoginAndLogout=createAsyncThunk('loginandlogout/users',async (userId)=>{

  const data=await axios.get(`${url}/usersession/userloginandlogout/${userId}`,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  console.log(data.data)
  return data.data.data;
})


export const logoutUser=createAsyncThunk('users/logoutlogin',async ()=>{

  const data=await axios.get(`${url}/auth/perform-logout`,{
      headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials:true
  })
  localStorage.removeItem("token")
  localStorage.removeItem("userid")
  return data.data;
})



