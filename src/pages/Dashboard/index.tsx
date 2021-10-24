import React, { useEffect } from "react";
import {
	Router,
	useLocation,
	navigate,
	RouteComponentProps,
} from "@reach/router";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Marketplace from "./Marketplace";
import ERC721 from "./ERC721";
import Me from "./Me";
import AppBar from "../../components/AppBar";
import BottomNavigationBar from "../../components/BottomNavigationBar";

const useStyles = makeStyles((theme: Theme) => ({
	mainContainer: {
		display: "flex",
	},
	innerContainer: {
		padding: theme.spacing(3),
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	addButton: {
		[theme.breakpoints.up("lg")]: {
			position: "fixed",
			bottom: theme.spacing(6),
			right: theme.spacing(6),
		},
	},
}));

// eslint-disable-next-line
const Index = (_props: RouteComponentProps): JSX.Element => {
	const classes = useStyles();
	const { pathname } = useLocation();
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

	useEffect(() => {
		if (pathname === "/") {
			navigate("/marketplace");
		}
	}, [pathname]);

	return (
		<>
			{!isSmallScreen && (
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
			)}
			<Box className={classes.mainContainer}>
				<CssBaseline />
				<AppBar pathname={pathname} />
				<Box component="main" flexGrow={1} className={classes.innerContainer}>
					<div className={classes.toolbar} />
					<div className={classes.content}>
						<Router>
							<Marketplace path="marketplace" />
							<ERC721 path="erc721/*" />
							<Me path="me" />
						</Router>
					</div>
				</Box>
				{isSmallScreen && <BottomNavigationBar pathname={pathname} />}
			</Box>
		</>
	);
};

export default Index;
