import React, { useMemo } from "react";
import { useMoralis } from "react-moralis";
import Grid from "@material-ui/core/Grid";
import { navigate, RouteComponentProps } from "@reach/router";
import { useSnackbar } from "notistack";
import Typography from "@material-ui/core/Typography";
import Button from "../../components/Button";
import Card from "../../components/Card";

// eslint-disable-next-line
const Dashboard = (_props: RouteComponentProps): JSX.Element => {
	const { user, logout } = useMoralis();
	const { enqueueSnackbar } = useSnackbar();
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
	// fetch IPFS image
	// async function fetchIPFSDoc(ipfsHash: any) {
	// 	const url = `https://ipfs.moralis.io:2053/ipfs/${ipfsHash}`;
	// 	const response = await fetch(url);
	// 	return response.json();
	// }

	return (
		<Grid container direction="column" spacing={3}>
			<Grid item xs={12}>
				<Typography variant="h6">User: {userData.username}</Typography>
			</Grid>

			{userData.email && (
				<Grid item xs={12}>
					<Typography variant="h6">Email: {userData.email}</Typography>
				</Grid>
			)}
			<Grid item xs={12}>
				<Button variant="outlined" onClick={onLogout}>
					Logout
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Card />
			</Grid>
		</Grid>
	);
};

export default Dashboard;
