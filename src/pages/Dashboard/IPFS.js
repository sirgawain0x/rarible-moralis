import React from "react";
import { useMoralisFile } from "react-moralis";
import IPFSUpload from "../../components/IPFSUpload";

const IPFS = () => {
	const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
	return <IPFSUpload />;
};

export default IPFS;
