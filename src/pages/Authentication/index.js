import React, { useEffect } from "react";
import { Router, useLocation, navigate } from "@reach/router";
import Login from "./Login";
import SignUp from "./SignUp";

const Index = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		if (pathname === "/") {
			navigate("/login");
		}
	}, [pathname]);

	return (
		<Router>
			<Login path="login" />
			<SignUp path="signup" />
		</Router>
	);
};

export default Index;
