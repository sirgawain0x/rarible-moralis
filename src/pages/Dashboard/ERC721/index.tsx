import React from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Collection from "./Collection";
import CreateERC721 from "./CreateERC721";

// eslint-disable-next-line
const Index = (_props: RouteComponentProps): JSX.Element => {
	return (
		<Router>
			<Collection path="/" />
			<CreateERC721 path="create" />
		</Router>
	);
};

export default Index;
