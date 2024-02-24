import { createSlice } from '@reduxjs/toolkit'
import { changePassword, getAllUsers, getLoginAndLogout, getOneUserAsync, getUserById, loginAuth, logoutUser, theLastBreaks } from '../../service'


export const userSlice = createSlice({
  name: 'user',
  initialState:{
    

    //get user auth
    authUser:null,
    authUserStatus: "idle",
    authUserError: null,




    //get the last break
    theLastBreak:null,
    theLastBreakStatus:"idle",
    theLastBreakError:null,


    //getAll userList
    userList:null,
    userListStatus:"idle",
    userListError:null,


    //getByIdUserDetails
    userDetail:null,
    userDetailStatus:"idle",
    userDetailError:null,




    //changePasswordMessage
    changePasswordMessage: null,
    changePasswordStatus: "idle",
    changePasswordError: null,    



    //user sessions login and logout state

    userSessionLoginAndLogout:null,
    userSessionLoginAndLogoutStatus:"idle",
    userSessionLoginAndLogoutError:null,


    //logoutmessage
    logoutMessage:null,
    logoutMessageStatus:"idle",
    logoutMessageError:null


    

  },
  reducers: {

    logout: (state) => {
      state.authUser=null
      localStorage.removeItem("token")
      localStorage.removeItem("userid")
   
      },
   
  },
  extraReducers: (builder) => {
    builder  

      //get auth users
      .addCase(getOneUserAsync.pending, (state) => {
        state.authUserStatus = "loading";
      })
      .addCase(getOneUserAsync.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.authUserStatus = "success";
      })
      .addCase(getOneUserAsync.rejected, (state, action) => {
        state.authUserStatus = "failed";
        state.authUserError = action.error.message;
      })



      .addCase(theLastBreaks.pending, (state) => {
        state.theLastBreakStatus = "loading";
      })
      .addCase(theLastBreaks.fulfilled, (state, action) => {
        state.theLastBreak = action.payload;
        state.theLastBreakStatus = "success";
      })
      .addCase(theLastBreaks.rejected, (state, action) => {
        state.theLastBreakStatus = "failed";
        state.theLastBreakError = action.error.message;
      })



      .addCase(getAllUsers.pending, (state) => {
        state.userListStatus = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.userList = action.payload;
        state.userListStatus = "success";
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.userListStatus = "failed";
        state.userListError = action.error.message;
      })



      .addCase(getUserById.pending, (state) => {
        state.userDetailStatus = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userDetail = action.payload;
        state.userDetailStatus = "success";
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.userDetailStatus = "failed";
        state.userDetailError = action.error.message;
      })

  
      .addCase(changePassword.pending, (state) => {
        state.changePasswordStatus = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePasswordMessage = action.payload;
        state.changePasswordStatus = "success";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordStatus = "failed";
        state.changePasswordError = action.error.message;
      })


      
      .addCase(getLoginAndLogout.pending, (state) => {
        state.userSessionLoginAndLogoutStatus = "loading";
      })
      .addCase(getLoginAndLogout.fulfilled, (state, action) => {
        state.userSessionLoginAndLogout = action.payload;
        state.userSessionLoginAndLogoutStatus = "success";
      })
      .addCase(getLoginAndLogout.rejected, (state, action) => {
        state.userSessionLoginAndLogoutStatus = "failed";
        state.userSessionLoginAndLogoutError = action.error.message;
      })


      .addCase(logoutUser.pending, (state) => {
        state.logoutMessageStatus = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.logoutMessage = action.payload;
        state.logoutMessageStatus = "success";
      
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutMessageStatus = "failed";
        state.logoutMessageError = action.error.message;
      });
  }
  



 
 
})

export const { logout } = userSlice.actions

export default userSlice.reducer