import  React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAccount, selectEmail, selectFirstName, selectLastName } from "../auth/ownerSlice";
import './dashboard.css';

export default function Dashboard() {
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);
  const email = useAppSelector(selectEmail);
  const account = useAppSelector(selectAccount);

  return (
    <div className="dashboard">
      <div>
          <h3>Welcome to your dashboard {firstName} {lastName}</h3>
          <hr></hr>
          <div>
            <p>Email: {email}</p>
            <p>Eth account: {account}</p>
          </div>
        </div>        
    </div>
  );
}