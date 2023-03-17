import React, { useState } from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { RegisterMutation } from '../../types';
import {Avatar, Box, Button, CircularProgress, Container, Grid, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Layout from "../../components/Layout/Layout";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectRegisterError, selectRegisterLoading} from "../../store/user/usersSlice";
import {register} from "../../store/user/usersThunk";

const Register = () => {
  const dispatch = useAppDispatch();
  const registerLoading = useAppSelector(selectRegisterLoading);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    displayName: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState(prevState => ({...prevState, [name]: value}));
  };

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch (e) {

    }
  };

  const getFieldError = (filedName: string) => {
    try {
      return  error?.errors[filedName].message
    } catch {
      return undefined
    }
  };

  return (
    <Layout>
      <Container maxWidth='lg'>
        <Box
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{mt: 3, width: '500px'}} onSubmit={formSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  autoComplete="new-username"
                  value={state.username}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('username'))}
                  helperText={getFieldError('username')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="DisplayName"
                  name="displayName"
                  autoComplete="new-username"
                  value={state.displayName}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('displayName'))}
                  helperText={getFieldError('displayName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  value={state.password}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('password'))}
                  helperText={getFieldError('password')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              disabled={registerLoading}
            >
              {!registerLoading ? 'Sign Up' : <CircularProgress color='inherit' size={30}/>}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Register;