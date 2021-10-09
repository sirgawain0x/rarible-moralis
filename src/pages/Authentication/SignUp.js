import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useMoralis } from "react-moralis";
import { useSnackbar } from "notistack";
import { navigate } from "@reach/router";
import TextField from "../../components/TextField";

const SignUp = () => {
	const { signup } = useMoralis();
	const { enqueueSnackbar } = useSnackbar();
	const [values, setValues] = useState({
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
	});

	const onChange = (name, value) => {
		setValues({ ...values, [name]: value });
	};

	const onSignUp = async ({ username, email, password }) => {
		await signup(
			username,
			password,
			email,
			{},
			{
				onSuccess: () => {
					enqueueSnackbar("Sign Up Successful.", { variant: "success" });
					navigate("/dashboard");
				},
				onError: () => {
					enqueueSnackbar("Sign Up Failed.", { variant: "error" });
				},
			},
		);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={async (e) => {
						e.preventDefault();
						await onSignUp(values);
					}}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={values.email}
								onChange={onChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="username"
								name="username"
								label="Username"
								value={values.username}
								onChange={onChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								value={values.password}
								onChange={onChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="password"
								value={values.confirmPassword}
								onChange={onChange}
							/>
						</Grid>
					</Grid>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/login" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default SignUp;
