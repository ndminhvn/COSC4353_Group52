import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Link, Tooltip, Menu, MenuItem, Typography } from '@mui/material';
import { getToken, removeToken } from '../../utils/useToken.js';

import logo from '../../assets/logo.png';
import logo2 from '../../assets/logo2.png';

import './Navbar.css';

const NavBar = () => {
	const token = getToken();

	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

  	return (
		<>
		<Navbar className='main-nav' fluid='true' collapseOnSelect expand='lg'>
			<Navbar.Brand href='/' style={{marginLeft:'10vw'}}>
				<Image 
					fluid 
					className='App-logo' alt='logo' 
					src={logo} 
				/>
			</Navbar.Brand>

			<Navbar.Toggle aria-controls='responsive-navbar-nav'>
				{' '}
				<i className='fas fa-bars fa-lg'></i>
			</Navbar.Toggle>

			<Navbar.Collapse className='justify-content-end'>
				<Nav>
					<Link href='/quote' className='nav-link' color='black' underline='none'>Rate Predictor</Link>
					{(!token) ? 
						<Link href='/login' className='nav-link' color='black' underline='none'>Login</Link>
						: 
						<>
						<Tooltip title='Open settings'>
							<Link 
								className='nav-link' underline='none'
								color='black'
								onClick={handleOpenUserMenu}
								style={{cursor: 'pointer'}}
								// onMouseOver={handleOpenUserMenu} 
							>
								Account
							</Link>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
              				onClose={handleCloseUserMenu}
						>
							<Link href='/account' underline='none'>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography color='black' textAlign='center'>Profile Management</Typography>
								</MenuItem>
							</Link>
							<Link href='/history' underline='none'>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography color='black' textAlign='center'>Fuel Quote History</Typography>
								</MenuItem>
							</Link>
							<Link href='/' underline='none'>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography color='black' textAlign='center'>Dashboard</Typography>
								</MenuItem>
							</Link>
							<Link href='/' underline='none' onClick={removeToken}>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography color='black' textAlign='center'>Logout</Typography>
								</MenuItem>
							</Link>
						</Menu>
						</>
					}
				</Nav>
			</Navbar.Collapse>
		</Navbar>

		<Outlet />
		</>
	)
};

export default NavBar;