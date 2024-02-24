import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

function Protected() {
  return (
    <div>
      {localStorage.getItem("token") ?<Navigate to="/anasayfa" /> : <Outlet/> }
    </div>  )
}

export default Protected