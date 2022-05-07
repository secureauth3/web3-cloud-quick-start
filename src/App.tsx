import './App.css';
import  React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useAuth, useAuth3Token, useChainInfo } from 'web3-cloud';

import Dashboard from './features/dashboard/dashboard';
import Nav from './features/nav/nav';
import { RequireAuth } from './features/auth-features/requireAuth';
import AuthPage from './features/auth-features/authPage';
import Loading from './features/loading/Loading';

import { useAppDispatch } from './app/hooks';
import { setChainIdInfo, setisVerified, setUser } from './features/auth-features/userSlice';
import { AUTH3_REFRESH_TOKEN_SECRET } from './utils/utils';

export default function App() {
  let auth = useAuth(); 
  const {getAccessToken, setAuth3Token} = useAuth3Token(); 
  const { getChainInfo } = useChainInfo();
  let location: any = useLocation();
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  let from = location.pathname;
  const [isCheckingSSO, setisCheckingSSO] = useState(false);

  useEffect(() => {
    /* Secure Auth3 - SSO for persistence logins
      hint(You can define useEffect with an empty dependency which will 
      ensure that the functions only run once)
    */
    const doSingleSignin = async () => {
      setisCheckingSSO(true);
      const auth3Token = getAccessToken(AUTH3_REFRESH_TOKEN_SECRET);
      const ssoResult = await auth.auth3SSO(auth3Token.refreshToken, auth3Token.accessToken);
      setisCheckingSSO(false);
      if (ssoResult.isAuthenticated) {
        // Save authenicated user and acces token in Redux store
        dispatch(setisVerified(ssoResult.isAuthenticated));
        dispatch(setUser(ssoResult.user));
        dispatch(setChainIdInfo(getChainInfo(ssoResult.user.chainId)));
        setAuth3Token(ssoResult.accessToken, ssoResult.refreshToken, AUTH3_REFRESH_TOKEN_SECRET);

        // Navigate to protected route
        navigate(from, { replace: true });
      }
      return;
    }

    doSingleSignin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const doRenderAuthPage = () => {
    if (isCheckingSSO) {
      return <Route path="/auth" element={<Loading />} />;
    } else {
      return <Route path="/auth" element={<AuthPage />} />;
    }
  }

  return (
    <Routes>
      <Route element={<Nav />}>
        {doRenderAuthPage()}
        <Route path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } 
        />
      </Route>
      <Route path="*" element={<Navigate replace to="/dashboard" />} />
    </Routes>
  );
}

