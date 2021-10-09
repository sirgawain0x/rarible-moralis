import React from "react";
import { Router } from "@reach/router";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import { useMoralis } from "react-moralis";

const App = () => {
	const { isAuthenticated } = useMoralis();
	return (
		<Router>
			{isAuthenticated ? <Dashboard path="/*" /> : <Authentication path="/*" />}
		</Router>
	);
};

export default App;
