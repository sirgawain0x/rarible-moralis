import React, { useEffect, useMemo } from "react";
import { Router, useLocation, navigate } from "@reach/router";
import { useSnackbar } from "notistack";
import { useMoralis } from "react-moralis";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "../../components/Button";
import Dashboard from "./Dashboard";
import IPFS from "./IPFS";

const Index = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { user, logout } = useMoralis();
	const { pathname } = useLocation();
	const userData = useMemo(() => {
		return { username: user?.get("username"), email: user?.get("email") };
	}, [user]);

	/**
	 * @description Handle user logout with Moralis
	 * @example
	 * const res = await onLogout();
	 *
	 */
	const onLogout = async () => {
		try {
			await logout();
			navigate("/login");
		} catch (e) {
			enqueueSnackbar("Logout Failed.", { variant: "error" });
		}
	};

	useEffect(() => {
		if (pathname === "/") {
			navigate("/dashboard");
		}
	}, [pathname]);

	return (
		<Grid container direction="column" sx={{ p: 3 }}>
			<Router>
				<Dashboard path="dashboard" />
				<IPFS path="ipfs" />
			</Router>
			<Typography variant="h6">User: {userData.username}</Typography>
			{userData.email && (
				<Typography variant="h6">Email: {userData.email}</Typography>
			)}
			<Button variant="outlined" onClick={onLogout}>
				Logout
			</Button>
		</Grid>
	);
};

export default Index;
