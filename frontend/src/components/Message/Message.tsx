import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, Paper} from "@mui/material";

const Message = () => {
  return (
    <Paper sx={{mb: '5px'}} elevation={3}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src="/broken-image.jpg" />
        </ListItemAvatar>
        <ListItemText primary='Дима' secondary='Привет всем !' />
      </ListItem>
    </Paper>
  );
};

export default Message;