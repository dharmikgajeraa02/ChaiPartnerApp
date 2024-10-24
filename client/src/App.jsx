import { useState, useEffect } from 'react';
import abi from "./contractJson/chai.json";
import { ethers } from "ethers";
import Memos from './components/Memos';
import Buy from './components/Buy';
import ChaiPartner from "./ChaiPartner.jpg";
import './App.css';

function App() {
    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null
    });
    const [account, setAccount] = useState('Not connected');

    useEffect(() => {
        const template = async () => {
            const contractAddress = "0xCB8bBf33E4e92d0B0B33728C18B9e0384d9e29De"; // Update to your contract address
            const contractABI = abi.abi;

            try {
                const { ethereum } = window;
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts"
                });

                setAccount(accounts[0]); // Set the connected account
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                const contract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
                console.log(contract);
                setState({ provider, signer, contract });

                // Set up event listener for account changes
                ethereum.on("accountsChanged", (accounts) => {
                    setAccount(accounts[0]);
                    window.location.reload();
                });

            } catch (error) {
                console.error("Error connecting to Ethereum:", error);
            }
        };
        template();
    }, []);

    return (
      <div className="app-container">
      <div className="image-container">
          <img src={ChaiPartner} className="chai-image" alt="Chai Partner" />
      </div>
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
          <small>Connected Account - {account}</small>
      </p>

      <Buy state={state} />
      <Memos state={state} />
  </div>
    );
}

export default App;
