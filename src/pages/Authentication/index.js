import React from "react";
import { Router } from "@reach/router";
import Login from "./Login";
import SignUp from "./SignUp";

const Index = () => {
	return (
		<Router>
			<Login path="login" />
			<SignUp path="signup" />
		</Router>
	);
};

export default Index;
