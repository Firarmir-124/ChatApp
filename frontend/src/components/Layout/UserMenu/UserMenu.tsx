import React from 'react';
import {Button, CircularProgress, Typography} from "@mui/material";
import {User} from "../../../types";
import {logout} from "../../../store/user/usersThunk";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectLogoutLoading} from "../../../store/user/usersSlice";

interface Props {
  user: User
}

const UserMenu:React.FC<Props> = ({user}) => {
  const loading = useAppSelector(selectLogoutLoading);
  const dispatch = useAppDispatch();

  const unsetUser = async () => {
    await dispatch(logout());
  };


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