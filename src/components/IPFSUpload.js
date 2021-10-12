import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DropzoneArea } from "material-ui-dropzone";
import { useMoralisFile } from "react-moralis";

const IPFSUpload = () => {
	const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
	const [IPFSFiles, setIPFSFiles] = useState([]);
	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="center"
		>
			<Grid item xs={12} lg={12} sx={{ width: "100%" }}>
				<DropzoneArea
					showPreviews
					showPreviewsInDropzone={false}
					useChipsForPreview
					onChange={(files) => setIPFSFiles(files)}
					previewGridProps={{ container: { spacing: 1, direction: "row" } }}
					previewChipProps={{
						classes: {
							root: {
								minWidth: 160,
								maxWidth: 210,
							},
						},
					}}
				/>
			</Grid>
			{IPFSFiles?.length > 0 && (
				<Grid item xs={12}>
					<Typography>{JSON.stringify(IPFSFiles)}</Typography>
				</Grid>
			)}
			<Grid item xs={12}>
				<Button>Upload to IPFS</Button>
			</Grid>
		</Grid>
	);
};

export default IPFSUpload;
