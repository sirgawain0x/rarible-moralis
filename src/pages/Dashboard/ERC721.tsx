import React, { useState } from "react";
import { useMoralisFile } from "react-moralis";
import { Moralis } from "moralis";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { RouteComponentProps } from "@reach/router";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import IPFSUpload from "../../components/IPFSUpload";

const useStyles = makeStyles((theme: Theme) => ({
	divider: {
		marginBottom: theme.spacing(1),
	},
	buttonContainer: {
		marginTop: theme.spacing(7),
	},
}));

// eslint-disable-next-line
const ERC721 = (_props: RouteComponentProps): JSX.Element => {
	const { isUploading, saveFile } = useMoralisFile();
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const [openIPFSUpload, setOpenIPFSUpload] = useState(false);
	const [values, setValues] = useState({
		name: "",
		description: "",
		image: "",
		attributes: "",
	});
	const [attributesArray] = useState([]);

	const handleChange = (name: string, value: string) => {
		setValues({ ...values, [name]: value });
	};

	/**
	 * @description Handle IPFS Uploading
	 *
	 * @param files - File Array Object that is going to be uploaded to IPFS
	 */
	const onUpload = async (files: Array<File>) => {
		// @ts-ignore
		const { path } = files[0];
		await saveFile(path, files[0], {
			saveIPFS: true,
			onSuccess: (result) => {
				if (result) {
					// @ts-ignore
					setValues({ ...values, image: result._ipfs ?? "" });
					enqueueSnackbar("Uploading to IPFS Successful.", {
						variant: "success",
					});
					setOpenIPFSUpload(false);
				} else {
					enqueueSnackbar("Failed to fetch result from IPFS.", {
						variant: "error",
					});
				}
			},
			onError: () => {
				enqueueSnackbar("Uploading to IPFS Failed.", { variant: "error" });
			},
		});
	};

	/**
	 * @description Handle NFT Metadata Upload
	 */
	const onUploadMetaData = async () => {
		const metadata = {
			...values,
			attributes: attributesArray,
		};

		const file = new Moralis.File("file.json", {
			base64: Buffer.from(`${metadata}`).toString("base64"),
		});

		// @ts-ignore
		await onUpload([file]);
	};

	return (
		<Box
			component="form"
			onSubmit={async (e) => {
				e.preventDefault();
				await onUploadMetaData();
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant="h4">Mint ERC721</Typography>
				</Grid>
				<Grid item xs={12}>
					<Divider className={classes.divider} />
				</Grid>
				<Grid item xs={12} md={7}>
					<TextField
						id="metadataName"
						label="Name"
						variant="outlined"
						required
						name="name"
						value={values.name}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} md={7}>
					<TextField
						id="metadataDescription"
						label="Description"
						multiline
						required
						minRows={5}
						variant="outlined"
						name="description"
						value={values.description}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} md={7}>
					{values.image !== "" ? (
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<Button
									color="secondary"
									variant="contained"
									onClick={() => setValues({ ...values, image: "" })}
								>
									Delete
								</Button>
							</Grid>
							<Grid item xs={12} md={6}>
								<Button
									color="primary"
									variant="contained"
									onClick={() => window.open(values.image, "_blank")}
								>
									Preview
								</Button>
							</Grid>
						</Grid>
					) : (
						<Button
							loading={isUploading}
							color="primary"
							variant="contained"
							onClick={() => setOpenIPFSUpload(true)}
						>
							Upload Image
						</Button>
					)}
				</Grid>
				<Grid item xs={12} md={7}>
					<TextField
						id="metadataAttributes"
						label="Attributes"
						name="attributes"
						variant="outlined"
						value={values.description}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<Grid
						container
						justify="flex-end"
						spacing={2}
						className={classes.buttonContainer}
					>
						<Grid item xs={12} md={4}>
							<Button
								loading={isUploading}
								color="secondary"
								variant="contained"
								onClick={() => setOpenIPFSUpload(true)}
							>
								Cancel
							</Button>
						</Grid>
						<Grid item xs={12} md={4}>
							<Button
								loading={isUploading}
								color="primary"
								variant="contained"
								onClick={() => setOpenIPFSUpload(true)}
							>
								Upload NFT Metadata
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<IPFSUpload
				open={openIPFSUpload}
				onCancel={() => setOpenIPFSUpload(false)}
				onUpload={onUpload}
			/>
		</Box>
	);
};

export default ERC721;
