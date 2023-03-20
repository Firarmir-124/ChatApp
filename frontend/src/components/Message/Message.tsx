import React from 'react';
import {Avatar, Button, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@mui/material";
import {ChatMessage} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/user/usersSlice";
import dayjs from "dayjs";

interface Props {
  message: ChatMessage;
  removeMessage: React.MouseEventHandler;
}

const Message:React.FC<Props> = ({removeMessage, message}) => {
  const user = useAppSelector(selectUser);

  return (
    <Paper sx={{mb: '5px'}} elevation={3}>
      <ListItem>
        <Typography sx={{mr: '20px'}} component='p'>{dayjs(message.datetime).format("HH:mm")}</Typography>
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