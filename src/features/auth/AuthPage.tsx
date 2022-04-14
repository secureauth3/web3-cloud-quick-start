import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, useAuth } from "web3-cloud";
import { ErrorMessageData, FormSignatureData } from "../../interface/web3-cloud-data-interface";
import Loading from "../loading/Loading";
import './authPage.scss';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY? process.env.REACT_APP_INFURA_KEY: ''; 

export default function AuthPage() {
  const MESSAGE_TO_SIGN = 'Your message that users will sign';
  let auth = useAuth();
  let navigate = useNavigate();
  let location: any = useLocation();
  let from = location.state?.from?.pathname || "/dashboard";
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifiying, setIsVerifiying] = useState(false);

  const authCallbackData = useCallback(async (web3Values: FormSignatureData) => {
    try {
      setIsVerifiying(true);
      switch(web3Values.actionType) {
        case 'SIGN_UP':
          // Sign up user
          const signUpResults = await auth.auth3Signup( {
            account: '',
            email: '',
            firstName: '',
            lastName: '',
            ens: '',
            chainId: 1,
            permissionFlag: 3,
          });
          if (!signUpResults.isSignedUp) {
            setErrorMessage(signUpResults.authError);
            setIsVerifiying(false);
            return;
          }

          // Sign In user
          const signInResults = await auth.auth3Signin({
            address: '',
            email: '',
            signature: '',
            message: ''
          });
          if (!signInResults.isAuthenticated) {
            setErrorMessage(signUpResults.authError);
            setIsVerifiying(false);
            return;
          }

          // Save authenicated user in Redux store

          // Navigate to protected route
          setErrorMessage('');
          setIsVerifiying(false);
          navigate(from, { replace: true });
          break;
        case 'SIGN_IN':
          break;
        default:
          break;
      }
    } catch(err) {
      console.log(err)
      setIsVerifiying(false);
      setErrorMessage('Error when trying to sign in/sign up.')
      }  
  }, [auth, from, navigate]);
  
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
              // backend={
              //   {
              //     endpoint: `https://localhost:8080/api/v1/auth/nonce`,
              //     requestOptions: {
              //       method: 'GET',
              // }
              //   }
              // }
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