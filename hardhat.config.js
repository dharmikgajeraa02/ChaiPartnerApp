require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: SEPOLIA_URL, // Your Infura Project ID for Sepolia
      accounts: [PRIVATE_KEY], // Use the environment variable for your private key
      chainId: 11155111, // Chain ID for Sepolia
      
    },
  },
};
