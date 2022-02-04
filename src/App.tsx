import './App.css';
import  React, { useCallback, useState } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';
import {Connection} from 'web3-cloud';

// Auth provider
import { web3AuthProvider } from './features/auth/auth';
import { ActionData, AuthContextType } from './interface/auth-context.interface';

// Components
import LangingPage from './features/landing-page/landing-page';
import NFTs from './features/nfts/nfts';
import NFT from './features/nfts/nft/nft';
import Dashboard from './features/dashboard/dashboard';

// Redux
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectAccount, setOwner, signOutAccount } from './features/auth/ownerSlice';

let AuthContext = React.createContext<AuthContextType>(null!);
let INFURA_KEY = process.env.REACT_APP_INFURA_KEY? process.env.REACT_APP_INFURA_KEY: ''; 
const MESSAGE_TO_SIGN = 'Your message that users will sign';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<LangingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/nfts"
            element={
              <RequireAuth>
                <NFTs />
              </RequireAuth>
            } 
          />
          <Route path="nfts/:id"
            element={
              <RequireAuth>
                <NFT />
              </RequireAuth>
            }
          />
          <Route path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } 
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Nav() {
  return (
    <div>
      <AuthStatus />
      <nav>
        <ul>
          <li>
            <Link to="/">Public Page</Link>
          </li>
          <li>
            <Link to="/dashboard">Your Dashboard</Link>
          </li>
          <li>
            <Link to="/nfts">Your NFTs Collection</Link>
          </li>
        </ul>
      </nav>
    
      <Outlet />
    </div>
  );
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const account = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();

  let signup =  async (newUser: ActionData, callback: VoidFunction) => {
    return web3AuthProvider.signup(newUser, async () => {
      if (web3AuthProvider.isAuthenticated && newUser.signature && web3AuthProvider.isSignedUp) {
        dispatch(setOwner(web3AuthProvider.owner));
      }
      callback()
    });
  };

  let signin = (newUser: ActionData, callback: VoidFunction) => {
    return web3AuthProvider.signin(newUser, async () => {
      if (web3AuthProvider.isAuthenticated && newUser.signature) {
        dispatch(setOwner(web3AuthProvider.owner));
      }
      callback()
    });
  };

  let signout = (callback: VoidFunction) => {
    return web3AuthProvider.signout(() => {
      dispatch(signOutAccount(''));
      callback();
    });
  };

  let value = { account, signin, signup, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();
  const account = useAppSelector(selectAccount); 

  if (account === '') {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {account}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/auth"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const account = useAppSelector(selectAccount); 
  let location: any = useLocation();

  if (account === '') {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  } else {
    return children;
  }
}

function AuthPage() {
  let navigate = useNavigate();
  let location: any = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/dashboard";
  const [errorMessage, setErrorMessage] = useState('');

  const authCallbackData = useCallback(async (web3Values: ActionData) => {
    setErrorMessage('');
    try {
      switch(web3Values.actionType) {
        case 'SIGN_UP':
            auth.signup(web3Values, () => {
              navigate(from, { replace: true })
            });
          break;
        case 'SIGN_IN':
          auth.signin(web3Values, () => {
            navigate(from, { replace: true })
          });
          break;
        default:
          break;
      }
    } catch(err) {
        console.log('error when trying to sign in/sign up');
      }  
  }, [auth, from, navigate]);

  const authCallbackError = useCallback((error: any) => {
    setErrorMessage(error.message);
  }, []);

  return (
    <div>
      <Connection
        primary={true}
        backgroundcolor='green'
        size='large'
        verifyinglabel='Verifiying Signature...'
        dappname='Web3 Cloud'
        disableErrorDisplay={false}
        messageToSign={MESSAGE_TO_SIGN}
        infuraId={INFURA_KEY? INFURA_KEY : ''}   
        logourl='https://idrisbowman.com/images/idrisBowmanIcon.jpg'
        homePageurl='https://idrisbowman.com/'
        passweb3data={authCallbackData}
        errorcallback={authCallbackError}   
      />

      <div className='connection-error-message-container'>
        <p className='connection-error-message'>{errorMessage}</p>
      </div>
    </div>
  );
}

