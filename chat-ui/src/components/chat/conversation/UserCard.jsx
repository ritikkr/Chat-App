import { Box, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import login from "../../../assets/login.svg"
const UserCard = ({user, setSelectedId}) => {

  const [cardDetail, setCardDetail] = useState([])
  const [lastMessage, setLastMessage] = useState([])

  useEffect(() => {
      axios.get(`/api/v1/user/${user.userId}`)
      .then((res) => {
        console.log(res.data);
          setCardDetail(res.data)
      })
      axios.get(`/api/v1/message/${user.lastMessageId}`)
      .then((res) => {
        setLastMessage(res.data)
      })

  }, [user.lastMessageId])
  return (
    <Paper >
    <div onClick={() => {
      
      setSelectedId(cardDetail.userId)}}>
    <Stack direction={"row"} spacing={3} >
        <img src={login} height={50} width={50} style={{borderRadius: '50%'}} />
        <Stack spacing={1}>
            <Typography sx={{fontWeight: 'bold'}}> {cardDetail.firstName}</Typography>
            <Typography sx={{color: 'gray'}}>{lastMessage.text}</Typography>
            {/* <Typography sx={{color: 'gray'}}>{cardDetail.userId}</Typography> */}
        </Stack>
    </Stack>
    </div>
</Paper>
  )
}

export default UserCard