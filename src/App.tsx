import React from "react";
import { Router } from "@reach/router";
import { useMoralis } from "react-moralis";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";

const App = (): JSX.Element => {
	const { isAuthenticated } = useMoralis();
	return (
		<Router>
			{isAuthenticated ? <Dashboard path="/*" /> : <Authentication path="/*" />}
		</Router>
	);
};

export default App;
