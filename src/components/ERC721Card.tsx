import React from "react";
import useSWR from "swr";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

interface ERC721CardType {
	IPFSMetadataLink: string;
}

const useStyles = makeStyles((theme: Theme) => ({
	cardContainer: {
		maxWidth: "345px",
	},
	chip: {
		margin: theme.spacing(0.5),
	},
}));

const ERC721Card = (props: ERC721CardType): JSX.Element => {
	const { IPFSMetadataLink } = props;
	const classes = useStyles();
	const { data } = useSWR(IPFSMetadataLink, (args) =>
		fetch(args).then((res) => res.json()),
	);

	return (
		<Card className={classes.cardContainer}>
			<CardMedia component="img" height="140" image={data?.image} alt="alpha" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{data?.name}
				</Typography>
				<Typography variant="body2" color="secondary">
					{data?.description}
				</Typography>
				<Grid container>
					{data?.attributes.map((attr: string) => {
						return (
							<Grid item key={attr}>
								<Chip label={attr} className={classes.chip} />
							</Grid>
						);
					})}
				</Grid>
			</CardContent>
		</Card>
	);
};
export default ERC721Card;
