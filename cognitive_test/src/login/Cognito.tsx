import { useEffect } from 'react'
import {credentials} from '../credentials/Credentials'
import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, AuthFlowType} from '@aws-sdk/client-cognito-identity-provider'
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'

//MOSTLY FROM CHAT GPT
const client = new CognitoIdentityProviderClient({ region: credentials.region });

const login_message = ["User login successful!", "Invalid login credentials. Try again.", "Error authenticating user. Please contact support."]

const login_class = ["text-green-400 text-base mt-12 ml-24 grid place-items-center", "text-red-400 text-base mt-24 ml-24 grid place-items-center"]

// const pool_data = {
//     UserPoolId: credentials.user_pool_id, // Replace with your User Pool ID
//     ClientId: credentials.client_id, // Replace with your App Client ID
//     SecretHash: get_hash()
// };
// const user_pool = new CognitoUserPool(pool_data);


export default function Cognito(props: any) {

    useEffect(() => {
        props.UserInserted ? sign_up() : null
        props.LoginAttempt ? login(props.Username, props.Password) :  null
    }, [props.UserInserted, props.LoginAttempt])


    useEffect(() => {
        props.CheckConfirm ? confirm_user() : null
    }, [props.CheckConfirm])


    async function sign_up(){
        console.log("INITIATE SIGN UP")
        console.log("Username: " + props.Username)
        console.log("Email: " + props.Email)
        console.log("Password: " + props.Password)
        const data = {
            ClientId: credentials.client_id,
            // SecretHash: get_hash(),
            Username: props.Username,
            Password: props.Password,
            // test values
            // Username: "jdunn7008@gmail.com",
            // Password: "111aaaAAA!!!",
            UserAttributes: [
                {
                    Name: "email",
                    Value: props.Username
                },
                {
                    Name: "nickname",
                    Value: props.Username
                }
            ],
        }
        try{
            const attempt = new SignUpCommand(data) 
            const response = await client.send(attempt)
            console.log("Sign up success")
            props.setUserInserted(false)
            props.setSignupSuccess(true)
            return response
        }catch(err){
            props.setUserInserted(false)
            props.setSignupSuccess(false)
            console.log("Sign up fail")
            console.log(err)
        }
    }

    function confirm_user(){
        console.log("confirming user")
        console.log(props.Username)
        console.log("confirmation code")
        console.log(props.ConfirmCode)

        const pool_data = {
            UserPoolId: credentials.user_pool_id, // Replace with your User Pool ID
            ClientId: credentials.client_id, // Replace with your App Client ID
            ClientSecret: credentials.client_secret,
            // SecretHash: get_hash()
        };
        const user_pool = new CognitoUserPool(pool_data);

        const user_data = {
            Username: props.Username, // Replace with your User Pool ID
            Pool: user_pool, // Replace with your App Client ID
            SecretHash: get_hash()
        }

        const cognito_user = new CognitoUser(user_data);


        cognito_user.confirmRegistration(props.ConfirmCode, true, (err, result) => {
            if (err) {
                console.log(`Error confirming user: ${err.message}`);
                return;
            }
            console.log('User confirmed successfully!');
            props.setConfirmSuccess(true)
        });
    }

    
    async function login(Username: any, Password: any) {
        console.log("login attempt")
        const secretHash = get_hash()
      
        const params = {
          AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
          ClientId: credentials.client_id,
          AuthParameters: {
            USERNAME: Username,
            PASSWORD: Password,
            SECRET_HASH: secretHash
          }
        };
      
        try {
          const command = new InitiateAuthCommand(params)
          try{
            const response = await client.send(command)
            console.log(login_message[0])
            props.setLoginSuccess(true)
            props.setLoginMessage(login_message[0])
            props.setLoginClass(login_class[0])
          }catch{
            console.log(login_message[1])
            props.setLoginAttempt(false)
            props.setLoginMessage(login_message[1])
            props.setLoginClass(login_class[1])
          }
        } catch (error) {
            props.setLoginMessage(login_message[2])
            props.setLoginClass(login_class[1])
            console.error(error)
        }
      }
    
    function get_hash(){
        const crypto = require('crypto')
        const message = `${props.Username}${credentials["client_id"]}`
        const str = crypto.createHmac('sha256', credentials["client_secret"])
        str.update(message)
        const secret_hash = str.digest('base64')

        return secret_hash
    }


    return (
        null
    )
}