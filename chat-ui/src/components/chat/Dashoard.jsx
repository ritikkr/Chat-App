import { ChatBubble, SignalWifiStatusbar4Bar, Call } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useProvideAuth";
import Conversation from "./conversation/Conversation";
import TopBar from "./TopBar";


const menuList = [
  {
    title: "Conversation",
    link: "conversation",
    icon: <ChatBubble />,
  },
  {
    title: "Status",
    link: "status",
    icon: <SignalWifiStatusbar4Bar />,
  },
  {
    title: "Call",
    link: "call",
    icon: <Call />,
  },
];

const Dashoard = () => {
  const location = useLocation(10);
  const navigate = useNavigate()

  const [selectedMenu, setSelectedMenu] = useState(menuList[0].link);
  const {user} = useAuth()

  const getActiveTabFromUrl = (pathname) => {
    var link = pathname.slice(11);
    console.log(link);
    setSelectedMenu(link.length === 0 ? menuList[0].link : menuList.filter((menu) => menu.link === link)[0].link)
    // setSelectedMenu(
    //   name.length === 0
    //     ? menuList[0].link
    //     : menuList.filter((menu) => menu.text === name)[0].link
    // );
  };

  useEffect(() => {
    getActiveTabFromUrl(location.pathname);
  }, []);



if(user===null){
 return <Navigate to={"/login"} />
  
}
  return (
    <Box>
      {console.log(user)}
        {/* <Box>
            <TopBar menuList={menuList} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
        </Box> */}
        <Box sx={{height: `calc(100vh)`}}>
          {console.log(selectedMenu)}
        {/* {location.pathname === "/dashboard" &&<Conversation />}   
        {location.pathname === "/dashboard/conversation" &&<Conversation />}   
        {location.pathname === "/dashboard/status" &&<h1> Status</h1>}   

        {location.pathname === "/dashboard/call" &&<h1> Call</h1>}   
        {location.pathname === "/dashboard/*" &&<Conversation /> }    */}

          {selectedMenu === "conversation" && <Conversation />}
          {selectedMenu === "status" && <h1>Status</h1>}
          {selectedMenu === "call" && <h1>Call</h1>}
        
        </Box>
    </Box>
  );
};

export default Dashoard;
