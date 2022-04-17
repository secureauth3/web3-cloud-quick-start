import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ErrorMessageData, Form, FormSignatureData, NewAuth3User, useAuth } from "web3-cloud";

import { useAppDispatch } from "../../app/hooks";
import { setAccesToken, setisVerified, setUser } from "./userSlice";

import Loading from "../loading/Loading";
import './authPage.scss';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY? process.env.REACT_APP_INFURA_KEY: ''; 

export default function AuthPage() {
  let auth = useAuth();
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  let location: any = useLocation();

  const MESSAGE_TO_SIGN = 'Your message that users will sign';
  let from = location.state?.from?.pathname || "/dashboard";
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifiying, setIsVerifiying] = useState(false);

  const authCallbackData = useCallback(async (web3Values: FormSignatureData) => {
    try {
      let signInResults;
      setIsVerifiying(true);
      switch(web3Values.actionType) {
        case 'SIGN_UP':
          // Secure Auth3 - Sign up user
          const DEFAULT_NAME = {
            firstName: 'First',
            lastName: 'Last',
          }
          const signUpResults = await auth.auth3Signup(
            {
              account: web3Values.address,
              email: web3Values.email,
              firstName: web3Values.firstName? web3Values.firstName : DEFAULT_NAME.firstName,
              lastName: web3Values.lastName? web3Values.lastName : DEFAULT_NAME.lastName,
              ens: web3Values.ens,
              chainId: web3Values.chainId,
              permissionFlag: 3,
            } as NewAuth3User
          );
          if (!signUpResults.isSignedUp) {
            setErrorMessage(signUpResults.authError);
            setIsVerifiying(false);
            return;
          }

          // Secure Auth3 - Sign in user after account creation sucessful
          signInResults = await auth.auth3Signin({
            address: web3Values.address,
            email: web3Values.email,
            signature: web3Values.signature,
            message: web3Values.message
          });
          if (!signInResults.isAuthenticated) {
            setErrorMessage(signInResults.authError);
            setIsVerifiying(false);
            return;
          }
      
          // Save authenicated user and acces token in Redux store and navigate to protected route
          dispatch(setisVerified(signInResults.isAuthenticated));
          dispatch(setAccesToken(signInResults.accessToken));
          dispatch(setUser(signInResults.user));
          navigate(from, { replace: true });
          break;
        case 'SIGN_IN':
          // Secure Auth3 - Sign in user after account creation sucessful
          signInResults = await auth.auth3Signin({
            address: web3Values.address,
            email: web3Values.email,
            signature: web3Values.signature,
            message: web3Values.message
          });
          if (!signInResults.isAuthenticated) {
            setErrorMessage(signInResults.authError);
            setIsVerifiying(false);
            return;
          }
    
          // Save authenicated user and acces token in Redux store and navigate to protected route
          dispatch(setisVerified(signInResults.isAuthenticated));
          dispatch(setAccesToken(signInResults.accessToken));
          dispatch(setUser(signInResults.user));
          navigate(from, { replace: true });
          break;
        default:
          break;
      }
    } catch(err) {
      setIsVerifiying(false);
      setErrorMessage('Error when trying to sign in/sign up.')
    }  
  }, [auth, dispatch, from, navigate]);
  
  const authCallbackError = useCallback((error: ErrorMessageData) => {
    setIsVerifiying(false);
    setErrorMessage(error.message);
  }, []);
  
  return (
    <div className="auth-container">
        <div>
        {isVerifiying ?
          <Loading />
          :
          <div>
            <Form
              primary={true}
              backgroundcolor='#6555DF'
              size='large'
              dappname='Find my NFT'
              disableErrorDisplay={true}
              messageToSign={MESSAGE_TO_SIGN}
              infuraId={INFURA_KEY? INFURA_KEY : ''}   
              logourl='https://idrisbowman.com/images/idrisBowmanIcon.jpg'
              homePageurl='https://www.secureauth3.com'
              formDataCallback={authCallbackData}
              formErrorCallback={authCallbackError}   
            />
            {errorMessage !== '' &&
            <div className='auth-error-message-container'>
              <p className='auth-error-message'>{errorMessage}</p>      
            </div>
            }
          </div>
        }
      </div>
    </div>
  );
}