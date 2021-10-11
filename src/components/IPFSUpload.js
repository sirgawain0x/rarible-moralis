import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { useMoralisFile } from "react-moralis";

const IPFSUpload = () => {
	const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
	const [_, setIPFSFiles] = useState([]);
	return (
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
	);
};

export default IPFSUpload;
