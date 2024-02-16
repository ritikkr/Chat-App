import React from 'react'
import { useLocation } from 'react-router-dom';

const DahboardTab = () => {
  const location = useLocation(10);

  return (
    <div>
        {location.pathname === "/dashboard" &&<h1> Hello</h1>}   
    </div>
  )
}

export default DahboardTab