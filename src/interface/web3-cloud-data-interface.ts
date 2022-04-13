import { ethers } from "ethers";

export interface FormSignatureData {
    actionType: string;
    verificationType: string;
    networkName: string;
    provideType: string;
    networkScanner: string;
    signature: string;
    chainId: number;
    address: string;
    ens: string;
    email: string;
    firstName?: string;
    lastName?: string;
    message: string;
    nonceSetFromBackend: boolean;
    web3Provider: ethers.providers.Web3Provider | null;
}
  
export interface ButtonSignatureData {
    actionType: string;
    verificationType: string;
    networkName: string;
    provideType: string;
    networkScanner: string;
    signature: string;
    chainId: number;
    address: string;
    ens: string;
    message: string;
    nonceSetFromBackend: boolean;
    web3Provider: ethers.providers.Web3Provider | null;
}

export interface ErrorMessageData {
    actionType: string;
    verificationType: string;
    message: string;
}