import React from "react";
import { Router } from "@reach/router";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
	return (
		<Router>
			<Login path="login" />
			<SignUp path="signup" />
		</Router>
	);
};

export default App;
