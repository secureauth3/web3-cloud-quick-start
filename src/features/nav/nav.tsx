import {
    Link,
    Outlet,
    useNavigate
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAccount, setAccesToken, setisVerified, setUser } from '../auth/userSlice';
import { useAuth } from 'web3-cloud';

export default function Nav() {
  return (
    <div>
      <AuthStatus />
      <nav>
        <ul>
          <li>
            <Link to="/auth">Auth Page(Public page)</Link>
          </li>
          <li>
            <Link to="/dashboard">Your Dashboard(Protected)</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
  
function AuthStatus() {
  let auth = useAuth();
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const account = useAppSelector(selectAccount); 

  if (account === '') {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {account}!{" "}
      <button
        onClick={async () => {
          // Sign out user
          const signOutResult = await auth.auth3Signout();
          dispatch(setisVerified(false));
          dispatch(setAccesToken(''));
          dispatch(setUser(signOutResult.user));
          navigate('/auth', { replace: true });
        }}
      >
      Sign out
      </button>
    </p>
  );
}