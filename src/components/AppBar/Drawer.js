import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import MuiDrawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { navigate } from "@reach/router";
import DrawerMenu from "./DrawerMenu";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

export const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const CustomDrawer = (props) => {
	const { open, pathname } = props;

	return (
		<Drawer variant="permanent" open={open}>
			<DrawerHeader />
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

CustomDrawer.propTypes = {
	open: PropTypes.bool,
	pathname: PropTypes.string.isRequired,
};

CustomDrawer.defaultProps = {
	open: false,
};

export default CustomDrawer;