import  React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectFirstName, selectLastName, selectEmail, selectAccount, selectLastLogin, selectChainId, selectPermissionFlags, selectPermissionType } from "../auth-features/userSlice";
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

  return (
    <div className="dashboard">
      <div>
          <h3>Welcome to your dashboard {firstName} {lastName}</h3>
          <hr></hr>
          <div>
            <p>Email: {email}</p>
            <p>Eth account: {account}</p>
            <p>ChainId: {chainId}</p>
            <p>Permission Flags: ({permissionFlags}) - {permissionType}</p>
            <p>Last login: {lastLogin}</p>
          </div>
        </div>        
    </div>
  );
}