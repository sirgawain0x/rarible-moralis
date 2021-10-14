import React from "react";
import Field from "@material-ui/core/TextField";

interface TextFieldType {
	id?: string;
	name: string;
	label?: string;
	value?: string;
	type?: string;
	margin?: "none" | "dense" | "normal";
	variant?: "filled" | "outlined" | "standard";
	required?: boolean;
	fullWidth?: boolean;
	autoFocus?: boolean;
	disabled?: boolean;
	multiline?: boolean;
	minRows?: number;
	maxRows?: number;
	onChange: (name: string, value: string) => void;
}

const TextField = (props: TextFieldType): JSX.Element => {
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

export default TextField;
