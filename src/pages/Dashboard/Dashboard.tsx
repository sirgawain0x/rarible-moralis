import React, { useMemo } from "react";
import { useMoralis } from "react-moralis";
import Grid from "@material-ui/core/Grid";
import { RouteComponentProps } from "@reach/router";
import Typography from "@material-ui/core/Typography";
import Card from "../../components/Card";

// eslint-disable-next-line
const Dashboard = (_props: RouteComponentProps): JSX.Element => {
	const { user } = useMoralis();
	const userData = useMemo(() => {
		return { username: user?.get("username"), email: user?.get("email") };
	}, [user]);

	// fetch IPFS image
	// async function fetchIPFSDoc(ipfsHash: any) {
	// 	const url = `https://ipfs.moralis.io:2053/ipfs/${ipfsHash}`;
	// 	const response = await fetch(url);
	// 	return response.json();
	// }

	return (
		<Grid container direction="column" spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h6">User: {userData.username}</Typography>
			</Grid>
			{userData.email && (
				<Grid item xs={12}>
					<Typography variant="h6">Email: {userData.email}</Typography>
				</Grid>
			)}
			<Grid item xs={12}>
				<Card />
			</Grid>
		</Grid>
	);
};

export default Dashboard;
