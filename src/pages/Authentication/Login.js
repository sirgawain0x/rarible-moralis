import React, { useState, useMemo } from "react";
import { useMoralis } from "react-moralis";
import { navigate } from "@reach/router";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { useSnackbar } from "notistack";

const Login = () => {
	const { login, authenticate } = useMoralis();
	const { enqueueSnackbar } = useSnackbar();
	const [values, setValues] = useState({ username: "", password: "" });
	const initialLoadingButtonValue = {
		email: false,
		metamask: false,
		walletConnect: false,
	};
	const [loadingButton, setLoadingButton] = useState(initialLoadingButtonValue);
	const loading = useMemo(
		() =>
			loadingButton.email || loadingButton.metamask || loadingButton.walletConnect,
		[loadingButton],
	);

	const onChange = (name, value) => {
		setValues({ ...values, [name]: value });
	};

	/**
	 * @description Authenticating Moralis User with Crypto Wallet
	 * @example
	 * const res = await onCrytoLogin('metamask');
	 *
	 * @param {String} type - Crypto Login Option (e.g. Metamask, WalletConnect, or Elrond)
	 */
	const onCryptoLogin = async (type) => {
		setLoadingButton({ ...loadingButton, [type]: true });
		const options = () => {
			switch (type) {
				case "metamask":
					return {};
				case "walletConnect":
					return { provider: "walletconnect" };
				default:
					return {};
			}
		};

		await authenticate({
			...options(),
			signingMessage: "Rarible Moralis Crypto Login",
			onSuccess: () => {
				navigate("/dashboard");
			},
			onError: () => {
				enqueueSnackbar("Crypto Login Failed.", { variant: "error" });
				setLoadingButton(initialLoadingButtonValue);
			},
		});
	};

	/**
	 * @description Login Moralis User with traditional email and password
	 * @example
	 * const res = await onEmailLogin({
	 * 	username: "xxx",
	 * 	password: "xxx"
	 * });
	 *
	 * @param {String} username = Username of the user
	 * @param {String} password = Password of the user
	 */
	const onEmailLogin = async ({ username, password }) => {
		setLoadingButton({ ...loadingButton, email: true });
		await login(username, password, {
			onSuccess: () => {
				navigate("/dashboard");
			},
			onError: () => {
				enqueueSnackbar("Email Login Failed.", { variant: "error" });
				setLoadingButton(initialLoadingButtonValue);
			},
		});
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
					Sign in
				</Typography>
				<Box
					component="form"
					onSubmit={async (e) => {
						e.preventDefault();
						await onEmailLogin(values);
					}}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoFocus
						disabled={loading}
						value={values.username}
						onChange={onChange}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						disabled={loading}
						value={values.password}
						onChange={onChange}
					/>
					<Grid container justifyContent="space-between">
						<Grid item>
							<Link href="/forgot-password" variant="body2">
								Forgot Password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/signup" variant="body2">
								No Account?
							</Link>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						disabled={loading}
						loading={loadingButton.email}
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Divider>or continue with</Divider>
					<Button
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 1 }}
						disabled={loading}
						loading={loadingButton.metamask}
						onClick={() => onCryptoLogin("metamask")}
					>
						Connect to Metamask
					</Button>
					<Button
						fullWidth
						variant="contained"
						sx={{ mt: 1, mb: 2 }}
						disabled={loading}
						loading={loadingButton.walletConnect}
						onClick={() => onCryptoLogin("walletConnect")}
					>
						Connect to WalletConnect
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
