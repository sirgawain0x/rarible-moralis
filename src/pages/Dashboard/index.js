import React, { useEffect } from "react";
import { Router, useLocation, navigate } from "@reach/router";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Dashboard";
import ERC721 from "./ERC721";
import AppBar, { DrawerHeader } from "../../components/AppBar";

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
			<AppBar pathname={pathname} />
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Router>
					<Dashboard path="dashboard" />
					<ERC721 path="erc721" />
				</Router>
			</Box>
		</Box>
	);
};

export default Index;
