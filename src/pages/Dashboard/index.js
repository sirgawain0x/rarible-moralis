import React, { useEffect } from "react";
import { Router, useLocation, navigate } from "@reach/router";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Dashboard from "./Dashboard";
import IPFS from "./IPFS";
import AppBar from "../../components/AppBar";

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Index = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		if (pathname === "/") {
			navigate("/dashboard");
		}
	}, [pathname]);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Router>
					<Dashboard path="dashboard" />
					<IPFS path="ipfs" />
				</Router>
			</Box>
		</Box>
	);
};

export default Index;
