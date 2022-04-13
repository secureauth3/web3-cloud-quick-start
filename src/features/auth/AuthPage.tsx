import React, { useCallback } from "react";
import { Form } from "web3-cloud";
import { ButtonSignatureData, ErrorMessageData, FormSignatureData } from "../../interface/web3-cloud-data-interface";

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY? process.env.REACT_APP_INFURA_KEY: ''; 
const MESSAGE_TO_SIGN = 'Your message that users will sign';

export default function AuthPage() {
   
  const authCallbackData = useCallback(async (web3Values: FormSignatureData | ButtonSignatureData) => {
      try {
        switch(web3Values.actionType) {
          case 'SIGN_UP':
            break;
          case 'SIGN_IN':
            break;
          default:
            break;
        }
      } catch(err) {
        }  
    }, []);
  
    const authCallbackError = useCallback((error: ErrorMessageData) => {

    }, []);
  
    return (
      <div className="auth-container">
        <div className="auth-connection-container">
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
                backend={
                  {
                    endpoint: `https://localhost:8080/api/v1/auth/nonce`,
                    requestOptions: {
                      method: 'GET',
                }
                  }
                }
              homePageurl='https://www.secureauth3.com'
                formDataCallback={authCallbackData}
                formErrorCallback={authCallbackError}   
              />
          </div>
        </div>
      </div>
    );
}