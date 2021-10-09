import React from "react";
import PropTypes from "prop-types";
import Field from "@mui/material/TextField";

const TextField = (props) => {
	const { name, onChange, ...rest } = props;
	return (
		<Field
			name={name}
			onChange={(e) => {
				e.preventDefault();
				onChange(name, e.target.value);
			}}
			fullWidth
			{...rest}
		/>
	);
};

TextField.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
};

TextField.defaultProps = {
	name: "",
	onChange: () => {},
};

export default TextField;
