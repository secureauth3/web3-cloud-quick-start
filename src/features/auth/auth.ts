import { ActionData } from "../../interface/auth-context.interface";
import { fetchOwner, postOwner } from "./ownerAPI";

 const web3AuthProvider = {
    isAuthenticated: false,
    isSignedUp: false,
    owner: {
      account: '',
      email: '',
      firstName: '',
      lastName: '',
      ens: '',
      chainId: 0
    },
    async signup(ownerData: ActionData, callback: VoidFunction) {
      // create owner from mock api
      const ownerResult = await postOwner(ownerData);
      if (ownerResult.data) {
        web3AuthProvider.isSignedUp = ownerResult.ownerCreated;
        web3AuthProvider.owner  = ownerResult.data;
      }
      callback();
    },
    async signin(ownerData: ActionData, callback: VoidFunction) {
      // fetch owner from mock api
      const ownerResult = await fetchOwner(ownerData);
      if (ownerResult) {
        web3AuthProvider.owner  = ownerResult.data;
        web3AuthProvider.isAuthenticated = true
      }
      callback();
    },
    async signout(callback: VoidFunction) {
      web3AuthProvider.isAuthenticated = false;
      web3AuthProvider.isSignedUp = false;     
      callback();
    },
};
  
export { web3AuthProvider };
  