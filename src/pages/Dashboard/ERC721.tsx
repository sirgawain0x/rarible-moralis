import React, { useState } from "react";
import { useMoralis, useMoralisFile } from "react-moralis";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { RouteComponentProps } from "@reach/router";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
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
	chip: {
		margin: theme.spacing(0.5),
	},
}));

// eslint-disable-next-line
const ERC721 = (_props: RouteComponentProps): JSX.Element => {
	const { Moralis } = useMoralis();
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
	const [attributesArray, setAttributesArray] = useState<string[]>([]);

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
				attributes: attributesArray,
			};

			const file = new Moralis.File("file.json", {
				base64: btoa(JSON.stringify(metadata)),
			});

			await file.saveIPFS();
			enqueueSnackbar("Uploading Metadata to IPFS Successful.", {
				variant: "success",
			});
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
			enqueueSnackbar(`Add Attributes "${values.attributes}" successful.`, {
				variant: "success",
			});
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
								type="submit"
								color="primary"
								variant="contained"
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
