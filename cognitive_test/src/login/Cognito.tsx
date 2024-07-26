import React from 'react'
import ReactDOM from 'react-dom'
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js'
import {credentials} from '../credentials/Config'

const userPool: any = new CognitoUserPool(credentials);

const poolData = {
    UserPoolId: credentials["user_pool_id"], // Your user pool id here
    ClientId: credentials["app_client_id"] // Your client id here
};

export const signUp = (email: any, password: any) => {
    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, [], null, (err: any, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result.user);
        });
    });
};

export const signIn = (email: any, password: any) => {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    return new Promise((resolve, reject) => {
        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                resolve(result);
            },
            onFailure: (err) => {
                reject(err);
            }
        });
    });
};