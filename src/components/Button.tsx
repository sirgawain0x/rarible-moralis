import React, { ReactNode } from "react";
import MUIButton from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

interface ButtonType {
	loading?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	autoFocus?: boolean;
	type?: "button" | "submit" | "reset";
	children: ReactNode | string;
	variant?: "text" | "contained" | "outlined";
	color?: "primary" | "secondary" | "default";
	onClick?: () => void;
	className?: string;
}

const Button = (props: ButtonType): JSX.Element => {
	const { loading, disabled, children, ...rest } = props;
	return (
		<MUIButton
			disabled={disabled || loading}
			fullWidth
			style={{ height: "55px" }}
			{...rest}
		>
			{loading ? <CircularProgress /> : children}
		</MUIButton>
	);
};

export default Button;
