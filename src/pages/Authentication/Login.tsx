import React, { useState, useMemo, ChangeEvent } from "react";
import { useMoralis } from "react-moralis";
import { navigate, RouteComponentProps } from "@reach/router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { Web3Provider } from "react-moralis/lib/hooks/useMoralis/_useMoralisWeb3";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Logo from "../../assets/logo.png";

interface LoginType {
	username: string;
	password: string;
}

const useStyles = makeStyles((theme: Theme) => ({
	mainContainer: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	logo: {
		marginBottom: theme.spacing(2),
	},
	formContainer: {
		marginTop: theme.spacing(1),
	},
	emailButton: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
	},
	metamaskButton: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(1),
	},
	walletconnectButton: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2),
	},
}));

// eslint-disable-next-line
const Login = (_props: RouteComponentProps): JSX.Element => {
	const { login, authenticate } = useMoralis();
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const [values, setValues] = useState({ username: "", password: "" });
	const initialLoadingButtonValue = {
		email: false,
		metamask: false,
		walletConnect: false,
	};
	const [loadingButton, setLoadingButton] = useState(initialLoadingButtonValue);
	const loading = useMemo(() => {
		const { email, metamask, walletConnect } = loadingButton;
		return email || metamask || walletConnect;
	}, [loadingButton]);

	/**
	 * @description Handle Changes on Input fields
	 *
	 * @param {String} name - Name of the input field
	 * @param {String} value - Value of the input field
	 */
	const onChange = (name: string, value: string) => {
		setValues({ ...values, [name]: value });
	};

	/**
	 * @description Authenticating Moralis User with Crypto Wallet
	 * @example
	 * const res = await onCrytoLogin('metamask');
	 *
	 * @param {String} type - Crypto Login Option (e.g. Metamask, WalletConnect, or Elrond)
	 */
	const onCryptoLogin = async (type: string) => {
		setLoadingButton({ ...loadingButton, [type]: true });
		const options: () => { provider?: Web3Provider } = () => {
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
				navigate("/marketplace");
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
	const onEmailLogin = async ({ username, password }: LoginType) => {
		setLoadingButton({ ...loadingButton, email: true });
		await login(username, password, {
			onSuccess: () => {
				navigate("/marketplace");
			},
			onError: () => {
				enqueueSnackbar("Email Login Failed.", { variant: "error" });
				setLoadingButton(initialLoadingButtonValue);
			},
		});
	};

	const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		await onEmailLogin(values);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box className={classes.mainContainer}>
				<img src={Logo} alt="Logo" className={classes.logo} />
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					className={classes.formContainer}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoFocus
						variant="outlined"
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
						variant="outlined"
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
						color="primary"
						disabled={loading}
						loading={loadingButton.email}
						className={classes.emailButton}
					>
						Sign In
					</Button>
					{/* <Divider>or continue with</Divider> */}
					<Button
						fullWidth
						variant="contained"
						className={classes.metamaskButton}
						disabled={loading}
						loading={loadingButton.metamask}
						onClick={() => onCryptoLogin("metamask")}
					>
						Connect to Metamask
					</Button>
					<Button
						fullWidth
						variant="contained"
						className={classes.walletconnectButton}
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
