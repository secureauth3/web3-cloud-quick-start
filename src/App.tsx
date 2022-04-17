import './App.css';
import  React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useAuth } from 'web3-cloud';

import Dashboard from './features/dashboard/dashboard';
import Nav from './features/nav/nav';
import { RequireAuth } from './features/auth-features/requireAuth';
import AuthPage from './features/auth-features/authPage';
import Loading from './features/loading/Loading';

import { useAppDispatch } from './app/hooks';
import { setAccesToken, setisVerified, setUser } from './features/auth-features/userSlice';

export default function App() {
  let auth = useAuth();
  const dispatch = useAppDispatch();
  let location: any = useLocation();
  let navigate = useNavigate();

  let from = location.pathname;
  const [isCheckingSSO, setisCheckingSSO] = useState(false);

  useEffect(() => {
    /* Secure Auth3 - SSO for persistence logins
      hint(You can define useEffect with an empty dependency which will 
      ensure that the functions only run once)
    */
    const doSingleSignin = async () => {
      setisCheckingSSO(true);
      const ssoResult = await auth.auth3SSO();
      setisCheckingSSO(false);
      if (ssoResult.isAuthenticated) {
        // Save authenicated user and acces token in Redux store
        dispatch(setisVerified(ssoResult.isAuthenticated));
        dispatch(setAccesToken(ssoResult.accessToken));
        dispatch(setUser(ssoResult.user));

        // Navigate to protected route
        navigate(from, { replace: true });
      }
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
      {doRenderAuthPage()}
      <Route element={<Nav />}>
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

