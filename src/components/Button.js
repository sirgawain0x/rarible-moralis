import React from "react";
import PropTypes from "prop-types";
import MUIButton from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const Button = (props) => {
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

Button.propTypes = {
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	children: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
	sx: PropTypes.objectOf(PropTypes.object),
};

Button.defaultProps = {
	loading: false,
	disabled: false,
	children: <></>,
	sx: {},
};

export default Button;
