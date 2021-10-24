import React, { useState } from "react";
import { useMoralis, useMoralisFile, useNewMoralisObject } from "react-moralis";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { RouteComponentProps, navigate } from "@reach/router";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "../../../components/TextField";
import Button from "../../../components/Button";
import IPFSUpload from "../../../components/IPFSUpload";

const useStyles = makeStyles((theme: Theme) => ({
	divider: {
		marginBottom: theme.spacing(1),
	},
	buttonContainer: {
		marginTop: theme.spacing(7),
	},
	chip: {
		margin: theme.spacing(0.5),
	},
	dialogContentContainer: {
		paddingTop: theme.spacing(3),
	},
	image: {
		height: "50px",
		width: "auto",
	},
}));

// eslint-disable-next-line
const CreateERC721 = (_props: RouteComponentProps): JSX.Element => {
	const { Moralis } = useMoralis();
	const { isUploading, saveFile } = useMoralisFile();
	const { isSaving, save } = useNewMoralisObject("ERC721LazyMint");
	const { enqueueSnackbar } = useSnackbar();
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
	const classes = useStyles();
	const [openIPFSUpload, setOpenIPFSUpload] = useState(false);
	const [values, setValues] = useState({
		name: "",
		description: "",
		image: "",
		attributes: "",
	});
	const [attributesArray, setAttributesArray] = useState<string[]>([]);
	const [openSummary, setOpenSummary] = useState(false);

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
		try {
			const metadata = {
				...values,
				// For the purpose of OpenSea integration
				attributes: [
					{
						trait_type: "Strength",
						value: 73,
					},
					{
						trait_type: "Intelligence",
						value: 95,
					},
					{
						trait_type: "Agility",
						value: 67,
					},
				],
			};

			const file = new Moralis.File("file.json", {
				base64: btoa(JSON.stringify(metadata)),
			});

			const res = await file.saveIPFS();
			save(
				// @ts-ignore
				{ erc721MetaData: res._ipfs },
				{
					onSuccess: () => {
						enqueueSnackbar("Uploading Metadata to IPFS Successful.", {
							variant: "success",
						});
						navigate("/marketplace");
					},
					onError: () => {
						enqueueSnackbar("Failed to save IPFS Metadata.", {
							variant: "error",
						});
					},
				},
			);
		} catch (e) {
			enqueueSnackbar("Uploading Metadata to IPFS Failed.", {
				variant: "error",
			});
		}
	};

	/**
	 * @description Handle adding attributes to the field
	 */
	const handleAddAttributes = () => {
		if (values.attributes !== "") {
			setAttributesArray([...attributesArray, values.attributes]);
			// Empty the input
			setValues({ ...values, attributes: "" });
		} else {
			enqueueSnackbar("Attributes field is empty.", {
				variant: "warning",
			});
		}
	};

	/**
	 * @description Handle deleting existing attributes
	 *
	 * @param attribute - the selected attributes that is going to be deleted
	 */
	const handleDeleteAttributes = (attribute: string) => {
		setAttributesArray((attrArray) =>
			attrArray.filter((attr) => attr !== attribute),
		);
	};

	return (
		<>
			<Dialog
				maxWidth="md"
				aria-labelledby="confirmation-dialog-title"
				open={openSummary}
				fullScreen={isSmallScreen}
			>
				<DialogTitle id="confirmation-dialog-title">
					Mint ERC721 Confirmation
				</DialogTitle>
				<DialogContent dividers>
					<Typography>
						<b>Are you sure you want to Lazy Mint this NFT?</b>
					</Typography>
					<Grid
						container
						spacing={3}
						className={classes.dialogContentContainer}
					>
						<Grid item xs={12}>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Typography variant="body1">Name</Typography>
								</Grid>
								<Grid item xs={12}>
									<Divider />
								</Grid>
								<Grid item xs={12}>
									<Typography variant="subtitle2">{values.name}</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Typography variant="body1">Description</Typography>
								</Grid>
								<Grid item xs={12}>
									<Divider />
								</Grid>
								<Grid item xs={12}>
									<Typography variant="subtitle2">
										{values.description}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Typography variant="body1">IPFS Image</Typography>
								</Grid>
								<Grid item xs={12}>
									<Divider />
								</Grid>
								<Grid item xs={12}>
									<img
										src={values.image}
										alt="IPFS"
										className={classes.image}
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid container spacing={1}>
								<Grid item xs={12}>
									<Typography variant="body1">Attributes</Typography>
								</Grid>
								<Grid item xs={12}>
									<Divider />
								</Grid>
								<Grid item xs={12}>
									<Grid container>
										{attributesArray.map((attr) => {
											return (
												<Grid item key={attr}>
													<Chip label={attr} className={classes.chip} />
												</Grid>
											);
										})}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<Button
								autoFocus
								loading={isSaving}
								color="secondary"
								variant="contained"
								onClick={() => setOpenSummary(false)}
							>
								Cancel
							</Button>
						</Grid>
						<Grid item xs={12} md={6}>
							<Button
								loading={isSaving}
								color="primary"
								variant="contained"
								onClick={onUploadMetaData}
							>
								Confirm
							</Button>
						</Grid>
					</Grid>
				</DialogActions>
			</Dialog>
			<Box
				component="form"
				onSubmit={(e) => {
					e.preventDefault();
					setOpenSummary(true);
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
						<Grid container spacing={2}>
							<Grid item xs={9}>
								<TextField
									id="metadataAttributes"
									label="Attributes"
									name="attributes"
									variant="outlined"
									value={values.attributes}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={3}>
								<Button
									color="primary"
									variant="contained"
									onClick={handleAddAttributes}
								>
									Add
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} md={7}>
						<Grid container>
							{attributesArray.map((attr) => {
								return (
									<Grid item key={attr}>
										<Chip
											label={attr}
											onDelete={() => handleDeleteAttributes(attr)}
											className={classes.chip}
										/>
									</Grid>
								);
							})}
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid
							container
							justifyContent="flex-end"
							spacing={2}
							className={classes.buttonContainer}
						>
							<Grid item xs={12} md={4}>
								<Button
									color="secondary"
									variant="contained"
									onClick={() => setOpenIPFSUpload(true)}
								>
									Cancel
								</Button>
							</Grid>
							<Grid item xs={12} md={4}>
								<Button type="submit" color="primary" variant="contained">
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
		</>
	);
};

export default CreateERC721;
