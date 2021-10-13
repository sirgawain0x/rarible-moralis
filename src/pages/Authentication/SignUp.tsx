import React, { useState, ChangeEvent } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useMoralis } from "react-moralis";
import { useSnackbar } from "notistack";
import { navigate, RouteComponentProps } from "@reach/router";
import TextField from "../../components/TextField";
import Button from "../../components/Button";

interface SignUpType {
	username: string;
	email: string;
	password: string;
}

const useStyles = makeStyles((theme: Theme) => ({
	mainContainer: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	formContainer: {
		marginTop: theme.spacing(3),
	},
	submitButton: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
	},
}));

// eslint-disable-next-line
const SignUp = (_props: RouteComponentProps): JSX.Element => {
	const { signup } = useMoralis();
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const [loadingButton, setLoadingButton] = useState(false);
	const [values, setValues] = useState({
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
	});

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
	 * @description Handle Email Sign Up for User
	 *
	 * @param {String} username - User's Username
	 * @param {String} email - User's Email
	 * @param {String} password - User's Password
	 */
	const onSignUp = async ({ username, email, password }: SignUpType) => {
		setLoadingButton(true);
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
					setLoadingButton(false);
				},
			},
		);
	};

	/**
	 * @description Handle Sign Up Submission to Moralis with Email
	 *
	 * @param e - React Event Object
	 */
	const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		await onSignUp(values);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box className={classes.mainContainer}>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					className={classes.formContainer}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								variant="outlined"
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
								variant="outlined"
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
								variant="outlined"
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
								variant="outlined"
								value={values.confirmPassword}
								onChange={onChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						loading={loadingButton}
						className={classes.submitButton}
					>
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
