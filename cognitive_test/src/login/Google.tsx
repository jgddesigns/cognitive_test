"use client";
import React, { useEffect, useRef } from "react";
import { google_credentials } from "@/credentials/Credentials";


export default function Google(props: any) {

    const [Start, setStart] = React.useState(false)

    useEffect(() => {
        !props.Start && (props.CookiesChecked && !props.Cookies) && !props.Logout  ? initialize() : null
    }, [props.Start, props.CookiesChecked, props.Cookies, props.Logout]);
    

    useEffect(() => {
        props.TriggerLogin ? initialize() : null
    }, [props.TriggerLogin]);


    ///// CHECK IF USER ALEADY EXISTS IN 'users' TABLE, IF SO, UPDATE THE ROW WITH A NEW JWT. IF NOT, INSERT A NEW ROW. 
    function response_handler(response: any){
        console.log("Encoded JWT ID token: " + response.credential)

        const decoded = parse_jwt(response.credential)
        console.log("Decoded JWT: ", decoded)

        props.setCookies(response.credential)
        props.setUsername(decoded["email"])
        props.setUsernameCheck(true)
        props.setTable("users")
        props.setStartLogin(true)
        props.setTriggerLogin(false)
        // props.setTriggerInsert(true)
        props.setLoginTimer(5)
    }

    function initialize(){
        console.log("initialize")

        // if (window.google && !props.Start) {
        //     window.google.accounts.id.initialize({
        //     client_id: google_credentials["CLIENT_ID"], 
        //     callback: (response: any) => response_handler(response),
        //     auto_select: false, 
        //     // context: "signin",
        //     })
    
        //     window.google.accounts.id.prompt();
        //     props.setStart(true)
            
        // }else{
        //     console.log("start already called")
        // }
    }
    
    function parse_jwt(token: any){
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
        // const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = decodeURIComponent(
            atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(payload)
    };

  return (
    <div>
        {/* <div 
            id="g_id_onload"
            data-client_id="733049550055-3f9qerbdigb4g706vlodscc5151l69m1.apps.googleusercontent.com"
            data-context="signin"
            data-ux_mode="popup"
            data-login_uri="http://localhost:3000"
            data-itp_support="true"
        /> */}


        {/* <div 
            className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
        /> 
       */}

</div>
  );
}
