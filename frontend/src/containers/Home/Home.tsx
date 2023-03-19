import React from 'react';
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
import Message from "../../components/Message/Message";

const Home = () => {
  return (
    <Layout>
      <Container>
        <Grid padding='10px' marginTop='10px' bgcolor='#12273c' container>
          <Grid marginRight='10px' xs={3} item>
            <Paper sx={{mb: '5px', p: '10px', bgcolor: '#2c3c4d'}} elevation={3}>
              <List style={{ width: '100%', background: '#fff' }}>

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
                <Message/>
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