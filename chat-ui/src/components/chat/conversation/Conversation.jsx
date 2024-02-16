import { AdbOutlined, ContactsOutlined, Search } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Box,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProvideAuth, { useAuth } from "../../hooks/useProvideAuth";
import ContactModal from "./ContactModal";
import MessageContainer from "./MessageContainer";
import ProfileTab from "./ProfileTab";
import UserCard from "./UserCard";
import PersonIcon from "@mui/icons-material/Person";

const profile = [
  {
    name: "Ritik Kumar",
    lastMessage: "hello",
    id: "ABC1",
  },
  {
    name: "Lpu College",
    lastMessage: "where are you?",
    id: "ABC2",
  },
  {
    name: "Office Coll",
    lastMessage: "today we have meeting at 2",
    id: "ABC3",
  },
  {
    name: "Ritik Kumar",
    lastMessage: "hello",
    id: "ABC4",
  },
  {
    name: "Lpu College",
    lastMessage: "where are you?",
    id: "ABC5",
  },
  {
    name: "Office Coll",
    lastMessage: "today we have meeting at 2",
    id: "ABC6",
  },
  {
    name: "Ritik Kumar",
    lastMessage: "hello",
    id: "ABC8",
  },
  {
    name: "Lpu College",
    lastMessage: "where are you?",
    id: "ABC9",
  },
  {
    name: "Office Coll",
    lastMessage: "today we have meeting at 2",
    id: "ABC10",
  },
  {
    name: "Ritik Kumar",
    lastMessage: "hello",
    id: "ABC11",
  },
  {
    name: "Lpu College",
    lastMessage: "where are you?",
    id: "ABC12",
  },
  {
    name: "Office Coll",
    lastMessage: "today we have meeting at 2",
    id: "ABC13",
  },
];

const Conversation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedId, setSelectedId] = useState(user.userChatList[0].userId);
  const [searchUserName, setSearchUserName] = useState({
    userName: "",
  });
  const [allUser, setAllUser] = useState([]);
  const [userChatList, setUserChatList] = useState(user.userChatList);
  const [tempUserChatList, setTempUserChatList] = useState([])
  const [chatUserNameList, setChatUserNameList] = useState([])



  const sendMessage = (data) => {
    
    axios.post("/api/v1/message/send", data)
    .then((res) => {
          
    })

    tempUserChatList.filter((user) => user.userId !== data.toUserId)
  }

  if (user === null) {
    return <p>Not found</p>;
  }

  useEffect(() => {
    axios.get("/api/v1/user/all").then((res) => {
      setAllUser(res.data.filter((usr) => usr.userId !== user.id));
    });
  }, []);

  useEffect(() => {

    const interval = setInterval(() => {
      axios.get(`/api/v1/user/chatList/${user.id}`)
      .then((res) => {
        setUserChatList(res.data) 
        setChatUserNameList(res.data.map((user) => user.userId))
      })
    }, 1000);

    return () => clearInterval(interval);
  }, [])


  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {console.log("User",user)}
      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          width: "20%",
          pt: 2,
          px: 3,
          borderRight: "1px solid black",
          overflow: "auto",
          background: "#F5f5f5"
        }}
      >
        <Autocomplete
          id="country-select-demo"
          // sx={{ width: 300 }}
          options={allUser}
          value={searchUserName}
          onChange={(event, value, reason) => {
            if (reason === "clear") {
              setSearchUserName("");
              return;
            }

            setSearchUserName(value);
            const found = userChatList.some((user) => user.userId === value.userId)
            if(!found){
              setTempUserChatList([...tempUserChatList, value]);

            }
          }}
          // autoHighlight
          getOptionLabel={(option) => option.userName}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <Avatar>
                <PersonIcon />
              </Avatar>
              <Typography sx={{ ml: 1 }}>{option.userName} </Typography>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for username"
              inputProps={{
                ...params.inputProps,
                // autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      
        {tempUserChatList.filter((user) => {return !chatUserNameList.includes(user.userId)}).map((user, index) => {
          return <UserCard user={user} setSelectedId={setSelectedId} key={user.userId}/>;
        })}
        {userChatList.map((user, index) => {
          return <UserCard user={user} setSelectedId={setSelectedId} key={user.userId}/>;
        })}
      </Stack>
      <Box sx={{ width: "60%" }}>
        <MessageContainer selectedId={selectedId} profile={userChatList} sendMessage={sendMessage} />
      </Box>
      <Box sx={{ width: "20%" }}>
        <ProfileTab selectedId={selectedId} profile={userChatList} />
      </Box>
    </Box>
  );
};

export default Conversation;
