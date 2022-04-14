import  React from "react";
import {
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useAppSelector } from "../../app/hooks";
import { selectAccount } from "./userSlice";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const account = useAppSelector(selectAccount);
    let location: any = useLocation();
    let requestedPath = location.pathname;
    const failPath = `/auth`;
  
    if (account === '') {
      return <Navigate to={failPath} state={{ from: requestedPath }} replace />;
    } else {
      return children;
    }
}