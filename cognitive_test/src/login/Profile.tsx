"use client";
import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { descriptions } from "../helpers/test_descriptions";

// Profile page and related functions
export default function Profile(this: any, props: any) {
  const classes = ["cursor-not-allowed"];
  const [Username, setUsername] = React.useState("");
  const [UsernameClass, setUsernameClass] = React.useState(classes[0]);
  const [Email, setEmail] = React.useState("");
  const [EmailClass, setEmailClass] = React.useState(classes[0]);
  const [Password, setPassword] = React.useState("");
  const [PasswordShow, setPasswordShow] = React.useState(false);
  const [PasswordLink, setPasswordLink] = React.useState("Show");
  const [PasswordClass, setPasswordClass] = React.useState(
    "w-[250px] h-[50px] p-4 rounded"
  );
  const password_type = ["password", ""];
  const [PasswordType, setPasswordType] = React.useState(password_type[1]);
  const [Tests, setTests] = React.useState<any>(null);
  const [TestMap, setTestMap] = React.useState<any>(null);
  const [TestsTaken, setTestsTaken] = React.useState(0);
  const [RepeatedAmount, setRepeatedAmount] = React.useState(0);
  const [TestsRepeated, setTestsRepeated] = React.useState(0);
  const [ShowChoiceReaction, setShowChoiceReaction] = React.useState(false);
  const [ShowDigitVigilance, setShowDigitVigilance] = React.useState(false);
  const [ShowMemoryScanning, setShowMemoryScanning] = React.useState(false);
  const [ShowMotorFunction, setShowMotorFunction] = React.useState(false);
  const [ShowNumberVigilance, setShowNumberVigilance] = React.useState(false);
  const [ShowPictureRecognition, setShowPictureRecognition] =
    React.useState(false);
  const [ShowReactionTime, setShowReactionTime] = React.useState(false);
  const [ShowWordRecogntion, setShowWordRecognition] = React.useState(false);
  const [ShowWorkingMemory, setShowWorkingMemory] = React.useState(false);
  const [TestData, setTestData] = React.useState({
    choice_reaction: null,
    digit_vigilance: null,
    memory_scanning: null,
    motor_function: null,
    number_vigilance: null,
    picture_recognition: null,
    reaction_time: null,
    word_recognition: null,
    working_memory: null,
  });
  const [FoundData, setFoundData] = React.useState(false);
  const tests: any = [
    [ShowChoiceReaction, setShowChoiceReaction],
    [ShowDigitVigilance, setShowDigitVigilance],
    [ShowMemoryScanning, setShowMemoryScanning],
    [ShowMotorFunction, setShowMotorFunction],
    [ShowNumberVigilance, setShowNumberVigilance],
    [ShowPictureRecognition, setShowPictureRecognition],
    [ShowReactionTime, setShowReactionTime],
    [ShowWordRecogntion, setShowWordRecognition],
    [ShowWorkingMemory, setShowWorkingMemory],
  ];

  const tests_string = [
    "choice_reaction",
    "digit_vigilance",
    "memory_scanning",
    "motor_function",
    "number_vigilance",
    "picture_recognition",
    "reaction_time",
    "word_recognition",
    "working_memory",
  ];

  useEffect(() => {
    if (PasswordShow) {
      setPasswordType(password_type[1]);
      setPasswordShow(true);
      setPasswordLink("Hide");
    } else {
      setPasswordType(password_type[0]);
      setPasswordShow(false);
      setPasswordLink("Show");
    }
  }, [PasswordShow]);

  useEffect(() => {
    if (props.RetrievedData && !FoundData) {
      // console.log("checking retrieved data")
      // console.log(props.RetrievedData)
      for (let i = 0; i < 9; i++) {
        get_test_data(i);
      }
      setFoundData(true);
      get_tests_taken();
      get_tests_repeated();
    }
  }, [props.RetrievedData]);

  // Sets the 'TestsTaken' variable to the length of retrieved data (number of rows in the 'Test_Results' table)
  // @param: N/A
  // @return: N/A
  function get_tests_taken() {
    var taken_list: any = []

    for (let j = 0; j < tests_string.length; j++) {
      for (let i = 0; i < props.RetrievedData.length; i++) {
        if(props.Username == props.RetrievedData[i]["user_id"] && props.RetrievedData[i]["test_name"] == tests_string[j] && !taken_list.includes(props.RetrievedData[i]["test_name"])){
          taken_list.push(props.RetrievedData[i]["test_name"])
          // console.log()
          // console.log("taken list")
          // console.log(taken_list)
          // console.log()
        }
      }
    }
    setTestsTaken(taken_list.length);
  }

  // Sets the 'Username' variable based on the text entry field
  // @param 'value': The text input
  // @return: N/A
  function username_handler(value: any) {
    setUsername(value);
  }

  // Sets the 'Email' variable based on the text entry field
  // @param 'value': The text input
  // @return: N/A
  function email_handler(value: any) {
    setEmail(value);
  }

  // Sets the 'Password' variable based on the text entry field
  // @param 'value': The text input
  // @return: N/A
  function password_handler(value: any) {
    setPassword(value);
  }

  function change_username() {}

  function change_email() {}

  function change_password() {}

  // Expands the display of test results and analysis data
  // @param 'test': The place in the tests array that initiates the display of a particular set of data
  // @return: N/A
  function test_results_handler(test: any) {
    // tests[test][1](!tests[test][0]);
    props.setFromProfile(test + 1)
  }

  // Sets the visibility of the password field.
  // @param: N/A
  // @return: N/A
  function toggle_password() {
    setPasswordShow(!PasswordShow);
  }

  // PLACEHOLDER. More efficient way to display the test results? Is it needed?
  // @param: N/A
  // @return: N/A
  function create_test_map() {
    const test_map = Tests.map((name: any, index: any) => {
      return {
        test: Tests[index],
        key: uuidv4(),
      };
    });

    setTestMap(test_map);
  }

  // Calculates and sets the number of tests that were repeated. First, the database rows for the tests are retrieved, then each test that was taken is determined. Once the tests are determined, the additional attempt counter is incremented based on the number of rows relating to the same test. The total of all repeated attempts is then assigned to the state variable 'RepeatedAmount'.
  // @param: N/A
  // @return: N/A
  function get_tests_repeated() {
    let count = 0;
    let repeated = 0;

    for (let j = 0; j < tests_string.length; j++) {
      count = 0;
      for (let i = 0; i < props.RetrievedData.length; i++) {
        props.Username == props.RetrievedData[i]["user_id"] && props.RetrievedData[i]["test_name"] == tests_string[j]
          ? (count = count + 1)
          : null;
      }
      count > 1 ? (repeated += count - 1) : null;
    }
    setRepeatedAmount(repeated);
  }

  
  // Returns the string to display which includes the amount of repeated tests
  // @param: N/A
  // @return (string): The display string including the amount of repeated tests
  function get_repeated_string() {
    return "(" + RepeatedAmount + " repeated)";
  }

  // Returns the completion percentage string to display. This is based on the number off tests (9). Multiple attempts are not considered, only if the particular test has been completed.
  // @param: N/A
  // @return: The displayed percentage
  function get_completion() {
    let count = 0;

    for (let j = 0; j < tests_string.length; j++) {
      for (let i = 0; i < props.RetrievedData.length; i++) {
        if (props.Username == props.RetrievedData[i]["user_id"] && props.RetrievedData[i]["test_name"] == tests_string[j]) {
          count = count + 1;
          break;
        }
      }
    }

    return Math.round((count / 10) * 100) + "%";
  }

  // NEEDS MODIFICATION
  // Returns the total time spent on all tests
  // @param: N/A
  // @return: N/A
  function get_time() {
    return "34:29 minutes";
  }

  // Accesses the analysis data (from /src/app/page.tsx)
  // @param 'test': The test number within the array
  // @return (string): The displayed data
  function get_best_score(test: any) {
    let test_data: any = TestData;
    let data: any = "";
    // console.log(JSON.stringify(test_data))
    // console.log(test)
    // console.log(JSON.stringify(test_data[test]))
    if (test_data[test]) {
      data =
        data +
        "Attention: Score - " +
        test_data[test][0]["score"].toFixed(2) +
        ", Rating - " +
        test_data[test][0]["rating"];
      data =
        data +
        " Decisiveness: Score - " +
        test_data[test][1]["score"].toFixed(2) +
        ", Rating - " +
        test_data[test][1]["rating"];
      data =
        data +
        " Reaction: Score - " +
        test_data[test][2]["score"].toFixed(2) +
        ", Rating - " +
        test_data[test][2]["rating"];
    } else {
      data = null;
    }
    return data;
  }

  // Retrieves the data for a particular test from the RetrievedData json (from /src/app/page.tsx)
  // @param 'test': A number corresponding to the switch within the function
  // @return: N/A
  function get_test_data(test: any) {
    switch (test) {
      case 0:
        props.RetrievedData ? find_results("choice_reaction") : null;
        break;
      case 1:
        props.RetrievedData ? find_results("digit_vigilance") : null;
        break;
      case 2:
        props.RetrievedData ? find_results("memory_scanning") : null;
        break;
      case 3:
        props.RetrievedData ? find_results("motor_function") : null;
        break;
      case 4:
        props.RetrievedData ? find_results("number_vigilance") : null;
        break;
      case 5:
        props.RetrievedData ? find_results("picture_recognition") : null;
        break;
      case 6:
        props.RetrievedData ? find_results("reaction_time") : null;
        break;
      case 7:
        props.RetrievedData ? find_results("word_recognition") : null;
        break;
      case 8:
        props.RetrievedData ? find_results("working_memory") : null;
        break;
    }
  }

  function check_data(test: any){
    let taken = 0
    for(let i=0; i<props.RetrievedData.length; i++){
      // console.log("Compare " + props.Username + " to " + props.RetrievedData[i]["user_id"])
      // console.log("Compare " + test+ " to " + props.RetrievedData[i]["test_name"])
      if(props.Username == props.RetrievedData[i]["user_id"] && test == props.RetrievedData[i]["test_name"]){
        // console.log("taken")
        // console.log(TestsTaken)
        // let taken = TestsTaken
        // setTestsTaken(taken + 1)
        return true
      }
    }
    return false
  }

  // Retrieves the analysis and results for a particular test
  // @param 'test': The test the analysis is for
  // @return (array): An array containing the data for each area of analysis [attention, decisiveness, reaction]
  function find_results(test: any) {
    let attention: any = { score: null, rating: "" };
    let decisiveness: any = { score: null, rating: "" };
    let reaction: any = { score: null, rating: "" };
    let data: any = null;
    let test_data: any = TestData;
    let found = false;
    // console.log(props.Username)
    if(!check_data(test)){
      console.log("User has not attempted any tests.")
      return data
    }
    for (let i = 0; i < props.RetrievedData.length; i++) {
      if (props.RetrievedData[i]["test_name"] == test) {
        (props.RetrievedData[i]["attention"] && !attention["score"]) ||
        attention["score"] < props.RetrievedData[i]["attention"]["score"]
          ? (attention["rating"] =
              props.RetrievedData[i]["attention"]["rating"])
          : null;
        (props.RetrievedData[i]["attention"] && !attention["score"]) ||
        attention["score"] < props.RetrievedData[i]["attention"]["score"]
          ? (attention["score"] = props.RetrievedData[i]["attention"]["score"])
          : null;
        // console.log(test);
        // console.log("attention");
        // console.log(attention);

        (props.RetrievedData[i]["decisiveness"] && !decisiveness["score"]) ||
        decisiveness["score"] <
          props.RetrievedData[i]["decisiveness"]["percentage"]
          ? (decisiveness["rating"] =
              props.RetrievedData[i]["decisiveness"]["rating"])
          : null;
        (props.RetrievedData[i]["decisiveness"] && !decisiveness["score"]) ||
        decisiveness["score"] <
          props.RetrievedData[i]["decisiveness"]["percentage"]
          ? (decisiveness["score"] =
              props.RetrievedData[i]["decisiveness"]["percentage"])
          : null;
        // console.log("decisiveness");
        // console.log(decisiveness);

        (props.RetrievedData[i]["reaction"] && !reaction["score"]) ||
        reaction["score"] < props.RetrievedData[i]["reaction"]["score"]
          ? (reaction["rating"] = props.RetrievedData[i]["reaction"]["rating"])
          : null;
        (props.RetrievedData[i]["reaction"] && !reaction["score"]) ||
        reaction["score"] < props.RetrievedData[i]["reaction"]["score"]
          ? (reaction["score"] = props.RetrievedData[i]["reaction"]["score"])
          : null;
        // console.log("reaction");
        // console.log(reaction);
        found = true;
      }
    }

    found ? (data = [attention, decisiveness, reaction]) : null;
    test_data[test] = data;
    // console.log(test_data)
    // // setTestData(test_data)
    // console.log("Test Data")
    // setTestData(props.RetrievedData)
    return data;
  }

  return (
    <div className="h-full">
      {/* <div className="row grid place-items-center text-4xl">USER PROFILE</div> */}

      <div className="grid grid-auto-rows grid-auto-cols place-items-center gap-12">
        {/* <div>
          <div>Username</div>
          <textarea
            onChange={(e) => username_handler(e.target.value)}
            value={props.Username}
            className="disabled:cursor-not-allowed"
            disabled
          />
        </div>

        <div>
          <div>Email</div>
          <textarea
            onChange={(e) => email_handler(e.target.value)}
            value={props.Username}
            className={EmailClass}
            disabled
          />
        </div>

        <div>
          <div>Password</div>
          <div>
 
            <input
              type={PasswordType}
              className={PasswordClass}
              value={props.Password}
              onChange={(e) => password_handler(e.target.value)}
            />
            <div
              onClick={toggle_password}
              className="text-blue-600 underline text-sm cursor-pointer absolute ml-48 mt-4"
            >
              {PasswordLink}
            </div>
          </div>
        </div>  */}

        <div className="grid gap-12">
          {/* <div className="underline">STATISTICS</div> */}
          <div className="grid grid-cols-2 gap-12">
            <div>Tests Taken:</div>
            <div className="grid grid-cols-2">
              <div>{props.RetrievedData && TestsTaken ? TestsTaken : "No Tests Taken"}</div>
              <div>
                {props.RetrievedData && RepeatedAmount
                  ? get_repeated_string()
                  : null}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>Completed:</div>
            <div className="">
              {props.RetrievedData && TestsTaken ? get_completion() : "No Tests Completed"}
            </div>
          </div>
          {/* <div className="grid grid-cols-2 gap-12">
                        <div>
                            Total Testing Time: 
                        </div> 
                        <div className="grid grid-cols-2">
                            {get_time()}
                        </div>
                    </div> */}
          <div className="grid grid-auto-rows" id="parent">
            <div>Tests:</div>
            <div className="grid ml-12 mt-12 gap-4">
              <div className="grid grid-auto-rows">
                <div
                  className="text-blue-600 cursor-pointer"
                  onClick={(e) => test_results_handler(0)}
                >
                  Choice Reaction Time
                </div>
                {ShowChoiceReaction ? (
                  <div className="grid grid-auto-rows gap-8 w-48 mt-4  bg-blue-400">
                    <span className="ml-12 p-[10px]">
                      {descriptions["choice_reaction"]}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                {FoundData ? (
                  <div>
                    Best Score:{" "}
                    {get_best_score("choice_reaction") ? (
                      get_best_score("choice_reaction")
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                ) : (
                  <div className="italic">Not Attempted</div>
                )}
              </div>
            </div>
            <div className="grid ml-12 mt-12 gap-4">
              <div className="grid grid-auto-rows">
                <div
                  className="text-blue-600 cursor-pointer"
                  onClick={(e) => test_results_handler(1)}
                >
                  Digit Vigilance
                </div>
                {ShowDigitVigilance ? (
                  <div className="grid grid-auto-rows gap-8 w-48 mt-4  bg-blue-400">
                    <span className="ml-12 p-[10px]">
                      {descriptions["digit_vigilance"]}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                {FoundData ? (
                  <div>
                    Best Score:{" "}
                    {get_best_score("digit_vigilance") ? (
                      get_best_score("digit_vigilance")
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                ) : (
                  <div className="italic">Not Attempted</div>
                )}
              </div>
            </div>
            <div className="grid ml-12 mt-12 gap-4">
              <div className="grid grid-auto-rows">
                <div
                  className="text-blue-600 cursor-pointer"
                  onClick={(e) => test_results_handler(2)}
                >
                  Memory Scanning
                </div>
                {ShowMemoryScanning ? (
                  <div className="grid grid-auto-rows gap-8 w-48 mt-4  bg-blue-400">
                    <span className="ml-12 p-[10px]">
                      {descriptions["memory_scanning"]}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                {FoundData ? (
                  <div>
                    Best Score:{" "}
                    {get_best_score("memory_scanning") ? (
                      get_best_score("memory_scanning")
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                ) : (
                  <div className="italic">Not Attempted</div>
                )}
              </div>
            </div>
            <div className="grid ml-12 mt-12 gap-4">
              <div className="grid grid-auto-rows">
                <div
                  className="text-blue-600 cursor-pointer"
                  onClick={(e) => test_results_handler(3)}
                >
                  Motor Function
                </div>
                {ShowMotorFunction ? (
                  <div className="grid grid-auto-rows gap-8 w-48 mt-4  bg-blue-400">
                    <span className="ml-12 p-[10px]">
                      {descriptions["motor_function"]}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                {FoundData ? (
                  <div>
                    Best Score:{" "}
                    {get_best_score("motor_function") ? (
                      get_best_score("motor_function")
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                ) : (
                  <div className="italic">Not Attempted</div>
                )}
              </div>
            </div>
            <div className="grid ml-12 mt-12 gap-4">
              <div className="grid grid-auto-rows">
                <div
                  className="text-blue-600 cursor-pointer"
                  onClick={(e) => test_results_handler(4)}
                >
                  Number Vigilance
                </div>
                {ShowNumberVigilance ? (
                  <div className="grid grid-auto-rows gap-8 w-48 mt-4  bg-blue-400">
                    <span className="ml-12 p-[10px]">
                      {descriptions["number_vigilance"]}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                {FoundData ? (
                  <div>
                    Best Score:{" "}
                    {get_best_score("number_vigilance") ? (
                      get_best_score("number_vigilance")
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                ) : (
                  <div className="italic">Not Attempted</div>
                )}
              </div>
            </div>
            <div className="grid ml-12 mt-12 gap-4">
              <div className="grid grid-auto-rows">
                <div
                  className="text-blue-600 cursor-pointer"
                  onClick={(e) => test_results_handler(5)}
                >
                  Picture Recognition
                </div>
                {ShowPictureRecognition ? (
                  <div className="grid grid-auto-rows gap-8 w-48 mt-4  bg-blue-400">
                    <span className="ml-12 p-[10px]">
                      {descriptions["picture_recognition"]}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                {FoundData ? (
                  <div>
                    Best Score:{" "}
                    {get_best_score("picture_recognition") ? (
                      get_best_score("picture_recognition")
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                ) : (
                  <div className="italic">Not Attempted</div>
                )}
              </div>
            </div>
            <div className="grid ml-12 mt-12 gap-4">
              <div className="grid grid-auto-rows">
                <div
                  className="text-blue-600 cursor-pointer"
                  onClick={(e) => test_results_handler(6)}
                >
                  Visual Reaction Time
                </div>
                {ShowReactionTime ? (
                  <div className="grid grid-auto-rows gap-8 w-48 mt-4  bg-blue-400">
                    <span className="ml-12 p-[10px]">
                      {descriptions["reaction_time"]}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                {FoundData ? (
                  <div>
                    Best Score:{" "}
                    {get_best_score("reaction_time") ? (
                      get_best_score("reaction_time")
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                ) : (
                  <div className="italic">Not Attempted</div>
                )}
              </div>
            </div>
            <div className="grid ml-12 mt-12 gap-4">
              <div className="grid grid-auto-rows">
                <div
                  className="text-blue-600 cursor-pointer"
                  onClick={(e) => test_results_handler(7)}
                >
                  <span className="text-blue-600">Word Recognition</span>
                </div>
                {ShowWordRecogntion ? (
                  <div className="grid grid-auto-rows gap-8 w-48 mt-4  bg-blue-400">
                    <span className="ml-12 p-[10px]">
                      {descriptions["word_recognition"]}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                {FoundData ? (
                  <div>
                    Best Score:{" "}
                    {get_best_score("word_recognition") ? (
                      get_best_score("word_recognition")
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                ) : (
                  <div className="italic">Not Attempted</div>
                )}
              </div>
            </div>
            <div className="grid ml-12 mt-12 gap-4">
              <div className="grid grid-auto-rows">
                <div
                  className="text-blue-600 cursor-pointer"
                  onClick={(e) => test_results_handler(8)}
                >
                  Working Memory
                </div>
                {ShowWorkingMemory ? (
                  <div className="grid grid-auto-rows gap-8 w-48 mt-4  bg-blue-400">
                    <span className="ml-12 p-[10px]">
                      {descriptions["working_memory"]}
                    </span>
                  </div>
                ) : null}
              </div>
              <div>
                {FoundData ? (
                  <div>
                    Best Score:{" "}
                    {get_best_score("working_memory") ? (
                      get_best_score("working_memory")
                    ) : (
                      <span>N/A</span>
                    )}
                  </div>
                ) : (
                  <div className="italic">Not Attempted</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* PLACEHOLDER. More efficient way to display the tests. Is it needed? */}
          {/* {TestMap.map(result => {         
                    return (
                        <div className="max-w-[4rem]" key={result.key}>{result.row.map((result2: {
                            key: null | undefined; number: any | string | number | 
                                null | undefined; }) => {
                            return(
                                <div className="ml-[10px] cursor-pointer" onClick={(e) => check_number(e)} id={result2.number} key={result2.key}>
                                    {result2.number}
                                </div>
                            )
                        })}</div>
                    )
                    })} */}
        </div>
      </div>
    </div>
  );
}
