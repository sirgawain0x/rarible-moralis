import React, { useMemo } from "react";
import { useMoralis } from "react-moralis";
import Grid from "@material-ui/core/Grid";
import { RouteComponentProps } from "@reach/router";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
	divider: {
		marginBottom: theme.spacing(1),
	},
}));

// eslint-disable-next-line
const Dashboard = (_props: RouteComponentProps): JSX.Element => {
	const { user } = useMoralis();
	const classes = useStyles();
	const userData = useMemo(() => {
		return { username: user?.get("username"), email: user?.get("email") };
	}, [user]);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h4">Marketplace</Typography>
			</Grid>
			<Grid item xs={12}>
				<Divider className={classes.divider} />
			</Grid>
			<Grid item xs={12}>
				<Grid container direction="column" spacing={2}>
					<Grid item xs={12}>
						<Typography variant="h6">User: {userData.username}</Typography>
					</Grid>
					{userData.email && (
						<Grid item xs={12}>
							<Typography variant="h6">Email: {userData.email}</Typography>
						</Grid>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Dashboard;
