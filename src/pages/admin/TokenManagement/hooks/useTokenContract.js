import { useCallback } from 'react';
import { ethers } from 'ethers';
import { tokenABI, tokenBytecode } from '../constants';

export function useTokenContract() {
  const deployToken = useCallback(async (token) => {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    const TokenFactory = new ethers.ContractFactory(
      tokenABI,
      tokenBytecode,
      signer
    );

    const deployedToken = await TokenFactory.deploy(
      token.name,
      token.symbol,
      token.totalSupply,
      token.decimals
    );

    await deployedToken.deployed();
    return deployedToken.address;
  }, []);

  return {
    deployToken
  };
}