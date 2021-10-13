import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "./Drawer";

interface AppBarIndexType {
	pathname: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		menuButton: {
			marginRight: 36,
		},
	}),
);

const CustomAppBar = (props: AppBarIndexType): JSX.Element => {
	const { pathname } = props;
	const classes = useStyles();
	const [openAppBar, setOpenAppBar] = useState(false);

	return (
		<>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpenAppBar(!openAppBar)}
						edge="start"
						className={classes.menuButton}
					>
						{openAppBar ? <CloseIcon /> : <MenuIcon />}
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Rarible Moralis
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer open={openAppBar} pathname={pathname} />
		</>
	);
};

export default CustomAppBar;
