import React from 'react';
import {AppBar, Box, Container, Grid, Toolbar, Typography} from "@mui/material";
import AnonymousMenu from "./AnonymousMenu/AnonymousMenu";
import RedditIcon from '@mui/icons-material/Reddit';
import {Link} from "react-router-dom";

interface Props {
  children: React.ReactNode
}

export const linksStyle:React.CSSProperties = {
  textDecoration: 'none',
  color: '#333'
};

const Layout:React.FC<Props> = ({children}) => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth='lg'>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container alignItems='center'>
                <Grid item>
                  <Typography component={Link} to='/' style={{ ...linksStyle, color: '#fff', fontSize: '25px' }} color="text.secondary">
                    Reddit
                  </Typography>
                </Grid>
                <Grid item>
                  <RedditIcon style={{fontSize: '50px'}}/>
                </Grid>
              </Grid>
            </Box>
            <AnonymousMenu/>
          </Toolbar>
        </Container>
      </AppBar>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;