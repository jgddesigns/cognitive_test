'use client'
import { google_credentials } from '@/credentials/Credentials';
import React from 'react';

//Landing page title and introduction
export default function MainPage(props: any) {
    return(
        <div className="h-full">
            <div className="row grid place-items-center ">
                WELCOME TO THE FLOURISH SCIENCE COGNITIVE TEST
            </div>
            <div className="row mt-12 text-sky-400">
                This application includes a series of assessments that measure the mental prowess of a given subject. A baseline is first established by conducting the tests under normal circumstances. Afterward, tests are conducted after various variables are introduced. Examples include following the ingestion of certain herbal supplements, or after experiencing a period of time in nature.
            </div>
            <script src="https://accounts.google.com/gsi/client" async defer></script>
            {/* <div id="g_id_onload"
                data-client_id= {google_credentials["CLIENT_ID"]}
                data-login_uri="http://localhost:3000"
                data-auto_select="true"
            /> */}

                       
        </div>
    )
}

  