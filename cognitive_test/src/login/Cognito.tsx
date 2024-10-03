import { useEffect } from 'react'
import {test_credentials} from '../credentials/Credentials'
import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, AuthFlowType} from '@aws-sdk/client-cognito-identity-provider'
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'

//PARTLY FROM CHAT GPT
const client = new CognitoIdentityProviderClient({ region: test_credentials.REGION });

const login_message = ["User login successful!", "Invalid login credentials. Try again.", "Error authenticating user. Please contact support."]

const login_class = ["text-green-400 text-base mt-12 ml-24 grid place-items-center", "text-red-400 text-base mt-24 ml-24 grid place-items-center"]


// Handles the user signup and login functionality. Needs AWS credentials located in 'src/credentials/Credentials.tsx' (stored off of Github). 
export default function Cognito(props: any) {

    useEffect(() => {
        props.UserInserted ? sign_up() : null
        props.LoginAttempt ? login(props.Username, props.Password) :  null
    }, [props.UserInserted, props.LoginAttempt, props.ConfirmSuccess])


    useEffect(() => {
        props.CheckConfirm ? confirm_user() : null
    }, [props.CheckConfirm])

    useEffect(() => {
        props.Logout ? cookie_handler(false) : null
    }, [props.Logout])

    
    // Processes the user sign up data. Requires props passed from signup component located in 'src/login/Signup.tsx'.
    // @param: N/A
    // @return (json): A response from the AWS server
    async function sign_up(){
        console.log("INITIATE SIGN UP")
        console.log("Username: " + props.Username)
        console.log("Password: " + props.Password)
        const data = {
            ClientId: test_credentials.CLIENT_ID,
            Username: props.Username,
            Password: props.Password,
            UserAttributes: [
                {
                    Name: "email",
                    Value: props.Username
                },
                {
                    Name: "nickname",
                    Value: props.Name
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
            return false
        }
    }

    // After the first step in the sign up process, the user needs to confirm their registration with a code sent via email. This function processes all needed logic to confirm the user.
    // @param: N/A
    // @return: N/A
    function confirm_user(){
        console.log("confirming user")
        console.log(props.Username)
        console.log("confirmation code")
        console.log(props.ConfirmCode)

        const pool_data = {
            UserPoolId: test_credentials.USER_POOL_ID, // Replace with your User Pool ID
            ClientId: test_credentials.CLIENT_ID, // Replace with your App Client ID
            ClientSecret: test_credentials.CLIENT_SECRET,
            // SecretHash: get_hash()
        };
        const user_pool = new CognitoUserPool(pool_data);

        const user_data = {
            Username: props.Username, // Replace with your User Pool ID
            Pool: user_pool, // Replace with your App Client ID
            // SecretHash: get_hash()
        }

        const cognito_user = new CognitoUser(user_data);


        cognito_user.confirmRegistration(props.ConfirmCode, true, (err, result) => {
            if (err) {
                console.log(`Error confirming user: ${err.message}`);
            }
            console.log('User confirmed successfully!');
            props.handleInsertUser(props.Username, props.Name, props.Password)
            first_login(props.Username, props.Password)
            props.setConfirmSuccess(true)
        });
    }


    // After an attempted sign in, or if previous profile cookies exist, user data is retrieved from AWS with this function.
    // @param: N/A
    // @return: N/A
    function retrieve_user(){
        const pool_data = {
            UserPoolId: test_credentials.USER_POOL_ID, 
            ClientId: test_credentials.CLIENT_ID, 
            ClientSecret: test_credentials.CLIENT_SECRET,
        }

        const user_pool = new CognitoUserPool(pool_data)

        const cognito_user = user_pool.getCurrentUser()

        if(cognito_user){
            cognito_user.getUserAttributes((err, attributes) => {
                if (err) {
                  console.error('Error getting user attributes:', err)
                }
          
                if (attributes) {
                  attributes.forEach((attribute) => {
                    console.log(`${attribute.getName()} : ${attribute.getValue()}`);
                  });
                }
            });
        }

    }


    // After an attempted login, checks the cognito user pool for matching login credentials.
    // @param 'Username': The username for the attempted login. Entered on the 'Login' page.
    // @param 'Password': The password for the attempted login. Entered on the 'Login' page.
    // @return: N/A
    async function login(Username: any, Password: any) {
        console.log("login attempt")
  
        const params = {
          AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
          ClientId: test_credentials.CLIENT_ID,
          AuthParameters: {
            USERNAME: Username,
            PASSWORD: Password,
          }
        };
      
        try {
          const command = new InitiateAuthCommand(params)
          try{
            const response = await client.send(command)
            console.log("response")
            console.log(response)
            console.log(login_message[0])
            props.setLoginSuccess(true)
            props.setLoginMessage(login_message[0])
            props.setLoginClass(login_class[0])
            cookie_handler(true)
            retrieve_user()
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

    // After the user is confirmed via the emailed code, a modified login is performed. This is not based on the login text fields, but is a redirect after the user is confirmed. 
    // REFACTOR: COMBINE WITH REGULAR 'login' FUNCTION?
    async function first_login(Username: any, Password: any) {
        console.log("login attempt")
      
        const params = {
          AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
          ClientId: test_credentials.CLIENT_ID,
          AuthParameters: {
            USERNAME: Username,
            PASSWORD: Password,
          }
        };
      
        try {
          const command = new InitiateAuthCommand(params)
          try{
            const response = await client.send(command)
            console.log(login_message[0])
            props.setConfirmSuccess(true)
            cookie_handler(true)
            retrieve_user()
          }catch{
            console.log(Username)
            console.log(Password)
            console.log(login_message[1])
          }
        } catch (error) {
            console.error(error)
        }
    }
    
    // DEPRECATED. If a secret hash is necessary, use this function.
    // @param: N/A
    // @return (string): A string of the generated hash
    function get_hash(){
        const crypto = require('crypto')
        const message = `${props.Username}${test_credentials.CLIENT_ID}`
        const str = crypto.createHmac('sha256')
        str.update(message)
        const secret_hash = str.digest('base64')

        return secret_hash
    }

    //
    function get_test_data(){
        var data = [""]
        return data
    }

    function cookie_handler(condition: any){
        console.log("cookie handler")
        const date = new Date()
        if(condition){
            date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000))
            var utc = date.toUTCString()
            document.cookie = "Username=" + props.Username + "; expires=" + utc + "; path=/"
            document.cookie = "Email=" + props.Username + "; expires=" + utc + "; path=/"

            // SECURITY CONCERN
            // DON'T STORE PASSWORD AS A REGULAR TEXT COOKIE. 
            // Use encryption or pull directly from cognito?
            // Needed for display on profile and for change password functionality
            document.cookie = "Password=" + props.Password + "; expires=" + utc + "; path=/"
            //
            //
            
            document.cookie = "TestData=" + get_test_data() + "; expires=" + utc + "; path=/"
        }else{
            date.setTime(date.getTime() - (24 * 60 * 60 * 1000))
            var utc = date.toUTCString()
            document.cookie = "Username=; expires=" + utc + "; path=/"
            document.cookie = "Email=; expires=" + utc + "; path=/"
            document.cookie = "Password=; expires=" + utc + "; path=/"
            document.cookie = "TestData=; expires=" + utc + "; path=/"
        }
    }

    return (
        null
    )
}