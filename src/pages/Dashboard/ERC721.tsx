import React, { useState } from "react";
import { useMoralisFile } from "react-moralis";
import { Moralis } from "moralis";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useSnackbar } from "notistack";
import { RouteComponentProps } from "@reach/router";
import Box from "@material-ui/core/Box";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import IPFSUpload from "../../components/IPFSUpload";

// eslint-disable-next-line
const ERC721 = (_props: RouteComponentProps): JSX.Element => {
	const { isUploading, saveFile } = useMoralisFile();
	const { enqueueSnackbar } = useSnackbar();
	const [openIPFSUpload, setOpenIPFSUpload] = useState(false);
	const [IPFSFileHash, setIPFSFileHash] = useState("");
	const [values, setValues] = useState({
		name: "",
		description: "",
		attributes: [],
	});

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
				// @ts-ignore
				setIPFSFileHash(result._ipfs ?? "");
				enqueueSnackbar("Uploading to IPFS Successful.", {
					variant: "success",
				});
				setOpenIPFSUpload(false);
			},
			onError: () => {
				enqueueSnackbar("Uploading to IPFS Failed.", { variant: "error" });
			},
		});
	};
	// Upload metadata object name & description image
	const uploadMetaData = async (imageURL: any) => {
		const { name } = values;
		const { description } = values;

		const metadata = {
			name,
			description,
			image: imageURL,
			attributes: [],
		};

		const file = new Moralis.File("file.json", {
			base64: Buffer.from(`${metadata}`).toString("base64"),
		});
		await file.saveIPFS();
	};

	return (
		<Box component="form">
			<div>
				<TextField
					id="metadataName"
					label="Name"
					variant="outlined"
					name="name"
					value={values.name}
					onChange={handleChange}
				/>
				<TextField
					id="metadataDescription"
					label="Description"
					multiline
					name="description"
					value={values.description}
					onChange={handleChange}
				/>
				<TextField
					id="metadataAttributes"
					label="Attributes"
					multiline
					name="attributes"
					value={values.description}
					onChange={handleChange}
				/>
			</div>
			<Button loading={isUploading} onClick={() => setOpenIPFSUpload(true)}>
				Upload Image
			</Button>
			<Typography variant="h6">
				<Link href={IPFSFileHash} target="_blank" rel="noopener">
					{IPFSFileHash}
				</Link>
			</Typography>
			<IPFSUpload
				open={openIPFSUpload}
				onCancel={() => setOpenIPFSUpload(false)}
				onUpload={onUpload}
			/>
		</Box>
	);
};

export default ERC721;
