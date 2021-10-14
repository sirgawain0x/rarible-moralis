import React, { forwardRef, useState, ReactElement, Ref } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import {
	MuiThemeProvider,
	createTheme,
	useTheme,
	makeStyles,
	Theme,
} from "@material-ui/core/styles";
import { TransitionProps } from "@material-ui/core/transitions";

interface IPFSUploadType {
	open: boolean;
	onCancel: () => void;
	onUpload: (files: Array<File>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
	buttonContainer: {
		padding: "0 1rem 1rem 0",
		[theme.breakpoints.down("md")]: {
			padding: "1rem",
		},
	},
}));

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

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children?: ReactElement<any, any> },
	ref: Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const IPFSUpload = (props: IPFSUploadType): JSX.Element => {
	const { open, onCancel, onUpload } = props;
	const classes = useStyles();
	const mainTheme = useTheme();
	const isSmallScreen = useMediaQuery(mainTheme.breakpoints.down("md"));
	const [IPFSFiles, setIPFSFiles] = useState<Array<File>>([]);

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
					className={classes.buttonContainer}
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
