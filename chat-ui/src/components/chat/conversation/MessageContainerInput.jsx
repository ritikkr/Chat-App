import { AttachFile, EmojiEmotions, Send } from '@mui/icons-material'
import { Box, IconButton, Paper, Stack, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../../hooks/useProvideAuth'

const MessageContainerInput = ({selectedId, handleSendMessage}) => {
  const [messageInputValue, setMessageInputValue] = useState('')
  const {user} = useAuth()

 
  return (
    <Paper sx={{height: '100%', }}>
        <Box >
            <Stack direction={"row"} justifyContent="center" alignItems={"center"}>
                <EmojiEmotions sx={{height: '30px', width: '80px'}} />
                
                <TextField value={messageInputValue} onChange={(e) => setMessageInputValue(e.target.value)} fullWidth/>
                <IconButton onClick={() => {
                  handleSendMessage(messageInputValue)
                  setMessageInputValue("")
                  }}><Send sx={{height: '30px', width: '80px'}}/></IconButton>
            </Stack>

        </Box>
    </Paper>
  )
}

export default MessageContainerInput