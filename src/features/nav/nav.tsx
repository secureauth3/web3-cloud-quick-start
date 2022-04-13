import {
    Link,
    Outlet
} from 'react-router-dom';

export default function Nav() {
    return (
      <div>
        {/* <AuthStatus /> */}
        <nav>
          <ul>
            <li>
              <Link to="/auth">Auth Page</Link>
            </li>
            <li>
              <Link to="/dashboard">Your Dashboard(Protected)</Link>
            </li>
            <li>
              <Link to="/nfts">Your NFTs Collection(Protected)</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    );
  }
  
  
// function AuthStatus() {
// let auth = useAuth();
// let navigate = useNavigate();
// const account = useAppSelector(selectAccount); 

// if (account === '') {
//     return <p>You are not logged in.</p>;
// }

// return (
//     <p>
//     Welcome {account}!{" "}
//     <button
//         onClick={() => {
//         auth.signout(() => navigate("/auth"));
//         }}
//     >
//         Sign out
//     </button>
//     </p>
// );
// }