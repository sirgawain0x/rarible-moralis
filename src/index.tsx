import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import App from "./App";

const theme = createTheme({
	palette: {
		primary: {
			main: "#feda03",
		},
		secondary: {
			main: "#000000",
		},
	},
});

ReactDOM.render(
	<StrictMode>
		<MoralisProvider
			appId={process.env.REACT_APP_MORALIS_APP_ID ?? ""}
			serverUrl={process.env.REACT_APP_MORALIS_SERVER_ID ?? ""}
		>
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					maxSnack={3}
					anchorOrigin={{ horizontal: "center", vertical: "top" }}
				>
					<App />
				</SnackbarProvider>
			</ThemeProvider>
		</MoralisProvider>
	</StrictMode>,
	document.getElementById("root"),
);
