import React from 'react';
import {Avatar, Button, ListItem, ListItemAvatar, ListItemText, Paper} from "@mui/material";
import {ChatMessage} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/user/usersSlice";

interface Props {
  message: ChatMessage;
  removeMessage: React.MouseEventHandler;
}

const Message:React.FC<Props> = ({removeMessage, message}) => {
  const user = useAppSelector(selectUser);

  return (
    <Paper sx={{mb: '5px'}} elevation={3}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src="/broken-image.jpg" />
        </ListItemAvatar>
        <ListItemText primary={message.username.displayName} secondary={message.text} />
        {
          user && user.role === 'moderator' ? (
            <Button onClick={removeMessage} variant='contained'>Удалить</Button>
          ) : null
        }
      </ListItem>
    </Paper>
  );
};

export default Message;