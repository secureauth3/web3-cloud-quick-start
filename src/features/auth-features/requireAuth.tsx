import  React from "react";
import {
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useAppSelector } from "../../app/hooks";
import { selectisVerified } from "./userSlice";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const isVerified = useAppSelector(selectisVerified);
    let location: any = useLocation();
    let requestedPath = location.pathname;
    const failPath = `/auth`;
  
    if (!isVerified) {
      return <Navigate to={failPath} state={{ from: requestedPath }} replace />;
    } else {
      return children;
    }
}