import React from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) => ({
	divider: {
		marginBottom: theme.spacing(1),
	},
	addButton: {
		position: "absolute",
		bottom: theme.spacing(6),
		right: theme.spacing(6),
	},
}));

// eslint-disable-next-line
const Collection = (_props: RouteComponentProps): JSX.Element => {
	const classes = useStyles();
	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant="h4">ERC721 Collections</Typography>
				</Grid>
				<Grid item xs={12}>
					<Divider className={classes.divider} />
				</Grid>
			</Grid>
			<Tooltip title="Mint ERC721" placement="top">
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
					onClick={() => navigate("/erc721/create")}
				>
					<AddIcon />
				</Fab>
			</Tooltip>
		</>
	);
};

export default Collection;
