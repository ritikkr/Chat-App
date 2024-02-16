import { Call, VideoCall } from "@mui/icons-material";
import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useProvideAuth";
import MessageContainerInput from "./MessageContainerInput";
import MessageContainerMid from "./MessageContainerMid";
import MessageContainerTop from "./MessageContainerTop";

const MessageContainer = ({profile, selectedId, sendMessage}) => {

  const [messages, setMessages] = useState([])
  const [messageInputValue, setMessageInputValue] = useState('')

  const {user} = useAuth()
  
  const handleSendMessage = (messageInputValue) => {
    if(messageInputValue === ""){
      return ;
    }
    const data = {
      text: messageInputValue,
      toUserId: selectedId,
      fromUserId: user.id,


    }
    sendMessage(data)

    getMessage()
  }

  const getMessage = () => {
    axios.get(`/api/v1/message/from/${selectedId}/to/${user.id}`)
    .then((res) => {
        setMessages(res.data.sort((a, b) => {
          const dateA = new Date(a.sentAt);
          const dateB = new Date(b.sentAt);
          return dateA - dateB; // Ascending order (oldest to newest)
          // To sort in descending order (newest to oldest), use: return dateB - dateA;
        }))
    })
  }

  useEffect(() => {
         getMessage()
         
  },[selectedId])

  useEffect(() => {
    const interval = setInterval(() => {
     getMessage()
    }, 1000);

    return () => clearInterval(interval);

  }, [selectedId])

  return (
    <Box sx={{ display: "flex" , height: '100%'}} flexDirection="column">
      <Box sx={{ height: "7%", background: 'green'}}>
        <MessageContainerTop selectedId={selectedId} profile={profile}/>
      </Box>
      <Box sx={{ height: "86%" , overflow: 'scroll'}}>
        <MessageContainerMid selectedId={selectedId} messages={messages} />
      </Box>
      <Box sx={{ height: "7%", background: 'green' }}>
        <MessageContainerInput selectedId={selectedId} handleSendMessage={handleSendMessage} />
      </Box>
    </Box>
  );
};

export default MessageContainer;
