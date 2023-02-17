import React, { useState } from 'react';
import { Container, Box, Tab, TextField, Button, Typography } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { setToken } from '../../utils/useToken.js';
import { BASE_URL } from '../../utils/constants.js';

import './UserAuthForm.css';

const LoginForm = () => {
  const [tab, setTab] = useState('1');
  const navigate = useNavigate();

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const validationLoginForm = Yup.object().shape({
    usernameLogin: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(10, 'Username must not exceed 10 characters'),
    passwordLogin: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters'),
  });

  const validationRegisterForm = Yup.object().shape({
    usernameRegister: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(10, 'Username must not exceed 10 characters'),
    passwordRegister: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('passwordRegister'), null], 'Confirm Password does not match')
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationLoginForm)
  });

  const { 
    register: register1, 
    control: control1, 
    handleSubmit: handleSubmit1, 
    formState: { errors: errors1 } 
  } = useForm({
    resolver: yupResolver(validationRegisterForm)
  })

  const onLogin = async (data) => {
    console.log(JSON.stringify(data, null, 2));
    await axios.post(`${BASE_URL}/user/login`, data)
      .then(res => {
        setToken(res.data);
        alert('You have successfully logged in!');
        navigate('/');
        window.location.reload(true);
      }).catch(error => {
        console.error(error);
        alert('Something went wrong. Please try again.');
      })
  };

  const onRegister = async (data) => {
    console.log(JSON.stringify(data, null, 2));
    await axios.post(`${BASE_URL}/user/register`, data)
      .then(res => {
        if (res.status === 200) {
          alert('Successfully registered!');
          navigate('/login')
          window.location.reload(true);
          // console.log('Successfully registered');
        }
        else {
          // console.log('Something went wrong. Please try again');
          alert('Something went wrong. Please try again.');
        }
      })
  };

  return (
    <Container maxWidth='md'>
      <Box
        backgroundColor='rgb(255, 255, 255)'
        display='flex'
        fluid='true'
        flexDirection={'column'}
        alignItems='center'
        justifyContent={'center'}
        margin='auto'
        marginTop={5}
        padding={3}
        borderRadius={6}
        boxShadow={'5px 5px 10px #ccc'}
        sx={{ width: '50%',
              borderBottom: 1, 
              borderColor: 'divider',
              ':hover': {
                boxShadow: '10px 10px 20px #ccc'
              }
            }}
      >
        <TabContext value={tab}>
          <TabList
            onChange={handleTabChange}
            textColor='primary'
            indicatorColor='primary'
            aria-label='forms'
          >
            <Tab value='1' label='Login' size='lg' />
            <Tab value='2' label='Register' size='lg' />
          </TabList>

          {/* Login Form */}
          <TabPanel value='1'>
            <form onSubmit={handleSubmit(onLogin)}>
              <TextField
                required
                fullWidth
                name='username'
                label='Username'
                // type='text'
                margin='normal'
                {...register('username')}
                error={errors.firstName ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.usernameLogin?.message}
              </Typography>

              <TextField
                required
                fullWidth
                name='passwordLogin'
                // control={control}
                label='Password'
                type='password'
                autoComplete='currentPassword'
                margin='normal'
                {...register('passwordLogin')}
                error={errors.passwordLogin ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.passwordLogin?.message}
              </Typography>
              <Button 
                className='login-btn mb-3 mt-3' 
                fullWidth
                type='submit'
                variant='contained' 
                color='success' 
                size='lg'
              >
                Login
              </Button>
              <p className="text-center">Not a client yet? <a href='#register' onClick={() => setTab('2')}>
                  Register Now!
                </a>
              </p>
            </form>
          </TabPanel>
          {/* Login Form done */}
            
          {/* Register Form */}
          <TabPanel value="2">
            <form onSubmit={handleSubmit1(onRegister)}>
              <TextField
                required
                fullWidth
                name='username'
                label='Username'
                // type='text'
                margin='normal'
                {...register1('username')}
                error={errors1.firstName ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.usernameRegister?.message}
              </Typography>
              <TextField
                required
                fullWidth
                name='passwordRegister'
                // control={control}
                label='Password'
                type='password'
                autoComplete='currentPassword'
                margin='normal'
                {...register1('passwordRegister')}
                error={errors1.passwordRegister ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors1.passwordRegister?.message}
              </Typography>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                autoComplete='currentPassword'
                type="password"
                fullWidth
                margin="dense"
                {...register1('confirmPassword')}
                error={errors1.confirmPassword ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.confirmPassword?.message}
              </Typography>
              <Button 
                className='login-btn mb-3 mt-3'
                fullWidth
                type='submit'
                variant='contained' 
                color='success' 
                size='lg'
                // onClick={handleSubmit1(onSubmit1)}
              >
                Register
              </Button>
              <p className="text-center"><a href='#login' onClick={() => setTab('1')}>Back to Login</a></p>
            </form>
          </TabPanel>
          {/* Register Form done */}

        </TabContext>
      </Box>
    </Container>
  )
}
  
export default LoginForm;