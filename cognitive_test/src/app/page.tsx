"use client";
import React, { useEffect } from "react";
import "./globals.css";
import ReactionTime from "../tests/ReactionTime";
import NumberVigilance from "@/tests/NumberVigilance";
import ChoiceReaction from "@/tests/ChoiceReaction";
import MemoryScanning from "@/tests/MemoryScanning";
import PictureRecognition from "@/tests/PictureRecognition";
import DigitVigilance from "@/tests/DigitVigilance";
import WorkingMemory from "@/tests/WorkingMemory";
import MotorFunction from "@/tests/MotorFunction";
import WordRecognition from "@/tests/WordRecognition";
import Tests from "@/tests/Tests";
import Login from "@/login/Login";
import Signup from "@/login/Signup";
import MainPage from "./MainPage";
import Profile from "@/login/Profile";
// import Connect from '@/database/Connect'

import Cognito from '@/login/Cognito'
import MongoDB from '@/database/MongoDB'
import HerbSelector from '@/helpers/HerbSelector'
import Google from "@/login/Google";
import { google_credentials } from "@/credentials/Credentials";

export default function Home() {
  // Includes classes for the main div.
  // 0 - Default view
  // 1 - Test popover view
  const main_class = [
    "flex min-h-screen flex-col items-center justify-between p-24",
    "flex min-h-screen flex-col items-center justify-between p-24 h-[100%] w-[100%]  relative",
  ];

  // Assigned to the main div. For use with above 'main_class' variable.
  const [MainClass, setMainClass] = React.useState(main_class[0]);

  // Includes classes to change the header link colors.
  // 0 - Default view
  // 1 - Visited view
  // 2 - Visited view (disabled)
  const link_class = [
    "text-blue-600 cursor-pointer",
    "text-gray-600 font-bold underline cursor-pointer",
    "text-gray-400 disabled",
  ];

  // Assigned to the header links. For use with abov 'link_class' variable.
  const [HomeClass, setHomeClass] = React.useState(link_class[1]);
  const [TestClass, setTestClass] = React.useState(link_class[0]);
  const [SignupClass, setSignupClass] = React.useState(link_class[0]);
  const [LoginClass, setLoginClass] = React.useState(link_class[0]);
  const [ProfileClass, setProfileClass] = React.useState(link_class[0]);

  // An array of the above state variables. Used in the 'set_classes' and 'link_handler' functions to change a link's color based on what page is currently displayed.
  const classes = [
    setHomeClass,
    setTestClass,
    setSignupClass,
    setLoginClass,
    setProfileClass,
  ];

  // A collection of boolean functions which are set to true when the corresponding page is intended to be displayed.
  const [ShowHome, setShowHome] = React.useState(true);
  const [ShowTestInfo, setShowTestInfo] = React.useState(false);
  const [ShowSignup, setShowSignup] = React.useState(false);
  const [ShowLogin, setShowLogin] = React.useState(false);
  const [TriggerLogin, setTriggerLogin] = React.useState(false);
  const [ShowProfile, setShowProfile] = React.useState(false);

  // An array of the above state variables. Used to change the currently displayed page.
  // Used in: 'set_screens', 'link_handler' functions.
  const screens = [
    setShowHome,
    setShowTestInfo,
    setShowSignup,
    setTriggerLogin,
    // setShowLogin,
    setShowProfile,
  ];

  // A boolean variable that is set to true when a user is logged in. Only true when a correct username and password are compared to values stored in the app's associated Cognito user pool. Stored in local cookies.
  // Used locally in: 'toggle_login' function.
  // Passed to: 'src/login/Signup', 'src/login/Login' components.
  const [LoggedIn, setLoggedIn] = React.useState(true);
  const [LoginCheck, setLoginCheck] = React.useState(false)
  const [GoogleStart, setGoogleStart] = React.useState(false)

  // A collection of boolean state variables that are set to true when a particular test is displayed.
  const [ShowPopover, setShowPopover] = React.useState(false);
  const [ShowChoiceReaction, setShowChoiceReaction] = React.useState(false);
  const [ShowDigitVigilance, setShowDigitVigilance] = React.useState(false);
  const [ShowMemoryScanning, setShowMemoryScanning] = React.useState(false);
  const [ShowMotorFunction, setShowMotorFunction] = React.useState(false);
  const [ShowNumberVigilance, setShowNumberVigilance] = React.useState(false);
  const [ShowPictureRecognition, setShowPictureRecognition] =
    React.useState(false);
  const [ShowReactionTime, setShowReactionTime] = React.useState(false);
  const [ShowWordRecognition, setShowWordRecognition] = React.useState(false);
  const [ShowWorkingMemory, setShowWorkingMemory] = React.useState(false);

  const [ConfirmCode, setConfirmCode] = React.useState("");
  const [Submit, setSubmit] = React.useState(false);
  const [ShowConfirm, setShowConfirm] = React.useState(false);
  const [ConfirmSuccess, setConfirmSuccess] = React.useState(false);
  const [CheckConfirm, setCheckConfirm] = React.useState(false);
  const [StartLogin, setStartLogin] = React.useState(false);

  // Holds the above state variables for looping in 'set_screens' function.
  const test_types = [
    setShowChoiceReaction,
    setShowDigitVigilance,
    setShowMemoryScanning,
    setShowMotorFunction,
    setShowNumberVigilance,
    setShowPictureRecognition,
    setShowReactionTime,
    setShowWordRecognition,
    setShowWorkingMemory,
  ];

  // A state variable that is tied to a useEffect hook. Only active when the home page is initially displayed. A function is then called to check if login cookies already exist. If so, the user is automatically logged in.
  // Passes to: 'src/login/Login' component.
  const [CookiesChecked, setCookiesChecked] = React.useState(false);

  // A boolean state variable that stores the current login cookies.
  // Used locally in: 'check_cookies' function.
  const [Cookies, setCookies] = React.useState(null);
  const [ClearToken, setClearToken] = React.useState(false);

  // A boolean state variable that triggers the logout timer, and 'cookie_handler' function to remove cookies from the browser.
  // Used locally in: 'login_handler' function.
  // Passes to: 'src/login/Cognito' component.
  const [Logout, setLogout] = React.useState(false);
  const [Login, setLogin] = React.useState(false);

  // String state variables intended to display the logged in user's username and email.
  // Used locally in: 'check_cookies' and 'toggle_login' functions.
  // Passes to: 'src/login/Login' and 'src/login/Signup'.
  const [Username, setUsername] = React.useState("");
  const [Name, setName] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Created, setCreated] = React.useState("");

  // String state variable that stores a user's entered password.
  // NEEDS SECURITY IMPROVEMENT. CURRENTLY STORED IN A COOKIE AS PLAIN TEXT.
  // Used locally in: 'cookie_handler' and 'toggle_login' functions.
  // Passes to: 'src/login/Signup', 'src/login/Login' and 'src/login/Profile' components.
  const [Password, setPassword] = React.useState("");

  // Number state variable holding the value for the logout timer. Used in a useEffect hook that controls the logout timer.
  // Used locally in: 'toggle_login' function.
  const [LogoutTimer, setLogoutTimer] = React.useState<any>(null);
  const [LoginTimer, setLoginTimer] = React.useState<any>(null);

  // A Number state variable that is used as a key for each current test iteration. Increments when a test is reset to clear all variable values.
  const [TestID, setTestID] = React.useState(0);
  const [TestTitle, setTestTitle] = React.useState("");
  const [PopoverMessage, setPopoverMessage] = React.useState("");
  const [Reset, setReset] = React.useState(false);

  // A Number state variable that is used as a key for each current test iteration. Increments when a test is reset to clear all variable values.
  // Used locally in: 'reset_handler' function.
  // Passes to: All test functions located in 'src/tests'.
  const [StateKey, setStateKey] = React.useState(0);

  const [Insert, setInsert] = React.useState(false);
  const [Data, setData] = React.useState([]);
  const [TestName, setTestName] = React.useState("");
  const [Table, setTable] = React.useState(null);

  const [UsernameMatch, setUsernameMatch] = React.useState(false);
  const [UsernameCheck, setUsernameCheck] = React.useState(false);
  const [Retrieve, setRetrieve] = React.useState(false);
  const [RetrievedData, setRetrievedData] = React.useState(null);
  const [SignupSuccess, setSignupSuccess] = React.useState(false);
  const [SignupTimer, setSignupTimer] = React.useState<any>(null);
  const [UserInserted, setUserInserted] = React.useState(false);
  const [UsernameVerified, setUsernameVerified] = React.useState(false);
  const [TriggerInsert, setTriggerInsert] = React.useState(false);

  const [ShowSelector, setShowSelector] = React.useState(false)
  const [Herb, setHerb] = React.useState<any>(null)
  const [Start, setStart] = React.useState<any>(null)


  const [FromProfile, setFromProfile] = React.useState<any>(null)


  useEffect(() => {
    FromProfile ? console.log(FromProfile) : null;
  }, [FromProfile]);


  // Active only when the home page is first displayed. Checks if user login cookies currently exist.
  useEffect(() => {
    //check for username (and cookie expiry??)
    !CookiesChecked ? check_cookies() : null;
  }, [CookiesChecked]);

  // Activated when a user login has been successfully processed in the 'src/login/Cognito' component. Sets login status to true.
  // useEffect(() => {
  //   LoggedIn && Cookies && Username && Password ? toggle_login(true) : null;
  // }, [LoggedIn, Cookies, Username, Password]);


  // If a user is logged in, sends them to the profile page. Otherwise, the user is sent to the home page.
  useEffect(() => {
    LoggedIn ? link_handler(1) : link_handler(0);
    LoggedIn && Start ? cookie_handler(true) : null
  }, [LoggedIn, Start]);


  // When the 'Reset' state variable is true, triggers the 'reset_handler' function.
  useEffect(() => {
    Reset ? reset_handler() : null;
  }, [Reset]);


  useEffect(() => {
    LoginTimer == 5 ? disable_links(true) : null;
    LoginTimer == null ? disable_links(false) : null;
  }, [LoginTimer]);


  useEffect(() => {
    LogoutTimer == 5 ? disable_links(true) : null;
    LogoutTimer == null ? disable_links(false) : null;
  }, [Logout, LogoutTimer]);


  useEffect(() => {
    SignupTimer == 5 ? disable_links(true) : null;
    SignupTimer == null ? disable_links(false) : null;
  }, [SignupTimer]);


  // Controls the logout timer and its associated display.
  useEffect(() => {
    Logout && LogoutTimer == null ? setLogoutTimer(5) : null;

    while (Logout && LogoutTimer >= 0) {
      const timeoutId = setTimeout(() => {
        setLogoutTimer(LogoutTimer - 1);
        if (LogoutTimer <= 0) {
          setLogout(false);
          setLogoutTimer(null);
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [Logout, LogoutTimer]);


    useEffect(() => {
        while(StartLogin && LoginTimer >= -1 ){
            const timeoutId = setTimeout(() => {
              setLoginTimer(LoginTimer - 1)
                if(LoginTimer < 0
                ){
                  setLoginTimer(null)
                  setStartLogin(false)
                  setLoggedIn(true)
                  toggle_login(true)
                }
         
            }, 1000 )

            return () => clearTimeout(timeoutId)
        }
        
    }, [StartLogin, LoginTimer])


  // Resets the current test page if the 'reset' button is pressed.
  // @param: N/A
  // @return: N/A
  function reset_handler(){
    setStateKey(StateKey + 1)
    setReset(false)
    setShowTestInfo(false)
    setShowSelector(true)
    setHerb(null)
  }


  // Checks if login cookies currently exist.
  // @param: N/A
  // @return: true if cookies exist, false otherwise.
  function check_cookies() {
    var cookies = document.cookie.split("; ");
    var cookie_arr: any = [];

    for (var i = 0; i < cookies.length; i++) {
      cookies[i].split("=")[0] === "Username" || cookies[i].split("=")[0] === "Created" ? cookie_arr.push(cookies[i].split("=")[1]) : null
    }

    console.log("cookie array")
    console.log(cookie_arr)

    let expired = null
    
    cookie_arr[0] ? setUsername(cookie_arr[0]) : null
    cookie_arr[1] ? expired = is_cookie_expired(cookie_arr[1]) : null

    try{
      if (cookie_arr[0][1] && cookie_arr[1][1] && !expired) {
        setStartLogin(true)
        setUsername(cookie_arr[0]);
        setCreated(cookie_arr[1]);
        
        return true;
      }
    }catch{}

    setCookiesChecked(true)
    return false;
  }
  

  function is_cookie_expired(date: any){
    const cookie = new Date(date)
    cookie.setTime(cookie.getTime() + (24 * 60 * 60 * 1000 * 7))
    const current_date = new Date()
    current_date.setTime(current_date.getTime())
    console.log("expire date")
    console.log(cookie)
    console.log("current date")
    console.log(current_date)
    if(cookie < current_date){
        console.log("set new login cookies")
        cookie_handler(false)
        setClearToken(true)
        return true
    }
    return false
  }

  function cookie_handler(condition: any){
    console.log("cookie handler")
    const date = new Date()
    if(condition){
      console.log("setting cookies")
      date.setTime(date.getTime())
      var utc_current = date.toUTCString()
      console.log("current date set to cookies")
      console.log(utc_current)
      date.setTime(date.getTime() + (24 * 60 * 60 * 1000 * 7))
      var utc_expire = date.toUTCString()
      console.log("expiration date set to cookies")
      console.log(utc_expire)
      document.cookie = "Username=" + Username + "; expires=" + utc_expire + "path=/"
      document.cookie = "Created=" + utc_current + "; expires=" + utc_expire + "path=/"
    }else{
      date.setTime(date.getTime() - (24 * 60 * 60 * 1000))
      var utc_prev = date.toUTCString()
      console.log("clearing cookies")
      setClearToken(true)
      document.cookie = "Username=; expires=" + utc_prev +  "path=/"
      document.cookie = "Created=; expires=" + utc_prev + "path=/"
    }
}

  // Sets the login state variable or clears user and initiates logout process.
  // @param 'condition': Boolean. If true, sets login state variable to true. When false, triggers user logout.
  // @return: N/A
  function toggle_login(condition: any) {
    setLoggedIn(condition);
    if (!condition) {
      cookie_handler(false)
      setLoggedIn(false)
      setLoginCheck(false)
      setStart(false)
      setCookiesChecked(true)
      setCookies(null)
      setPassword("");
      setLogoutTimer(5);
      setLogout(true);
    }
  }

  // Routes the user to the clicked page link in the header.
  // @param place: Number. The spot in the 'classes' and 'screens' array that corresponds to each page.
  // @return: N/A
  function link_handler(place: any){
    clear_tests()
    setTestID(0)
    set_classes(place)
    set_screens(place)
    setHerb(null)
    setShowSelector(false)
  }

  // Clears associated variables when a user exists the test popover.
  // @param: N/A
  // @return: N/A
  function hide_popover() {
    setShowPopover(false);
    setMainClass(main_class[0]);
    setPopoverMessage("");
    setTestTitle("");
    setFromProfile(null)
  }

  // Loops through the 'classes' array and sets the link class to its desired style.
  // @param link: The place in the array containing the current class.
  // @return: N/A
  function set_classes(link: any) {
    for (var i = 0; i < classes.length; i++) {
      i != link ? classes[i](link_class[0]) : classes[i](link_class[1]);
    }
  }

  // Loops through the 'screens' array and sets the screen to its intended display.
  // @param link: The place in the array containing the current class.
  // @return: N/A
  function set_screens(link: any) {
    for (var i = 0; i < screens.length; i++) {
      i != link ? screens[i](false) : screens[i](true);
    }
  }

  // Loops through all state variables in 'test_types' array and sets them to false. This results in no test being displayed.
  // @param: N/A
  // @return: N/A
  function clear_tests() {
    for (var i = 0; i < test_types.length; i++) {
      test_types[i](false);
    }
  }

  // Routes to the appropriate test page, based on the TestID state variable.  Clears all pages and classes to allow for a fresh screen.
  // @param: N/A
  // @return: N/A
  function take_test() {
    setHomeClass(link_class[0]);
    setShowPopover(false);
    setShowTestInfo(false);
    setShowProfile(false)
    clear_tests();
    setShowSelector(true)

    switch (TestID) {
      case 1:
        setShowChoiceReaction(true);
        break;
      case 2:
        setShowDigitVigilance(true);
        break;
      case 3:
        setShowMemoryScanning(true);
        break;
      case 4:
        setShowMotorFunction(true);
        break;
      case 5:
        setShowNumberVigilance(true);
        break;
      case 6:
        setShowPictureRecognition(true);
        break;
      case 7:
        setShowReactionTime(true);
        break;
      case 8:
        setShowWordRecognition(true);
        break;
      case 9:
        setShowWorkingMemory(true);
        break;
    }
  }

  // Toggles the links between disabled/enabled during screen transition.
  // @param 'condition': Boolean. If true, sets all links to disabled, otherwise all enabled.
  // @return: N/A
  function disable_links(condition: any) {
    if (condition) {
      console.log("disabled links true");
      for (let i = 0; i < classes.length; i++) {
        classes[i](link_class[2]);
      }
      return true;
    } else {
      console.log("disabled links false");
      for (let i = 0; i < classes.length; i++) {
        classes[i](link_class[0]);
      }
    }
  }

  return (
    <main className={MainClass}>
      <div className="grid place-items-center">
        {typeof window !== "undefined" ? window.screen.width < 800 ?
          <div className="mt-48 text-black">
            No mobile support. Intended for desktop only.
          </div>
        :
        <div>
          <div className="z-1 max-w-screen-lg w-full font-mono text-base sm:text-lg grid grid-auto-rows place-items-center px-4 md:px-8">
            <div className="grid grid-flow-row sm:grid-flow-col gap-8 sm:gap-16 lg:gap-24">
              {LoggedIn ? (
                <span onClick={(e) => link_handler(0)} className={HomeClass}>
                  Home
                </span>
              ) : null}

              {LoggedIn ? (
                <span onClick={(e) => link_handler(1)} className={TestClass}>
                  Tests
                </span>
              ) : null}

              {/* {!LoggedIn ? (
                <span onClick={(e) => link_handler(2)} className={SignupClass}>
                  Signup
                </span>
              ) : null} */}

              {/* {!LoggedIn ? (
                <span onClick={(e) => link_handler(3)} className={LoginClass}>
                  {/* Login 
                </span>
              ) : (
                <div className="grid grid-rows-2 gap-6 place-items-top">
                  <div onClick={(e) => link_handler(4)} className={ProfileClass}>
                    Profile
                  </div>
                  <div className="text-sm text-black grid grid-auto-rows relative w-24">
                    <div>Username: {Username}</div>
                    <div
                      className="grid place-items-end text-xs text-blue-600 underline cursor-pointer"
                      onClick={(e) => toggle_login(false)}
                    >
                      Log Out
                    </div>
                  </div>
                </div>
              )} */}
            </div>

            {/* 
              FOR AWS DATABASE. IF USED, NEEDS MODIFICATION FOR NEWER FUNCTIONS CREATED WHEN MONGO DB WAS IMPLEMENTED. 
              <div> 
                <Connect Insert={Insert} setInsert={setInsert} setData={setData}  setTestName={setTestName} Data={Data} Username={Username} TestName={TestName} setRetrievedData={setRetrievedData} setRetrieve={setRetrieve} Retrieve={Retrieve}/>
              </div> 
            */}

            <div className="mt-24">

              {ShowHome && !Logout && !StartLogin? 
                <MainPage/>  
              : null}

              {ShowSelector && !ShowTestInfo ? 
              <div className="xs:w-full lg:w-full">
                <HerbSelector setShowSelector={setShowSelector} setHerb={setHerb} Herb={Herb} TestTitle={TestTitle}/></div>
              : null}

              {Herb && !ShowSelector ?
                <div className="mb-12">
                  Chosen Herb: {Herb}
                </div>
              : null}

              {(ShowTestInfo || ShowProfile) && !ShowSelector ?
                <Tests setMainClass={setMainClass} main_class={main_class} setShowPopover={setShowPopover} setPopoverMessage={setPopoverMessage} setTestTitle={setTestTitle} setTestID={setTestID} setTable={setTable} setShowSelector={setShowSelector} ShowProfile={ShowProfile} FromProfile={FromProfile}/>
              : null}

              {!ShowSelector && ShowChoiceReaction ?
                <ChoiceReaction setInsert={setInsert} setData={setData} setTestName={setTestName} setReset={setReset} key={StateKey} setTable={setTable}/>
              : null}

              {!ShowSelector && ShowDigitVigilance ?
                <DigitVigilance setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey} setTable={setTable}/>
              : null}

              {!ShowSelector && ShowMemoryScanning ?
                <MemoryScanning setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey} setTable={setTable}/>
              : null}
            
              {!ShowSelector && ShowMotorFunction ?
                <MotorFunction setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey} setTable={setTable}/>
              : null}

              {!ShowSelector && ShowNumberVigilance ?
                <NumberVigilance setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey} setTable={setTable}/>        
              :null}

              {!ShowSelector && ShowPictureRecognition ?
                <PictureRecognition setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey} setTable={setTable}/>        
              :null}

              {!ShowSelector && ShowReactionTime ?
                <ReactionTime setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey} setTable={setTable}/>        
              :null}

              {!ShowSelector && ShowWordRecognition ?
                <WordRecognition setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey} setTable={setTable}/>        
              :null}

              {!ShowSelector && ShowWorkingMemory ?
                <WorkingMemory setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey} setTable={setTable}/>        
              :null}

              {ShowSignup ?
                <Signup link_handler={link_handler} toggle_login={toggle_login} setTable={setTable} setLoggedIn={setLoggedIn} setName={setName} setUsername={setUsername} Password={Password} setPassword={setPassword} Email={Email} setEmail={setEmail} setConfirmSuccess={setConfirmSuccess} setCheckConfirm={setCheckConfirm} setShowConfirm={setShowConfirm} ShowConfirm={ShowConfirm} ConfirmCode={ConfirmCode} setConfirmCode={setConfirmCode} ConfirmSuccess={ConfirmSuccess} setSubmit={setSubmit} UsernameMatch={UsernameMatch} setUsernameMatch={setUsernameMatch} SignupSuccess={SignupSuccess} setUsernameCheck={setUsernameCheck} UsernameVerified={UsernameVerified} setUsernameVerified={setUsernameVerified} SignupTimer={SignupTimer} setSignupTimer={setSignupTimer}/>
              : null}


              {ShowProfile ?
                <Profile LoggedIn={LoggedIn} Username={Username} Password={Password} Email={Email} Logout={Logout} setRetrieve={setRetrieve} RetrievedData={RetrievedData} setRetrievedData={setRetrievedData} setFromProfile={setFromProfile}/>
              : null}


              {Logout ?
                <div className="grid grid-rows-2 gap-12 place-items-center">
                  <div className="mt-12">Logging Out...</div>
                  <div>
                    {LogoutTimer > 0 ? <div>{LogoutTimer}</div> : <div>Go!</div>}
                  </div>
                </div>
              : null}

              {LoginTimer || LoginTimer == 0 ?
                <div className="grid grid-rows-2 gap-12 place-items-center">
                  <div className="mt-12">Logging In...</div>
                  <div>
                    {LoginTimer > 0 ? <div>{LoginTimer}</div> : <div>Go!</div>}
                  </div>
                </div>
              : null}
            </div>
          </div>


          {ShowPopover ? (
            <div className="w-screen h-full flex justify-center items-center fixed top-0 z-2 bg-black opacity-65"></div>
          ) : null}


          {ShowPopover ? 
            <div className="h-flex w-full xs:w-[70%] sm:w-[80%] md:w-[60%] lg:w-[30%] z-99 fixed top-[20%] left-1/2 -translate-x-1/2 bg-blue-400 rounded-2xl text-white">
              <div className="p-6 md:p-12 grid grid-auto-rows overflow-y-auto max-h-[80vh]">
                <div className="text-lg sm:text-2xl md:text-3xl">{TestTitle}</div>
                <div className="mt-[15%] text-xl">{PopoverMessage}</div>
                <div
                  className="mt-[15%] w-full static underline cursor-pointer text-2xl"
                  onClick={(e) => take_test()}
                >
                  Take Test
                </div>
                <div
                  className="mt-[15%] w-full static underline cursor-pointer"
                  onClick={(e) => hide_popover()}
                >
                  Close
                </div>
              </div>
            </div>
          : null}

          <Google setUsernameCheck={setUsernameCheck} setUsername={setUsername} TriggerLogin={TriggerLogin} setTriggerLogin={setTriggerLogin} setTable={setTable} Cookies={Cookies} setCookies={setCookies} CookiesChecked={CookiesChecked} Start={Start} setStart={setStart} setStartLogin={setStartLogin} setTriggerInsert={setTriggerInsert} LogoutTimer={LogoutTimer} Logout={Logout} setLoginTimer={setLoginTimer}/>

          <MongoDB Table={Table} setTable={setTable} setUserInserted={setUserInserted} setTestName={setTestName} Data={Data} Username={Username} setUsername={setUsername}  Email={Email} Name={Name} TestName={TestName} setRetrievedData={setRetrievedData} setRetrieve={setRetrieve}   setUsernameMatch={setUsernameMatch}  UsernameCheck={UsernameCheck} setUsernameCheck={setUsernameCheck} UsernameVerified={UsernameVerified} setUsernameVerified={setUsernameVerified} setTriggerInsert={setTriggerInsert} TriggerInsert={TriggerInsert} setHerb={setHerb} Herb={Herb} Cookies={Cookies} setCookies={setCookies} setCookiesChecked={setCookiesChecked} setLoginCheck={setLoginCheck} setStartLogin={setStartLogin} StartLogin={StartLogin} ClearToken={ClearToken} setClearToken={setClearToken}/>

          {/* <Cognito UserInserted={UserInserted} setTriggerInsert={setTriggerInsert} setUserInserted={setUserInserted} setSignupSuccess={setSignupSuccess} Username={Username} Name={Name} Email={Email} Password={Password} setCheckConfirm={setCheckConfirm} CheckConfirm={CheckConfirm} ConfirmCode={ConfirmCode} setLoggedIn={setLoggedIn} setConfirmSuccess={setConfirmSuccess} Logout={Logout}/>  */}
          </div>
        : <div>
            Abnormal page error. Window object is undefined. 
          </div>}
      </div>
    </main>
  );
}
