import { Delete, Edit } from "@mui/icons-material";
import { Box, Chip, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useProvideAuth";
import ShowText from "./ShowText";

const MessageContainerMid = ({ messages, selectedId }) => {
  const messageRef = useRef(null);
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(messages[0]?.sentAt)
  const [sortedMessage, setSortedMessages] = useState([])

  useEffect(() => {
    console.log("M update");
    
    if (messageRef.current) {
      console.log("Yes");
      const lastChildElement = messageRef.current?.lastElementChild;
      lastChildElement?.scrollIntoView({ behavior: "smooth", block: "end" });
      // messageRef.current.scrollIntoView({ behaviour: "smooth", block: "end" });
    }
  }, [messages.length, selectedId]);



  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        background: "#f5f5f5",
        height: "100%",
      }}
      ref={messageRef}
      id="messageDiv"
    >
      {messages
        .filter((msg) => msg.fromUserId === user.id || msg.toUserId === user.id)
        .map((msg, index) => {
            // setCurrentDate(msg.sentAt)
          return (
            <Box
              sx={{
                width: "100%",
                mt: 2,
                display: "flex",
                flexDirection: 'column',
                justifyContent:
                  msg.fromUserId === selectedId ? "flex-start" : "flex-end",
              }}
              key={msg.id}
            >
             
               {index === 0 &&  <Chip variant="outlined" color="success" label={new Date(msg.sentAt).toLocaleDateString()} sx={{alignSelf: 'center', mb: 1}} />}
               {index > 0 && new Date(messages[index - 1].sentAt).toLocaleDateString() !== new Date(msg.sentAt).toLocaleDateString() &&  <Chip variant="outlined" color="success" label={new Date(msg.sentAt).toLocaleDateString()} sx={{alignSelf: 'center', mb: 1}} />}
              <ShowText msg={msg} selectedId={selectedId}/>
            </Box>
          );
        })}
    </Box>
  );
};

export default MessageContainerMid;
