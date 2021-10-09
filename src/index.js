import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = createTheme();

ReactDOM.render(
	<StrictMode>
		<MoralisProvider
			appId={process.env.REACT_APP_MORALIS_APP_ID}
			serverUrl={process.env.REACT_APP_MORALIS_SERVER_ID}
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
