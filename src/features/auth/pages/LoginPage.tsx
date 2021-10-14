import * as React from 'react';
import {
	Paper,
	Typography,
	Box,
	Button,
	styled,
	createTheme,
	CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from '../authSlice';

const theme = createTheme();

const Root = styled('div')({
	display: 'flex',
	flexWrap: 'nowrap',
	justifyContent: 'center',
	alignItems: 'center',
	minHeight: '100vh',
});

const box = { padding: theme.spacing(3) };

export default function LoginPage() {
	const dispatch = useAppDispatch();
	const isLogging = useAppSelector((state) => state.auth.logging);

	const handleLoginClick = () => {
		// Get username + pwd from login form
		dispatch(authActions.login({ username: '', password: '' }));
	};

	return (
		// <div style={root}>
		<Root>
			<Paper style={box} elevation={3}>
				<Typography variant="h5" component="h1">
					Student Management
				</Typography>

				<Box mt={4}>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleLoginClick}
					>
						{isLogging && <CircularProgress size={20} color="secondary" />} &nbsp;
						Fake Login
					</Button>
				</Box>
			</Paper>
			{/* </div> */}
		</Root>
	);
}
