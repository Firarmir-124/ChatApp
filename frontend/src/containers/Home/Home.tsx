import React, {useEffect, useRef, useState} from 'react';
import Layout from "../../components/Layout/Layout";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  Paper,
  TextField
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Client from "../../components/Client/Client";
import {ChatMessage, IncomingMessageAndClient, IncomingNewMessage, UserName} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/user/usersSlice";
import {Navigate} from "react-router-dom";
import Message from "../../components/Message/Message";
import {logout} from "../../store/user/usersThunk";

const Home = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [clients, setClients] = useState<UserName[]>([]);
  const user = useAppSelector(selectUser);
  const ws = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/messenger?token=${user && user.token}`);

    ws.current.onclose = () => {
      console.log('Соединение закрыто !');
    };

    ws.current.onmessage = (event) => {
      const parseMessagesAndClients = JSON.parse(event.data) as IncomingMessageAndClient;
      const parseNewMessage = JSON.parse(event.data) as IncomingNewMessage;

      if (parseMessagesAndClients.type === 'LOGIN') {
        setMessages(parseMessagesAndClients.payload.messages);
        setClients(parseMessagesAndClients.payload.username);
      }

      if (parseNewMessage.type === 'NEW_MESSAGE') {
        setMessages(prev => [...prev, parseNewMessage.payload]);
      }
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    }

  }, [user && user.token]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ws.current) return;
    ws.current.send(JSON.stringify({
      type: 'SEND_MESSAGES',
      payload: value,
    }));

    setValue('');
  };

  const unsetUser = async () => {
    if (!ws.current) return;
    ws.current.send(JSON.stringify({
      type: 'EXT',
      payload: false,
    }));

    await dispatch(logout());
  };

  if (!user) {
    return <Navigate to={'/login'}/>;
  }

  return (
    <Layout unsetUser={unsetUser}>
      <Container>
        <Grid padding='10px' marginTop='10px' bgcolor='#12273c' container>
          <Grid marginRight='10px' xs={3} item>
            <Paper sx={{mb: '5px', p: '10px', bgcolor: '#2c3c4d'}} elevation={3}>
              <List style={{ width: '100%', background: '#fff' }}>
                {
                  clients.map((item) => (
                    <Client key={item._id} item={item}/>
                  ))
                }
              </List>
            </Paper>
          </Grid>
          <Grid
            sx={{
              height: '500px',
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {width:0}
            }}
            xs
            item
          >
            <Paper sx={{px: '5px', bgcolor: '#2c3c4d'}} elevation={4}>
              <List sx={{ width: '100%' }}>
                {
                  messages.map((item) => (
                    <Message key={item._id} message={item}/>
                  ))
                }
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{mt: '10px'}} elevation={3}>
          <Box onSubmit={sendMessage} component='form'>
            <TextField
              value={value}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
              type='text'
              InputProps={{endAdornment: <Button type='submit' variant="contained" endIcon={<SendIcon />}>Send</Button>}}
              fullWidth
            />
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Home;