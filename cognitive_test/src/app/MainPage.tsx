'use client'
import { google_credentials } from '@/credentials/Credentials';
import React, { useEffect } from 'react';


export default function MainPage(props: any) {

    useEffect(() => {
        const script1 = document.createElement("script");
        const script2 = document.createElement("script");
        script1.src = "https://apis.google.com/js/platform.js";
        script2.src = "https://accounts.google.com/gsi/client";
        script1.async = true;
        script2.async = true;
        document.body.appendChild(script1);
        document.body.appendChild(script2);
      }, []);

      
    return(
        <div className="h-full">
            <meta name="google-signin-client_id" content={google_credentials["CLIENT_ID"]}></meta>
            <div className="row grid place-items-center ">
                WELCOME TO THE COGNITIVE TEST APP
            </div>
            <div className="row mt-12 text-sky-400">
                This application includes a series of assessments that measure the mental prowess of a given subject. A baseline is first established by conducting the tests under normal circumstances. Afterward, tests are conducted after various variables are introduced. Examples include following the ingestion of certain herbal supplements, or after experiencing a period of time in nature.
            </div>  
        </div>
    )
}



  