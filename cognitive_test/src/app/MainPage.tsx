'use client'
import React from 'react';

//Landing page title and introduction
export default function MainPage(props: any) {
    return(
        <div className="h-full">
            <div className="row">
                WELCOME TO THE FLOURISH SCIENCE COGNITIVE TEST
            </div>
            <div className="row mt-12 text-sky-400">
                This application includes a series of assessments that measure the mental prowess of a given subject. A baseline is first established by conducting the tests under normal circumstances. Afterward, tests are conducted after various variables are introduced. Examples include following the ingestion of certain herbal supplements, or after experiencing a period of time in nature.
            </div>
        </div>
    )
}

  