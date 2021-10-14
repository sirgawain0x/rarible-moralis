import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import alpha from "../assets/alpha.jpg";

const useStyles = makeStyles({
	cardContainer: {
		maxWidth: "345px",
	},
});

const MediaCard = (): JSX.Element => {
	const classes = useStyles();

	return (
		<Card className={classes.cardContainer}>
			<CardMedia component="img" height="140" image={alpha} alt="alpha" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					Alpha
				</Typography>
				<Typography variant="body2" color="secondary">
					Special Power Rangers collection
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">LazyMint to Rarible</Button>
				<Button size="small">Sell Order</Button>
			</CardActions>
		</Card>
	);
};
export default MediaCard;
