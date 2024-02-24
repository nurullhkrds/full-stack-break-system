import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import {Routes,Route, Navigate} from "react-router-dom";
import { useEffect } from 'react';
import { getOneUserAsync } from './service';
import Admin from './pages/admin/Admin';
import UserDetails from './pages/admin/UserDetails';
import UserProfile from './pages/user/UserProfile';

function App() {
  const isAuthenticated = !!localStorage.getItem("token");
  const dispatch=useDispatch()
// Bu satırda authUser değerini almak için bekleme yapmıyoruz.
const authUser = useSelector((state) => state.user.authUser);
const userStatus = useSelector((state) => state.user.authUserStatus);

useEffect(() => {
  const fetchData = async () => {
    if (userStatus === "idle") {
      // Auth kullanıcısını al ve bekle
      await getAuthUser();
    }

  
  };

  fetchData();
}, [authUser, userStatus]);

const getAuthUser = async () => {
  await dispatch(getOneUserAsync());
};


  return (
    <div className="App">
      <Navbar/>
      <div>
      <Routes>
    <Route
      path="/"
      element={
        isAuthenticated ? (
          authUser?.role === "USER" ? (
            <Navigate to="/anasayfa" />
          ) : authUser?.role === "ADMIN" ? (
            <Navigate to="/admin" />
          ) : null // Eğer rol "USER" veya "Admin" değilse null döndür
        ) : (
          <Navigate to="/login" />
        )
      }
    />

    <Route path="/anasayfa" element={isAuthenticated && authUser?.role === "USER" ? <Home /> : <Navigate to="/" />} />
    <Route path="/admin" element={isAuthenticated && authUser?.role === "ADMIN" ? <Admin /> : <Navigate to="/" />} />
    <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
<Route
  path="/userdetails/:userId"
  element={
    isAuthenticated && authUser?.role === "ADMIN" ? (
      <UserDetails />
    ) : (
      <Navigate to="/" />
    )
  }
/>    <Route path="/myprofile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/" />} />

  </Routes>
    </div>
    
    </div>
  );
}

export default App;
