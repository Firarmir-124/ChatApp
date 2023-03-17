import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {linksStyle} from "../Layout";

const Anonymous = () => {
  return (
    <>
      <Link style={{...linksStyle, marginRight: '10px'}} to="/login">
        <Button sx={{color: '#fff'}} color="inherit" variant="outlined">Войти</Button>
      </Link>
      <Link style={linksStyle} to="/register">
        <Button color='secondary' variant="contained">Создать аккаунт</Button>
      </Link>
    </>
  );
};

export default Anonymous;