import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import './Backend.css'



const Backend = () => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [folders, setFolders] = useState({}); // Store folders by account address
  const [currentFolder, setCurrentFolder] = useState(null); // Selected folder
  const [folderName, setFolderName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Replace with your actual API keys
  const pinataApiKey = "7935ec64bb1819e8c459";
  const pinataSecretApiKey = "9d6dc95fcf5f9f2245ae3101fdef156fae6ec35ac24343b3877a713965e6931e";

  // Fetch all files from Pinata for the current account
  const fetchPinnedFiles = async () => {
    const url = `https://api.pinata.cloud/data/pinList?status=pinned`;

    try {
      const res = await axios.get(url, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });

      const pinnedFiles = res.data.rows;
      const foldersMap = {}; // To organize files by folders

      // Process files and group by folder
      pinnedFiles.forEach((file) => {
        const folder = file.metadata?.keyvalues?.folder || "Uncategorized";
        const owner = file.metadata?.keyvalues?.owner; // Assume owner's address is stored in metadata

        // Check if the file belongs to the current account
        if (owner === account) {
          if (!foldersMap[folder]) {
            foldersMap[folder] = [];
          }
          foldersMap[folder].push(file);
        }
      });

      const folderList = Object.keys(foldersMap).map((folder) => ({
        name: folder,
        files: foldersMap[folder],
      }));

      // Update state with folders for the current account
      setFolders((prev) => ({ ...prev, [account]: folderList }));
    } catch (error) {
      console.error("Error fetching pinned files:", error.response?.data || error.message);
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    if (account) {
      fetchPinnedFiles();
    }
  }, [account]);

  // Create a new folder
  const createFolder = () => {
    if (folderName.trim() !== "") {
      const newFolder = {
        name: folderName,
        files: [],
      };

      // Update local state for the current account
      setFolders((prev) => ({
        ...prev,
        [account]: [...(prev[account] || []), newFolder],
      }));
      setFolderName(""); // Reset folder input field
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Upload file to Pinata and associate it with a folder
  const uploadFile = async () => {
    if (!selectedFile || !currentFolder) {
      alert("Please select a folder and a file.");
      return;
    }

    let fileToUpload = selectedFile;

    // Check if the selected file is an HTML file
    if (selectedFile.type === "text/html") {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const htmlContent = e.target.result;

        // Convert the HTML content to plain text
        const plainTextContent = htmlContent.replace(/<[^>]+>/g, ""); // Strips out all HTML tags

        // Create a new Blob with plain text content
        const textBlob = new Blob([plainTextContent], { type: "text/plain" });

        // Prepare the text file for upload
        const textFile = new File([textBlob], selectedFile.name.replace(".html", ".txt"), {
          type: "text/plain",
        });

        // Update the file to be uploaded
        fileToUpload = textFile;

        // Proceed with the upload
        await uploadToPinata(fileToUpload);
      };

      reader.readAsText(selectedFile);
    } else {
      // If the file is not an HTML file, upload it as is
      await uploadToPinata(fileToUpload);
    }
  };

  // Helper function to upload file to Pinata
  const uploadToPinata = async (file) => {
    const data = new FormData();
    data.append("file", file);

    // Metadata for the folder
    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        folder: currentFolder.name, // Store folder name in metadata
        owner: account, // Store owner's address
      },
    });

    data.append("pinataMetadata", metadata);

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    try {
      const res = await axios.post(url, data, {
        maxContentLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });

      const newFile = {
        metadata: { name: file.name },
        ipfs_pin_hash: res.data.IpfsHash,
      };

      // Update local folder with the newly uploaded file for the current account
      setFolders((prevFolders) =>
        ({
          ...prevFolders,
          [account]: prevFolders[account].map((folder) => {
            if (folder.name === currentFolder.name) {
              return {
                ...folder,
                files: [...folder.files, newFile],
              };
            }
            return folder;
          }),
        })
      );

      setSelectedFile(null); // Reset selected file after upload
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
    }
  };

  // Replace file in Pinata
  const replaceFile = async (oldFile) => {
    if (!selectedFile) {
      alert("Please select a new file to replace the existing one.");
      return;
    }

    await deleteFile(oldFile.ipfs_pin_hash); // Delete old file
    await uploadFile(); // Upload new file
  };

  // Delete file from Pinata
  const deleteFile = async (fileHash) => {
    const url = `https://api.pinata.cloud/pinning/unpin/${fileHash}`;
    try {
      await axios.delete(url, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });

      // Update local state to remove the file for the current account
      setFolders((prevFolders) =>
        ({
          ...prevFolders,
          [account]: prevFolders[account].map((folder) => {
            if (folder.name === currentFolder.name) {
              return {
                ...folder,
                files: folder.files.filter((file) => file.ipfs_pin_hash !== fileHash),
              };
            }
            return folder;
          }),
        })
      );

      alert("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error.response?.data || error.message);
    }
  };

  // Download file from IPFS
  const downloadFile = (fileHash) => {
    const url = `https://gateway.pinata.cloud/ipfs/${fileHash}`;
    window.open(url, "_blank");
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);

        // Create a provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.log("MetaMask is not installed. Please install it.");
    }
  };

  // Handle account changes
  useEffect(() => {
    const checkAccount = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };

    checkAccount();

    // Listen for account changes
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        setAccount(null); // Set account to null if disconnected
        setFolders({}); // Clear folders if disconnected
      } else {
        setAccount(accounts[0]); // Update account
      }
    });
  }, []);

  return (
    <div className="main">
      
      {!account ? (
        <button onClick={connectWallet} className="btn">Connect MetaMask</button>
      ) : (
        <div className="center">
          <h2 className="text1" >Connected as: {account}</h2>
          <div>
            <input className="textarea"
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder Name"
            />
            <button onClick={createFolder}>Create Folder</button>
          </div>
          <h3 className="text2">Folders</h3>
          {folders[account] && folders[account].length > 0 ? (
            <ul>
            {folders[account].map((folder) => (
              <li key={folder.name} className="folder">
                <h4 className="folder-title">{folder.name}</h4>
                <ul>
                  {folder.files.map((file) => (
                    <li key={file.ipfs_pin_hash}>
                      {file.metadata.name}
                      <button className="buttonofall" onClick={() => downloadFile(file.ipfs_pin_hash)}>Download</button>
                      <button className="buttonofall" onClick={() => replaceFile(file)}>Replace</button>
                      <button className="buttonofall" onClick={() => deleteFile(file.ipfs_pin_hash)}>Delete</button>
                    </li>
                  ))}
                </ul>
                <button onClick={() => setCurrentFolder(folder)}>Select Folder</button>
              </li>
            ))}
          </ul>
          
          ) : (
            <p>No folders available</p>
          )}
          <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={uploadFile}>Upload File</button>
          </div>
        </div>
      )}
      
      
    </div>
  );
};

export default Backend;
