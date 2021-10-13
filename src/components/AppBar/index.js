import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "./Drawer";

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
}));

const CustomAppBar = (props) => {
	const { pathname } = props;
	const [openAppBar, setOpenAppBar] = React.useState(false);

	return (
		<>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={() => setOpenAppBar(!openAppBar)}
						edge="start"
						sx={{
							marginRight: "36px",
						}}
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
// Importing DrawerHeader
export * from "./Drawer";
