import { useEffect } from 'react'
import {credentials} from '../credentials/Credentials'
import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, AuthFlowType} from '@aws-sdk/client-cognito-identity-provider'
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'


//MOSTLY FROM CHAT GPT
const client = new CognitoIdentityProviderClient({ region: credentials.region });

const userPool = new CognitoUserPool({
    UserPoolId: credentials.user_pool_id,
    ClientId: credentials.client_id
});

export default function Cognito(props: any) {

    useEffect(() => {
        props.Submit == true ? sign_up() : null
        props.LoginAttempt == true ? login(props.Username, props.Password) :  null
    }, [props.Submit, props.LoginAttempt])


    async function sign_up(){
        console.log("INITIATE SIGN UP")
        console.log("Username: " + props.Username)
        console.log("Email: " + props.Email)
        console.log("Password: " + props.Password)
        const data = {
            ClientId: credentials["client_id"],
            SecretHash: get_hash(),
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
            props.setSubmit(false)
            return response
        }catch(err){
            props.setSubmit(false)
            console.log("Sign up fail")
            console.log(err)
        }
    }


    // async function login(Username: any, Password: any){
    //     console.log("called")
    //     return new Promise((resolve, reject) => {
    //       const authenticationDetails = new AuthenticationDetails({
    //         Username,
    //         Password
    //       });
      
    //       const cognitoUser = new CognitoUser({
    //         Username,
    //         Pool: userPool
    //       });
      
    //       cognitoUser.authenticateUser(authenticationDetails, {
    //         onSuccess: (result) => {
    //             console.log("sign in success")
    //             resolve(result)
    //         },
    //         onFailure: (err) => {
    //             console.log("sign in fail")
    //             reject(err)
    //         }
    //       })
    //     })
    // }

    
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
          const command = new InitiateAuthCommand(params);
          const response = await client.send(command);
          console.log(response); // Handle the authentication response
          response ? props.setLoggedIn(true) : console.log("login error")
        } catch (error) {
          console.error(error); // Handle errors
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