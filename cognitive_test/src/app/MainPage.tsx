'use client'
import { google_credentials } from '@/credentials/Credentials';
import React, { useEffect } from 'react';


export default function MainPage(props: any) {

    useEffect(() => {
        // const script1 = document.createElement("script");
        // const script2 = document.createElement("script");
        // script1.src = "https://apis.google.com/js/platform.js";
        // script2.src = "https://accounts.google.com/gsi/client";
        // script1.async = true;
        // script2.async = true;
        // document.body.appendChild(script1);
        // document.body.appendChild(script2);
      }, []);

      
    return(
        <div className="h-full">
            {/* <meta name="google-signin-client_id" content={google_credentials["CLIENT_ID"]}></meta> */}
            <div className="row grid place-items-center text-3xl">
                WELCOME TO THE COGNITIVE TEST
            </div>
            <div className="row mt-24 text-sky-400 text-2xl grid gap-12">
                <div className="italic font-bold grid place-items-center">
                    What can help or hurt a person's cognitive ability?
                </div>
                <div>
                    This application features a series of brain games that are intended to demonstrate a person's mental aptitude. Potential areas of analysis include awareness, consistency, reaction time, memory and decisiveness. A baseline can be established by conducting the tests under normal circumstances. Tests can then be taken after a variable is introduced and compared to the user's baseline performance for each test. 
                </div>
                <div>
                    Examples of pre-test variables include the ingestion of certain herbal supplements, food or medication, drinking alcohol, or going for a jog. These tests are for entertainment purposes only, and in no way are intended to diagnose or categorize anyone. The analysis extracted from the test results might only reveal small details of a person's ability. The data gathered is arbitrary based on who takes each test and various other factors.
                </div>
                <div>
                     For instance, if a user isn't good with computers they might have trouble responding to the test prompts. Maybe a person doesn't take the test seriously at the time and doesn't put forth their maximum effort. They could be ill or simply having a bad day. Repeated test attempts over a significant length of time can provide better data for analytics, but this process can still include certain caveats and does not guarantee a definitive depiction of a person's functionality. 
                </div>

                <div className="mt-24 grid place-items-center text-xl italic">
                    DEMO VERSION ONLY. LOGIN/PROFILE & DATABASE SYSTEM IS OMITTED. 
                </div>
            </div>  
        </div>
    )
}



  