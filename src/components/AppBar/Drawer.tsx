import React from "react";
import clsx from "clsx";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
import DrawerMenu from "./DrawerMenu";

interface DrawerType {
	open: boolean;
	pathname: string;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: "nowrap",
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: "hidden",
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9) + 1,
			},
		},
		toolbar: {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
		},
	}),
);

const CustomDrawer = (props: DrawerType): JSX.Element => {
	const { open, pathname } = props;
	const classes = useStyles();

	return (
		<Drawer
			variant="permanent"
			open={open}
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				}),
			}}
		>
			<div className={classes.toolbar} />
			<List>
				{DrawerMenu.map((menu) => {
					const { name, link, title, icon: Icon } = menu;
					const isSelected = pathname === `/${link}`;
					return (
						<ListItem
							button
							key={name}
							onClick={() => navigate(link)}
							selected={isSelected}
						>
							<ListItemIcon>
								<Icon />
							</ListItemIcon>
							<ListItemText primary={title} />
						</ListItem>
					);
				})}
			</List>
		</Drawer>
	);
};

export default CustomDrawer;
