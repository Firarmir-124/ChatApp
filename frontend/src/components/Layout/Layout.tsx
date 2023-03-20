import React from 'react';
import {AppBar, Box, Container, Grid, Toolbar, Typography} from "@mui/material";
import AnonymousMenu from "./AnonymousMenu/AnonymousMenu";
import RedditIcon from '@mui/icons-material/Reddit';
import {Link} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../../store/user/usersSlice";
import UserMenu from "./UserMenu/UserMenu";

interface Props {
  children: React.ReactNode
  unsetUser?: () => void;
}

export const linksStyle:React.CSSProperties = {
  textDecoration: 'none',
  color: '#333'
};

const Layout:React.FC<Props> = ({unsetUser, children}) => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <AppBar position="static">
        <Container maxWidth='lg'>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container alignItems='center'>
                <Grid item>
                  <Typography component={Link} to='/' style={{ ...linksStyle, color: '#fff', fontSize: '25px' }} color="text.secondary">
                    WhatCat
                  </Typography>
                </Grid>
                <Grid item>
                  <RedditIcon style={{fontSize: '50px'}}/>
                </Grid>
              </Grid>
            </Box>
            {
              !user ? (
                <AnonymousMenu/>
              ) : <UserMenu unsetUser={unsetUser} user={user}/>
            }
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