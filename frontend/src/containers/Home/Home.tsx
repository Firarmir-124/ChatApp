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
import {ChatMessage, IncomingMessageAndClient, UserName} from "../../types";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/user/usersSlice";
import {Navigate} from "react-router-dom";

const Home = () => {
  const [messages, setMessages] = useState<ChatMessage | null>(null);
  const [clients, setClients] = useState<UserName | null>(null);
  const user = useAppSelector(selectUser);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8000/messenger?token=${user && user.token}`);

    ws.current.onclose = () => {
      console.log('Соединение закрыто !');
    }

    ws.current.onmessage = (event) => {
      const parseMessagesAndClients = JSON.parse(event.data) as IncomingMessageAndClient;

      if (parseMessagesAndClients.type === 'LOGIN') {
        setMessages(parseMessagesAndClients.payload.messages);
        setClients(parseMessagesAndClients.payload.username);
      }
    }

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    }

  }, [user && user.token]);

  if (!user) {
    return <Navigate to={'/login'}/>;
  }


  return (
    <Layout>
      <Container>
        <Grid padding='10px' marginTop='10px' bgcolor='#12273c' container>
          <Grid marginRight='10px' xs={3} item>
            <Paper sx={{mb: '5px', p: '10px', bgcolor: '#2c3c4d'}} elevation={3}>
              <List style={{ width: '100%', background: '#fff' }}>
                <Client/>
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
                Сообщения
              </List>
            </Paper>
          </Grid>
        </Grid>

        <Paper sx={{mt: '10px'}} elevation={3}>
          <Box component='form'>
            <TextField
              type='text'
              InputProps={{endAdornment: <Button variant="contained" endIcon={<SendIcon />}>Send</Button>}}
              fullWidth
            />
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Home;