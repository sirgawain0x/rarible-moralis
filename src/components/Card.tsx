import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import alpha from "../assets/alpha.jpg";

const MediaCard = (): JSX.Element => {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia component="img" height="140" image={alpha} alt="alpha" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					Alpha
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Special Power Rangers NFT
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
