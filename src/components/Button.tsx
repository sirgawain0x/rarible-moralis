import React, { ReactNode } from "react";
import MUIButton from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface ButtonType {
	loading?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	type?: "button" | "submit" | "reset";
	children: ReactNode | string;
	variant?: "text" | "contained" | "outlined";
	onClick?: () => void;
	sx?: any;
}

const Button = (props: ButtonType): JSX.Element => {
	const { loading, disabled, children, sx, ...rest } = props;
	return (
		<MUIButton
			disabled={disabled || loading}
			fullWidth
			sx={{ ...sx, height: "55px" }}
			{...rest}
		>
			{loading ? <CircularProgress /> : children}
		</MUIButton>
	);
};

export default Button;
