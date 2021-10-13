import React, { useEffect } from "react";
import {
	Router,
	useLocation,
	navigate,
	RouteComponentProps,
} from "@reach/router";
import Login from "./Login";
import SignUp from "./SignUp";

// eslint-disable-next-line
const Index = (_props: RouteComponentProps): JSX.Element => {
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
