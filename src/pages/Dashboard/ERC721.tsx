import React, { useState } from "react";
import { useMoralisFile } from "react-moralis";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useSnackbar } from "notistack";
import { RouteComponentProps } from "@reach/router";
import Button from "../../components/Button";
import IPFSUpload from "../../components/IPFSUpload";

// eslint-disable-next-line
const IPFS = (_props: RouteComponentProps): JSX.Element => {
	const { isUploading, saveFile } = useMoralisFile();
	const { enqueueSnackbar } = useSnackbar();
	const [openIPFSUpload, setOpenIPFSUpload] = useState(false);
	const [IPFSFileHash, setIPFSFileHash] = useState("");

	const onUpload = async (files: File[]) => {
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
