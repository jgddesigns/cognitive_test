'use client'
import React, {useEffect} from 'react';
import "../helpers/shapes.css"

// Shows the post-test analysis display
// Needs props Restart, setRestart, LengthValue, CurrentPosition, ShowCirclesGreen, setShowCirclesGreen, ShowCirclesRed, setShowCirclesRed
export default function ShowAnalysis (props: any) {

    const classes = ["", "mt-12 underline text-2xl text-blue-400 cursor-pointer", "mt-12 underline text-2xl font-bold text-gray-400 cursor-pointer"] 

    const [ClickAttentionClass, setClickAttentionClass] = React.useState(classes[1])
    const [ClickDecisionClass, setClickDecisionClass] = React.useState(classes[1])
    const [ClickReactionClass, setClickReactionClass] = React.useState(classes[1])
    
    const text = {
        "attention": "An overall average is determined by dividing the score by the total questions. User responses are then split into sections, where a another average is calculated. Each section average is compared to the overall average. Attention is considered stronger the more the section average meets or exceeds the overall average. It is considered weaker the more the section average dips below the overall average.",
        "decision": "Calculated based on the amount of correct responses a user provides. More correct responses indicate stronger decisiveness. Less correct responses show a weaker decision making ability.",
        "reaction": "The metrics for reaction time are calculated based on how fast a user makes a decision. A response time proficiency level is initially set, then the user's responses are compared against it. The more the user answers quicker than the profficiency level, the higher the reaction time rating will be. If the test has a running clock, the score is determined by the amount of correct answers given within the time period."
    }

    const [AttentionText, setAttentionText] = React.useState<any>("")
    const [DecisionText, setDecisionText] = React.useState<any>("")
    const [ReactionText, setReactionText] = React.useState<any>("")



    // Toggles the description text for each type of analysis
    // @param 'value': The number value designated for each type of analysis
    // @return: N/A
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


    // Retrieves the interval average from the Attention calculations. Cuts off the string if longer than 4 and eliminates trivial decimal values.
    // @param: N/A
    // @return (string): The average to display
    function get_average(){
        return props.AttentionData ? props.AttentionData["interval_avg"].toString().length > 4 ? props.AttentionData["interval_avg"].toString().slice(0, 4) : props.AttentionData["interval_avg"] : null
    }



    return(
        <div>
            <div className="mt-24">
                <div className="text-2xl">
                    TEST ANALYSIS
                </div>
                <div>
                    <div className={ClickAttentionClass} onClick={e => click_handler(0)}>
                        Attention
                    </div>
                    <div className="text-lg mt-4">
                        {AttentionText}
                    </div>
                    {props.AttentionData ? 
                        <div>
                            <div className="mt-4 text-xl bold">
                                <span className="font-bold">
                                    Score:
                                </span> {props.AttentionData["score"]} out of {props.AttentionData["possible"] ? props.AttentionData["possible"] : props.AttentionData["periods"]} {props.AttentionData["bonus"] ? <span className="text-base">(+1 bonus, greater than {props.AttentionData["bonus_range"]} bonus range)</span> : null} {props.AttentionData["penalty"] ? <span className="text-base">(-1 penalty, less than {props.AttentionData["penalty_range"]} penalty range)</span> : null}
                            </div>
                            {/* <div className="text-xl">
                                <span className="font-bold">
                                    Proficiency Level:
                                </span> {props.AttentionData["interval_avg"].toString().length > 3 ? props.AttentionData["interval_avg"].toString().slice(4, props.AttentionData["interval_avg"].toString().length - 4) : props.AttentionData["interval_avg"]}% correct per {props.AttentionData["interval"] == "time" ? <span>minute</span> : <span>interval</span>} <span className="text-base">(+1 added to score if greater than)</span>
                            </div>
                             */}
                            <div className="text-xl">
                                <span className="font-bold">
                                    Proficiency Level:
                                </span> {(get_average() * 100).toString().slice(0,2)}% correct per {props.AttentionData["interval"] == "time" ? <span>minute</span> : <span>interval</span>} <span className="text-base">(+1 added to score if greater than)</span>
                            </div>
                            <div className="text-xl">
                                <span className="font-bold">
                                    Rating:
                                </span> <span className={props.AttentionData["rating"] == "poor" ? "text-white px-4 bg-red-400 italic rounded" : props.AttentionData["rating"] == "average" ? "text-white px-4 bg-gray-400 italic rounded" : "text-white px-4 bg-green-400 italic rounded rounded"}>{props.AttentionData["rating"]}</span>
                            </div>
                        </div>
                    :
                        <div className="text-xl mt-4">
                            N/A
                        </div>                    
                    }
                </div>
                
                <div>
                <div className={ClickDecisionClass} onClick={e => click_handler(1)}>
                        Decision Making
                    </div>
                    <div className="text-xl mt-4">
                        {DecisionText} 
                    </div>                  
                    {props.DecisionData ? 
                        <div>
                            <div className="mt-4 text-xl">
                            <span className="font-bold">
                                Score:
                            </span> {props.DecisionData["total"]} out of {props.DecisionData["possible"] ? props.DecisionData["possible"] : props.DecisionData["answers"]} {props.DecisionData["bonus"] ? <span>(+ 1 bonus, greater than {props.DecisionData["bonus_range"]} bonus range)</span> : null} {props.DecisionData["penalty"] ? <span className="text-base">(-1 penalty, less than {props.DecisionData["penalty_range"]} penalty range)</span> : null}
                            </div>
                            <div className="text-xl">
                                <span className="font-bold">
                                Proficiency Level:
                                </span> {props.DecisionData["possible"] ? Math.round(props.DecisionData["possible"] * .7): Math.round(props.DecisionData["answers"] * .7)} <span className="text-base">(average or above rating if score is greater than)</span>
                            </div>
                            <div className="text-xl">
                                <span className="font-bold">
                                    Rating:
                                </span> <span className={props.DecisionData["rating"] == "poor" ? "text-white px-4 bg-red-400 italic rounded" : props.DecisionData["rating"] == "average" ? "text-white px-4 bg-gray-400 italic rounded" : "text-white px-4 bg-green-400 italic rounded"}>{props.DecisionData["rating"]}</span>
                            </div>
                        </div>
                    :
                        <div className="text-xl mt-4">
                            N/A
                        </div>                    
                    }
                    
                </div>
                    
                        <div>
                            <div className={ClickReactionClass} onClick={e => click_handler(2)}>
                                    Reaction Time
                                </div>
                                <div className="text-lg mt-4">
                                    {ReactionText}
                                </div>
                                {props.ReactionData ?
                                    <div>
                                        <div className="mt-4 text-xl">
                                            <span className="font-bold">
                                                Score:
                                            </span> {props.ReactionData["score"]} out of {props.ReactionData["possible"] ? props.ReactionData["possible"] : props.ReactionData["answers"].length} {props.ReactionData["bonus"] ? <span className="text-base">(+{Math.ceil(props.ReactionData["proficiency"] * .05)} bonus, greater than {props.ReactionData["bonus_range"]} bonus range)</span> : null} {props.ReactionData["penalty"] ? <span className="text-base">(-{Math.round(Math.ceil(props.ReactionData["proficiency"] * .05))} penalty, less than {props.ReactionData["penalty_range"]} penalty range)</span> : null}
                                        </div>
                                        {!props.ReactionData["possible"] ?
                                            <div className="text-xl">
                                                <span className="font-bold">
                                                    Measure Level:
                                                </span> <span className="text-base">{props.ReactionData["measure"].toString().length > 2 ? props.ReactionData["measure"].toString().slice(0, 3) : props.ReactionData["measure"]} seconds/response (+1 added to score if less than)</span>
                                            </div>
                                        : null}
                                        <div className="text-xl">
                                            <span className="font-bold">
                                                Proficiency Level:
                                            </span> {props.ReactionData["possible"] ?  props.ReactionData["per_minute"] * Math.round(props.ReactionData["measure"] / 60) : props.ReactionData["proficiency"]} {props.ReactionData["possible"]  ? <span>correct in {Math.round(props.ReactionData["measure"] / 60)} minutes</span>: <span></span>} <span className="text-base">(average or above rating if score is greater than)</span>
                                        </div>
                                        <div className="text-xl">
                                            <span className="font-bold">
                                                Rating:
                                            </span> <span className={props.ReactionData["rating"] == "poor" ? "text-white px-4 bg-red-400 italic rounded" : props.ReactionData["rating"] == "average" ? "text-white px-4 bg-gray-400 italic rounded" : "text-white px-4 bg-green-400 italic rounded"}>{props.ReactionData["rating"]}</span> 
                                        </div>
                                    </div>
                                : 
                                    <div className="text-xl mt-4">
                                        N/A
                                    </div>       
                                }
                        </div>
                    
            </div> 
        </div>
    )
}


