import React, { useState } from "react";
import { useMoralisFile } from "react-moralis";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useSnackbar } from "notistack";
import Button from "../../components/Button";
import IPFSUpload from "../../components/IPFSUpload";

const IPFS = () => {
	const { isUploading, saveFile } = useMoralisFile();
	const { enqueueSnackbar } = useSnackbar();
	const [openIPFSUpload, setOpenIPFSUpload] = useState(false);
	const [IPFSFileHash, setIPFSFileHash] = useState("");

	const onUpload = async (files) => {
		const { path } = files[0];
		await saveFile(path, files[0], {
			saveIPFS: true,
			onSuccess: (result) => {
				// eslint-disable-next-line no-underscore-dangle
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

	return (
		<>
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
		</>
	);
};

export default IPFS;
