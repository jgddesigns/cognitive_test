'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import "../helpers/shapes.css"


//Needs props Restart, setRestart, LengthValue, CurrentPosition, ShowCirclesGreen, setShowCirclesGreen, ShowCirclesRed, setShowCirclesRed
export default function ShowAnalysis (props: any) {

    const classes = ["", "mt-12 underline text-lg text-gray-400 cursor-pointer", "mt-12 underline text-lg text-blue-400 cursor-pointer"] 

    const [ClickAttentionClass, setClickAttentionClass] = React.useState(classes[1])
    const [ClickDecisionClass, setClickDecisionClass] = React.useState(classes[1])
    const [ClickReactionClass, setClickReactionClass] = React.useState(classes[1])
    
    const text = {
        "attention": "An overall average is determined by dividing the score by the total questions. User responses are then split into sections, where a another average is calculated. Each section average is compared to the overall average. Attention is considered stronger the more the section average meets or exceeds the overall average. It is considered weaker the more the section average dips below the overall average.",
        "decision": "Calculated based on the amount of correct responses a user provides. More correct responses indicate stronger decisiveness. Less correct responses show weaker decision making ability.",
        "reaction": "The metrics for reaction time are calculated based on how fast a user makes a decision. A response time profficiency level is initially set, then the user's responses are compared against it. The more the user answers quicker than the profficiency level, the higher the reaction time rating will be. If the test has a running clock, the score is determined by the amount of correct answers given within the time period."
    }

    const [AttentionText, setAttentionText] = React.useState<any>("")
    const [DecisionText, setDecisionText] = React.useState<any>("")
    const [ReactionText, setReactionText] = React.useState<any>("")

    useEffect(() => {
        
    }, [])


    function click_handler(value: any){
        switch(value){
            case 0: 
                AttentionText == "" ? setAttentionText(text["attention"]) : setAttentionText("")
                ClickAttentionClass == classes[1] ? setClickAttentionClass(classes[2]) : setClickAttentionClass(classes[1])
                break
            case 1:
                DecisionText == "" ? setDecisionText(text["decision"]) : setDecisionText("")
                ClickDecisionClass == classes[1] ? setClickDecisionClass(classes[2]) : setClickDecisionClass(classes[1])
                break
            case 2:
                ReactionText == "" ? setReactionText(text["reaction"]) : setReactionText("")
                ClickReactionClass == classes[1] ? setClickReactionClass(classes[2]) : setClickReactionClass(classes[1])   
                break         
        }
    }

    return(
        <div>
            <div className="mt-24 grid grid-auto-cols">
                <div className="bold text-2xl justify-center">
                    TEST ANALYSIS
                </div>
                <div>
                    <div className={ClickAttentionClass} onClick={e => click_handler(0)}>
                        Attention
                    </div>
                    <div className="text-lg">
                        {AttentionText}
                    </div>
                    <div className="mt-4 text-base">
                        Score: {props.AttentionData["score"]} out of {props.AttentionData["periods"]}
                    </div>
                    <div className="text-base">
                        Rating: <span className={props.AttentionData["rating"] == "poor" ? "text-white px-4 bg-red-400" : props.AttentionData["rating"] == "average" ? "text-white px-4 bg-gray-400" : "text-white px-4 bg-green-400"}>{props.AttentionData["rating"]}</span>
                    </div>
                </div>
                <div>
                <div className={ClickDecisionClass} onClick={e => click_handler(1)}>
                        Decision Making
                    </div>
                    <div className="text-lg">
                        {DecisionText} 
                    </div>
                   
                    {props.DecisionData ? 
                    <div>
                    <div className="mt-4 text-base">
                        Score: {props.DecisionData["total"]} out of {props.DecisionData["answers"].length}
                    </div>
                    <div className="text-base">
                        Rating: <span className={props.DecisionData["rating"] == "poor" ? "text-white px-4 bg-red-400" : props.DecisionData["rating"] == "average" ? "text-white px-4 bg-gray-400" : "text-white px-4 bg-green-400"}>{props.DecisionData["rating"]}</span>
                    </div>
                    </div>
                    : null}
                    
                </div>
                <div>
                <div className={ClickReactionClass} onClick={e => click_handler(2)}>
                        Reaction Time
                    </div>
                    <div className="text-lg">
                        {ReactionText}
                    </div>
                    <div className="mt-4 text-base">
                        Score: {props.ReactionData["score"]} out of {props.ReactionData["answers"].length}
                    </div>
                    <div className="text-base">
                        Rating: <span className={props.ReactionData["rating"] == "poor" ? "text-white px-4 bg-red-400" : props.ReactionData["rating"] == "average" ? "text-white px-4 bg-gray-400" : "text-white px-4 bg-green-400"}>{props.ReactionData["rating"]}</span> 
                    </div>

                </div>
            </div> 
        </div>
    )
}


