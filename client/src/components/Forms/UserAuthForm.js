import React, { useState } from 'react';
import { Container, Box, Tab, TextField, Button, Typography } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { useForm } from 'react-hook-form';
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
  const [loginResponse, setLoginResponse] = useState(); // api response (login) - used to display message to user
  const [registerResponse, setRegisterResponse] = useState(); // api response (register) - used to display message to user

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
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationLoginForm)
  });

  const { 
    register: register1,
    handleSubmit: handleSubmit1, 
    formState: { errors: errors1 } 
  } = useForm({
    resolver: yupResolver(validationRegisterForm)
  })

  const onLogin = async (data) => {
    // console.log(JSON.stringify(data, null, 2));
    await axios.post(`${BASE_URL}/login`, data)
      .then(res => {
        setToken(res.data.username);
        setLoginResponse(`Welcome back, ${res.data.username}! You have successfully logged in.`);
        setTimeout(() => {
          navigate(res.data.navigateTo);
          window.location.reload(true);
        }, 1500);
      }).catch(error => {
        setLoginResponse(error.response.data);
      })
  };

  const onRegister = async (data) => {
    // console.log(JSON.stringify(data, null, 2));
    await axios.post(`${BASE_URL}/register`, data)
      .then(res => {
        if (res.status === 200) {
          setRegisterResponse('Successfully registered!');
          setTimeout(() => {
            navigate('/login')
            window.location.reload(true);
          }, 1500);
        }
        else {
          setRegisterResponse(res.data);
        }
      })
      .catch(error => {
        setRegisterResponse(error.response.data);
      })
  };

  return (
    <Container maxWidth='md'>
      <Box
        id='login-box'
        backgroundColor='rgb(255, 255, 255)'
        display='flex'
        fluid='true'
        flexDirection={'column'}
        alignItems='center'
        justifyContent={'center'}
        margin='auto'
        marginBottom={5}
        padding={3}
        borderRadius={6}
        boxShadow={'5px 5px 10px #ccc'}
        sx={{ width: '50%',
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
                name='usernameLogin'
                label='Username'
                margin='normal'
                {...register('usernameLogin')}
                error={errors.firstName ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.usernameLogin?.message}
              </Typography>

              <TextField
                required
                fullWidth
                name='passwordLogin'
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
              {(loginResponse) && 
                <i style={{color: loginResponse.includes('You have successfully logged in.') ? 'green' : 'red'}}>
                  <p className='text-center'>{loginResponse}</p>
                </i>
              }
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
                name='usernameRegister'
                label='Username'
                margin='normal'
                {...register1('usernameRegister')}
                error={errors1.firstName ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.usernameRegister?.message}
              </Typography>
              <TextField
                required
                fullWidth
                name='passwordRegister'
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
              >
                Register
              </Button>
              {(registerResponse) && 
                <i style={{color: registerResponse === 'Successfully registered!' ? 'green' : 'red'}}>
                  <p className='text-center'>{registerResponse}</p>
                </i>
              }
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