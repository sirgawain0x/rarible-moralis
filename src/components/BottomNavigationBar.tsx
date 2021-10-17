import React, { useMemo, useState, ChangeEvent } from "react";
import { navigate } from "@reach/router";
import { makeStyles, Theme } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import MarketplaceIcon from "@material-ui/icons/Storefront";
import PersonIcon from "@material-ui/icons/Person";

interface BottomNavigationBarProps {
	pathname: string;
}

const useStyles = makeStyles((theme: Theme) => ({
	bottomNavigationBarRoot: {
		position: "fixed",
		bottom: 0,
		width: "100vw",
		boxShadow: "-3px -3px 2px #c9c9c9",
	},
	addButton: {
		[theme.breakpoints.down("md")]: {
			position: "absolute",
			zIndex: 1,
			top: -30,
			left: 0,
			right: 0,
			margin: "0 auto",
		},
	},
}));

const BottomNavigationBar = (props: BottomNavigationBarProps): JSX.Element => {
	const { pathname } = props;
	const classes = useStyles();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialValue = useMemo(() => pathname.slice(1), []);
	const [value, setValue] = useState(initialValue);

	const handleChange = (event: ChangeEvent<unknown>, newValue: string) => {
		setValue(newValue);
	};

	return (
		<BottomNavigation
			value={value}
			onChange={handleChange}
			className={classes.bottomNavigationBarRoot}
		>
			<BottomNavigationAction
				label="Marketplace"
				value="marketplace"
				icon={<MarketplaceIcon />}
				onClick={() => navigate("/marketplace")}
			/>
			<Tooltip title="Mint ERC721" placement="top">
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
					onClick={() => navigate("/erc721/create")}
				>
					<AddIcon />
				</Fab>
			</Tooltip>
			<BottomNavigationAction
				label="Me"
				value="me"
				icon={<PersonIcon />}
				onClick={() => navigate("/me")}
			/>
		</BottomNavigation>
	);
};

export default BottomNavigationBar;
