import React from 'react';
import {Button, CircularProgress, Typography} from "@mui/material";
import {User} from "../../../types";
import {useAppSelector} from "../../../app/hooks";
import {selectLogoutLoading} from "../../../store/user/usersSlice";

interface Props {
  user: User;
  unsetUser?: React.MouseEventHandler;
}

const UserMenu:React.FC<Props> = ({unsetUser, user}) => {
  const loading = useAppSelector(selectLogoutLoading);

  return (
    <>
      <Typography sx={{mr: '10px'}} component='p'>
        Привет {user.displayName}
      </Typography>
      <Button disabled={loading} onClick={unsetUser} variant="contained" color="error">
        {!loading ? 'Выйти' : <CircularProgress color='inherit' size={24}/>}
      </Button>
    </>
  );
};

export default UserMenu;