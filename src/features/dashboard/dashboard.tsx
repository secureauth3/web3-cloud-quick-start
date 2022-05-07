import  React from "react";
import { useAppSelector } from "../../app/hooks";
import { capitalizeFirstLetter } from "../../utils/utils";
import { selectFirstName, selectLastName, selectEmail, selectAccount, selectLastLogin, selectChainId, selectPermissionFlags, selectPermissionType, selectWalletName } from "../auth-features/userSlice";
import './dashboard.scss';

export default function Dashboard() {
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);
  const email = useAppSelector(selectEmail);
  const account = useAppSelector(selectAccount);
  const lastLogin = useAppSelector(selectLastLogin);
  const chainId = useAppSelector(selectChainId);
  const permissionFlags = useAppSelector(selectPermissionFlags);
  const permissionType = useAppSelector(selectPermissionType);
  const walletName = useAppSelector(selectWalletName);
  
  return (
    <div className="dashboard">
      <div>
          <h3>Welcome to your dashboard {firstName} {lastName}</h3>
          <hr></hr>
          <div>
          <p>Connected with {capitalizeFirstLetter(walletName)}</p>
            <p>Eth account: {account}</p>
            <p>First name: {firstName}</p>
            <p>Last name: {lastName}</p>
            <p>Email: {email}</p>
            <p>ChainId: {chainId}</p>
            <p>Permission Flags: ({permissionFlags}) - {permissionType}</p>
            <p>Last login: {lastLogin}</p>
          </div>
        </div>        
    </div>
  );
}