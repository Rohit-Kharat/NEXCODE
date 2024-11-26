import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

// ABI and contract address
const contractABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "_repoId", "type": "uint256" },
      { "internalType": "string", "name": "_ipfsHash", "type": "string" }
    ],
    "name": "createPullRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }],
    "name": "createRepo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_repoId", "type": "uint256" },
      { "internalType": "uint256", "name": "_pullRequestId", "type": "uint256" }
    ],
    "name": "mergePullRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // Additional ABI methods and events...
  {
    "inputs": [{ "internalType": "address", "name": "_contributor", "type": "address" }],
    "name": "registerContributor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_contributor", "type": "address" }],
    "name": "unregisterContributor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "repoCount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "repositories",
    "outputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "uint256", "name": "pullRequestCount", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const contractAddress = '0x34FA20308E38962fa35eF758c94a9821ab54ce21';

const PinataApp = () => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');
  const [repoName, setRepoName] = useState('');
  const [repoId, setRepoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pinata API details from environment variables
  const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
  const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;

  // Web3 variables
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          setProvider(provider);
          setContract(contract);
          console.log('Blockchain data loaded successfully');
        } else {
          alert('MetaMask not detected! Please install MetaMask to use this application.');
          console.error('MetaMask not available.');
        }
      } catch (error) {
        console.error('Error loading blockchain data:', error);
      }
    };

    loadBlockchainData();
  }, []);

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload file to Pinata (IPFS)
  const uploadToPinata = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append('file', file);

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(url, data, {
        maxContentLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data`,
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataSecretApiKey,
        },
      });

      setIpfsHash(response.data.IpfsHash);
      alert('File uploaded successfully to IPFS!');
    } catch (error) {
      console.error('Error uploading file: ', error);
      setError('Error uploading file to IPFS.');
      alert('Error uploading file to IPFS.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new repository
  const createRepo = async () => {
    if (!repoName) {
      alert('Please enter a repository name.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const tx = await contract.createRepo(repoName);
      await tx.wait();
      alert('Repository created successfully!');
    } catch (error) {
      console.error('Error creating repository:', error);
      setError('Error creating repository.');
    } finally {
      setLoading(false);
    }
  };

  // Submit a pull request to the repository
  const submitPullRequest = async () => {
    if (!repoId || !ipfsHash) {
      alert('Repository ID and IPFS hash are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const tx = await contract.createPullRequest(repoId, ipfsHash);
      await tx.wait();
      alert('Pull request submitted successfully!');
    } catch (error) {
      console.error('Error submitting pull request:', error);
      setError('Error submitting pull request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload and Manage Repositories with Pinata and Smart Contracts</h1>
      
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* File Upload Section */}
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadToPinata}>Upload to IPFS</button>
      </div>

      {/* Repo Creation */}
      <div>
        <input type="text" placeholder="Repository Name" onChange={(e) => setRepoName(e.target.value)} />
        <button onClick={createRepo}>Create Repository</button>
      </div>

      {/* Pull Request Creation */}
      <div>
        <input type="number" placeholder="Repository ID" onChange={(e) => setRepoId(e.target.value)} />
        <button onClick={submitPullRequest}>Submit Pull Request</button>
      </div>

      {/* Show IPFS Hash */}
      {ipfsHash && <div><strong>IPFS Hash:</strong> {ipfsHash}</div>}
    </div>
  );
};

export default PinataApp;
