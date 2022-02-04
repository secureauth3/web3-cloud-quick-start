
export interface AuthContextType {
    account: string | undefined;
    signin: (userAuthData: ActionData, callback: VoidFunction) => void;
    signup: (userAuthData: ActionData, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

export interface ActionData {
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
    web3Provider: any | null;
    message: string;
}

export interface Owner {
    account: string;
    email: string;
    firstName: string;
    lastName: string;
    ens: string;
    chainId: number;
  }
