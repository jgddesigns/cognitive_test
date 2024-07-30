import { useEffect } from 'react'
import {credentials} from '../credentials/Credentials'
import { CognitoIdentityProviderClient, SignUpCommand} from '@aws-sdk/client-cognito-identity-provider';



//MOSTLY FROM CHAT GPT
const client = new CognitoIdentityProviderClient({ region: credentials.region });

export default function Cognito(props: any) {

    useEffect(() => {
        props.Submit == true ? sign_up() : null
    }, [props.Submit])


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

    
    function get_hash(){
        const crypto = require('crypto')
        const message = `${props.Username}${credentials["client_id"]}`
        // test values
        // const message = `${"jdunn7008@gmail.com"}${credentials["client_id"]}`;
        const str = crypto.createHmac('sha256', credentials["client_secret"])
        str.update(message)
        const secret_hash = str.digest('base64')

        return secret_hash
    }


    // function sign_in(email: any, password: any){
    //     const user = new CognitoUser({ Username: email, Pool: user_pool });
    //     const auth_details = new AuthenticationDetails({ Username: email, Password: password });

    //     return new Promise((resolve, reject) => {
    //         user.authenticateUser(auth_details, {
    //             onSuccess: (result) => {
    //                 resolve(result)
    //             },
    //             onFailure: (err) => {
    //                 reject(err)
    //             }
    //         });
    //     });
    // };

    return (
        null
    )


}