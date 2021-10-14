import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
import { useSnackbar } from "notistack";
import { useMoralis } from "react-moralis";
import Drawer from "./Drawer";
import Logo from "../../assets/logo.png";

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
		logo: {
			height: "55px",
			width: "auto",
		},
	}),
);

const CustomAppBar = (props: AppBarIndexType): JSX.Element => {
	const { pathname } = props;
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const { logout } = useMoralis();
	const [openAppBar, setOpenAppBar] = useState(false);

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
					<Grid container justifyContent="center" alignItems="center">
						<Grid item>
							<img src={Logo} alt="Logo" className={classes.logo} />
						</Grid>
						<Grid item>
							<Typography variant="h6" noWrap component="div">
								Rarible Moralis
							</Typography>
						</Grid>
					</Grid>
					<Button color="inherit" onClick={onLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Drawer open={openAppBar} pathname={pathname} />
		</>
	);
};

export default CustomAppBar;
