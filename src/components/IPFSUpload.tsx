import React, { forwardRef, useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
// IMPORTANT NOTE: Using Material UI V4 here for supporting `material-ui-dropzone`
// These shall be imported to V5 once `material-ui-dropzone` migrated to V5
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

interface IPFSUploadType {
	open: boolean;
	onCancel: () => void;
	onUpload: (files: Array<File>) => void;
}

const theme = createTheme({
	overrides: {
		// @ts-ignore
		MuiDropzonePreviewList: {
			imageContainer: { textAlign: "left", width: "100%", marginTop: "1rem" },
			image: {
				height: "100%",
				width: "auto",
				boxShadow: "3px 3px 4px #292929",
			},
		},
	},
});

const Transition = forwardRef(function Transition(props, ref) {
	// @ts-ignore
	return <Slide direction="up" ref={ref} {...props} />;
});

const IPFSUpload = (props: IPFSUploadType): JSX.Element => {
	const { open, onCancel, onUpload } = props;
	const V5Theme = useTheme();
	const isSmallScreen = useMediaQuery(V5Theme.breakpoints.down("md"));
	const [IPFSFiles, setIPFSFiles] = useState([] as File[]);

	/**
	 * @description Handle Cancelling IPFS Upload Process
	 */
	const handleCancel = () => {
		onCancel();
		// Reset files to be empty
		setIPFSFiles([]);
	};

	/**
	 * @description Handle Upload Files to IPFS
	 */
	const handleUpload = () => {
		onUpload(IPFSFiles);
	};

	return (
		<Dialog
			open={open}
			fullWidth
			fullScreen={isSmallScreen}
			maxWidth="md"
			// @ts-ignore
			TransitionComponent={Transition}
		>
			<DialogTitle>Upload to IPFS</DialogTitle>
			<DialogContent>
				<MuiThemeProvider theme={theme}>
					<DropzoneArea
						filesLimit={1}
						showPreviews
						showPreviewsInDropzone={false}
						onChange={(files) => setIPFSFiles(files)}
						previewText=""
						alertSnackbarProps={{
							anchorOrigin: { vertical: "top", horizontal: "center" },
						}}
					/>
				</MuiThemeProvider>
			</DialogContent>
			<DialogActions>
				<Grid
					container
					direction={isSmallScreen ? "column" : "row"}
					justifyContent="flex-end"
					spacing={1}
					sx={
						isSmallScreen ? { padding: "1rem" } : { padding: "0 1rem 1rem 0" }
					}
				>
					<Grid item>
						<Button
							variant="contained"
							color="secondary"
							fullWidth
							onClick={handleCancel}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={handleUpload}
						>
							Upload to IPFS
						</Button>
					</Grid>
				</Grid>
			</DialogActions>
		</Dialog>
	);
};

export default IPFSUpload;
