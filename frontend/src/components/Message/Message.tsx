import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, Paper} from "@mui/material";
import {ChatMessage} from "../../types";

interface Props {
  message: ChatMessage
}

const Message:React.FC<Props> = ({message}) => {
  return (
    <Paper sx={{mb: '5px'}} elevation={3}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src="/broken-image.jpg" />
        </ListItemAvatar>
        <ListItemText primary={message.username.displayName} secondary={message.text} />
      </ListItem>
    </Paper>
  );
};

export default Message;