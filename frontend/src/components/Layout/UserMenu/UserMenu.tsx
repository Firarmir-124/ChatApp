import React from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {linksStyle} from "../Layout";
import {User} from "../../../types";

interface Props {
  user: User
}

const UserMenu:React.FC<Props> = ({user}) => {
  return (
    <>
      <Link style={{...linksStyle, marginRight: '10px'}} to="/create">
        <Button color='warning' variant="contained">Привет {user.displayName}</Button>
      </Link>
      <Button variant="contained" color="error">
        Выйти
      </Button>
    </>
  );
};

export default UserMenu;