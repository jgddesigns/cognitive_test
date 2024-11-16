'use client'
import React, {useEffect} from 'react'
import './globals.css'
import ReactionTime from "../tests/ReactionTime"
import NumberVigilance from '@/tests/NumberVigilance'
import ChoiceReaction from '@/tests/ChoiceReaction'
import MemoryScanning from '@/tests/MemoryScanning'
import PictureRecognition from '@/tests/PictureRecognition'
import DigitVigilance from '@/tests/DigitVigilance'
import WorkingMemory from '@/tests/WorkingMemory'
import MotorFunction from '@/tests/MotorFunction'
import WordRecognition from '@/tests/WordRecognition'
import Tests from '@/tests/Tests'
import Login from '@/login/Login'
import Signup from '@/login/Signup'
import MainPage from './MainPage'
import Profile from '@/login/Profile'
import Connect from '@/database/Connect'
import Cognito from '@/login/Cognito'
import MongoDB from '@/database/MongoDB'


export default function Home() {
  // Includes classes for the main div.
  // 0 - Default view
  // 1 - Test popover view
  const main_class = ["flex min-h-screen flex-col items-center justify-between p-24"
, "flex min-h-screen flex-col items-center justify-between p-24 h-[100%] w-[100%]  relative"]

  // Assigned to the main div. For use with above 'main_class' variable.
  const [MainClass, setMainClass] = React.useState(main_class[0])

  // Includes classes to change the header link colors.
  // 0 - Default view
  // 1 - Visited view
  // 2 - Visited view (disabled)
  const link_class = ["text-blue-600 cursor-pointer", "text-gray-600 font-bold underline cursor-pointer", "text-gray-400"]

  // Assigned to the header links. For use with abov 'link_class' variable.
  const [HomeClass, setHomeClass] = React.useState(link_class[1])
  const [TestClass, setTestClass] = React.useState(link_class[0])
  const [SignupClass, setSignupClass] = React.useState(link_class[0])
  const [LoginClass, setLoginClass] = React.useState(link_class[0])
  const [ProfileClass, setProfileClass] = React.useState(link_class[0])

  // An array of the above state variables. Used in the 'set_classes' and 'link_handler' functions to change a link's color based on what page is currently displayed.
  const classes = [setHomeClass, setTestClass, setSignupClass, setLoginClass, setProfileClass]

  // A collection of boolean functions which are set to true when the corresponding page is intended to be displayed. 
  const [ShowHome, setShowHome] = React.useState(true)
  const [ShowTestInfo, setShowTestInfo] = React.useState(false)
  const [ShowSignup, setShowSignup] = React.useState(false)
  const [ShowLogin, setShowLogin] = React.useState(false)
  const [ShowProfile, setShowProfile] = React.useState(false)

  // An array of the above state variables. Used to change the currently displayed page. 
  // Used in: 'set_screens', 'link_handler' functions.  
  const screens = [setShowHome, setShowTestInfo, setShowSignup, setShowLogin, setShowProfile]

  // A boolean variable that is set to true when a user is logged in. Only true when a correct username and password are compared to values stored in the app's associated Cognito user pool. Stored in local cookies.
  // Used locally in: 'toggle_login' function.
  // Passed to: 'src/login/Signup', 'src/login/Login' components.
  const [LoggedIn, setLoggedIn] = React.useState(false)

  // A collection of boolean state variables that are set to true when a particular test is displayed.
  const [ShowPopover, setShowPopover] = React.useState(false)
  const [ShowChoiceReaction, setShowChoiceReaction] = React.useState(false)
  const [ShowDigitVigilance, setShowDigitVigilance] = React.useState(false)
  const [ShowMemoryScanning, setShowMemoryScanning] = React.useState(false)
  const [ShowMotorFunction, setShowMotorFunction] = React.useState(false)
  const [ShowNumberVigilance, setShowNumberVigilance] = React.useState(false)
  const [ShowPictureRecognition, setShowPictureRecognition] = React.useState(false)
  const [ShowReactionTime, setShowReactionTime] = React.useState(false)
  const [ShowWordRecognition, setShowWordRecognition] = React.useState(false)
  const [ShowWorkingMemory, setShowWorkingMemory,] = React.useState(false)

  // Holds the above state variables for looping in 'set_screens' function. 
  const test_types = [        
    setShowChoiceReaction, setShowDigitVigilance, setShowMemoryScanning, setShowMotorFunction, setShowNumberVigilance, setShowPictureRecognition,setShowReactionTime, setShowWordRecognition,setShowWorkingMemory
  ]

  // A state variable that is tied to a useEffect hook. Only active when the home page is initially displayed. A function is then called to check if login cookies already exist. If so, the user is automatically logged in. 
  // Passes to: 'src/login/Login' component.
  const [CookiesChecked, setCookiesChecked] = React.useState(false)

  // A boolean state variable that stores the current login cookies. 
  // Used locally in: 'check_cookies' function.
  const [Cookies, setCookies] = React.useState(true)

  // A boolean state variable that triggers the logout timer, and 'cookie_handler' function to remove cookies from the browser. 
  // Used locally in: 'login_handler' function.
  // Passes to: 'src/login/Cognito' component.
  const [Logout, setLogout] = React.useState(false)

  // String state variables intended to display the logged in user's username and email. 
  // Used locally in: 'check_cookies' and 'toggle_login' functions.
  // Passes to: 'src/login/Login' and 'src/login/Signup'.
  const [Username, setUsername] = React.useState("")
  const [Email, setEmail] = React.useState("")
  
  // String state variable that stores a user's entered password. 
  // NEEDS SECURITY IMPROVEMENT. CURRENTLY STORED IN A COOKIE AS PLAIN TEXT. 
  // Used locally in: 'cookie_handler' and 'toggle_login' functions. 
  // Passes to: 'src/login/Signup', 'src/login/Login' and 'src/login/Profile' components.
  const [Password, setPassword] = React.useState("")

  // Number state variable holding the value for the logout timer. Used in a useEffect hook that controls the logout timer. 
  // Used locally in: 'toggle_login' function.
  const [LogoutTimer, setLogoutTimer] = React.useState<any>(5)

  // A Number state variable that is used as a key for each current test iteration. Increments when a test is reset to clear all variable values.
  const [TestID, setTestID] = React.useState(0)
  const [TestTitle, setTestTitle] = React.useState("")
  const [PopoverMessage, setPopoverMessage] = React.useState("")
  const [Reset, setReset] = React.useState(false)

  // A Number state variable that is used as a key for each current test iteration. Increments when a test is reset to clear all variable values.
  // Used locally in: 'reset_handler' function.
  // Passes to: All test functions located in 'src/tests'.
  const [StateKey, setStateKey] = React.useState(0)

  const [Insert, setInsert] = React.useState(false)
  const [Data, setData] = React.useState([])
  const [TestName, setTestName] = React.useState("")

  const [Retrieve, setRetrieve] = React.useState(false)
  const [RetrievedData, setRetrievedData] = React.useState(null)

  // Active only when the home page is first displayed. Checks if user login cookies currently exist.
  useEffect(() => {
    !CookiesChecked ? check_cookies() : null
  }, [CookiesChecked])

  // Activated when a user login has been successfully processed in the 'src/login/Cognito' component. Sets login status to true. 
  useEffect(() => {
    LoggedIn && Cookies && Username && Password  ? toggle_login(true) : null
  }, [LoggedIn, Cookies, Username, Password])

  // If a user is logged in, sends them to the profile page. Otherwise, the user is sent to the home page.
  useEffect(() => {
    LoggedIn ? link_handler(4) : link_handler(0)
  }, [LoggedIn])

  // When the 'Reset' state variable is true, triggers the 'reset_handler' function.
  useEffect(() => {
    Reset ? reset_handler() : null
  }, [Reset])


  useEffect(() => {
    !RetrievedData ? setRetrieve(true) : null
  }, [RetrievedData])


  // Controls the logout timer and its associated display.
  useEffect(() => {
    while(Logout && LogoutTimer >= 0){
        const timeoutId = setTimeout(() => {
            setLogoutTimer(LogoutTimer - 1)
            LogoutTimer <= 0 ? setLogout(false) : null
        }, 1000 )

        return () => clearTimeout(timeoutId)
    }
  }, [Logout, LogoutTimer])

  // Resets the current test page if the 'reset' button is pressed.
  // @param: N/A
  // @return: N/A
  function reset_handler(){
    setStateKey(StateKey + 1)
    setReset(false)
  }

  // Checks if login cookies currently exist. 
  // @param: N/A
  // @return: true if cookies exist, false otherwise.
  function check_cookies(){
    var cookies = document.cookie.split(";")
    var cookie_arr = []
    for(var i = 0; i<cookies.length; i++){
      cookie_arr.push(cookies[i].split("="))
    }
    if(cookie_arr[0][1]){
      setUsername(cookie_arr[0][1])
      setEmail(cookie_arr[1][1])
      setPassword(cookie_arr[2][1])
      toggle_login(true)
      setCookies(true)
      return true
    }
    setCookies(false)
    setCookiesChecked(true)
    return false
  }

  // Sets the login state variable or clears user and initiates logout process.
  // @param 'condition': Boolean. If true, sets login state variable to true. When false, triggers user logout.
  // @return: N/A
  function toggle_login(condition: any){
    setLoggedIn(condition)
    if(!condition){
      setUsername("")
      setPassword("")
      setLogoutTimer(5)
      setLogout(true) 
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
  }

  // Clears associated variables when a user exists the test popover.
  // @param: N/A
  // @return: N/A
  function hide_popover(){
    setShowPopover(false)
    setMainClass(main_class[0])
    setPopoverMessage("")
    setTestTitle("")
  }

  // Loops through the 'classes' array and sets the link class to its desired style.
  // @param link: The place in the array containing the current class.
  // @return: N/A
  function set_classes(link: any){
    for(var i=0; i < classes.length; i++){
      i != link ? classes[i](link_class[0]) : classes[i](link_class[1])
    }
  }

  // Loops through the 'screens' array and sets the screen to its intended display.
  // @param link: The place in the array containing the current class.
  // @return: N/A
  function set_screens(link: any){
    for(var i=0; i < screens.length; i++){
      i != link ? screens[i](false) : screens[i](true)
    }
  }

  // Loops through all state variables in 'test_types' array and sets them to false. This results in no test being displayed.
  // @param: N/A
  // @return: N/A
  function clear_tests(){
    for(var i=0; i<test_types.length; i++){
      test_types[i](false)
    }
  }


  // Routes to the appropriate test page, based on the TestID state variable.  Clears all pages and classes to allow for a fresh screen.
  // @param: N/A
  // @return: N/A
  function take_test(){
    setHomeClass(link_class[0])
    setShowPopover(false)
    setShowTestInfo(false)
    clear_tests()

    switch (TestID){
      case 1:
        setShowChoiceReaction(true)
        break
      case 2:
        setShowDigitVigilance(true)
        break
      case 3:
        setShowMemoryScanning(true)
        break
      case 4:
        setShowMotorFunction(true)
        break
      case 5:
        setShowNumberVigilance(true)
        break
      case 6:
        setShowPictureRecognition(true)
        break
      case 7:
        setShowReactionTime(true)
        break
      case 8:
        setShowWordRecognition(true)
        break
      case 9:
        setShowWorkingMemory(true)
        break
    }
  }

  return (
    <main className={MainClass}>
      <div className="z-1 max-w-5xl w-full font-mono text-lg grid grid-auto-rows place-items-center">
        <div className="grid grid-flow-col gap-48">        
          <span onClick={e => link_handler(0)} className={HomeClass}>
            Home
          </span>

          {LoggedIn ?
            <span onClick={e => link_handler(1)} className={TestClass}>
              Tests
            </span>
          : null}

          {!LoggedIn ? 
            <span onClick={e => link_handler(2)} className={SignupClass}>
              Signup
            </span>
          : null}

          {!LoggedIn ? 
            <span onClick={e => link_handler(3)} className={LoginClass}>
              Login
            </span>
          : <div className="grid grid-rows-2 gap-12 place-items-center">
              <div onClick={e => link_handler(4)} className={ProfileClass}>
                Profile
              </div>
              <div className="text-sm text-black grid grid-rows-2 relative">
                <span>
                  Username: {Username}
                </span>
                <span className="absolute top-4 right-0 text-xs text-blue-600 underline cursor-pointer" onClick={e=> toggle_login(false)}>
                  Log Out
                </span>           
              </div>
            </div>
          }
        </div>

        <div>
          <Connect Insert={Insert} setInsert={setInsert} setData={setData}  setTestName={setTestName} Data={Data} Username={Username} TestName={TestName} setRetrievedData={setRetrievedData} setRetrieve={setRetrieve} Retrieve={Retrieve}/>
        </div>

        <div className="mt-24">
          {ShowHome && !Logout ? 
            <MainPage/>  
          : null}

          {ShowTestInfo ?
            <Tests setMainClass={setMainClass} main_class={main_class} setShowPopover={setShowPopover} setPopoverMessage={setPopoverMessage} setTestTitle={setTestTitle} setTestID={setTestID}/>
          : null}

          {ShowChoiceReaction ?
            <ChoiceReaction setInsert={setInsert} setData={setData} setTestName={setTestName} setReset={setReset} key={StateKey}/>
          : null}

          {ShowDigitVigilance ?
            <DigitVigilance setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey}/>
          : null}

          {ShowMemoryScanning ?
            <MemoryScanning setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey}/>
          : null}
        
          {ShowMotorFunction ?
            <MotorFunction setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey}/>
          : null}

          {ShowNumberVigilance ?
            <NumberVigilance setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey}/>        
          :null}

          {ShowPictureRecognition ?
            <PictureRecognition setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey}/>        
          :null}

          {ShowReactionTime ?
            <ReactionTime setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey}/>        
          :null}

          {ShowWordRecognition ?
            <WordRecognition setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey}/>        
          :null}

          {ShowWorkingMemory ?
            <WorkingMemory setInsert={setInsert} setData={setData}  setTestName={setTestName} setReset={setReset} key={StateKey}/>        
          :null}

          {ShowSignup ?
            <Signup link_handler={link_handler} toggle_login={toggle_login} setLoggedIn={setLoggedIn} setUsername={setUsername} setPassword={setPassword}/>
          : null}

          {ShowLogin ?
            <Login setLoggedIn={setLoggedIn} setUsername={setUsername} setPassword={setPassword} Logout={Logout}/>
          : null}

          {ShowProfile ?
            <Profile LoggedIn={LoggedIn} Username={Username} Password={Password} Email={Email} Logout={Logout} setRetrieve={setRetrieve} RetrievedData={RetrievedData} setRetrievedData={setRetrievedData}/>
          : null}

          {Logout ?
            <div className="grid grid-rows-2 gap-12 place-items-center">
              <div className="mt-12">
                  Logging Out... 
              </div>
              <div>
                  {LogoutTimer > 0 ? 
                      <div>
                          {LogoutTimer} 
                      </div>
                  : 
                      <div>
                          Go!
                      </div>
                  }
              </div>
            </div>
          : null}

        </div>
      </div>

      {ShowPopover ?
        <div className="w-full h-full flex justify-center items-center fixed top-0 z-2 bg-black opacity-65">
        </div>
      : null}

      {ShowPopover ?
        <div className="h-flex w-[30%] z-99 fixed top-flex left-[35%] bg-blue-400 rounded-2xl text-white">
          <div className="p-12 grid grid-auto-rows">
            <div className="text-3xl">
                {TestTitle}
            </div>
            <div className="mt-[15%] text-xl">
                {PopoverMessage}
            </div>
            <div className="mt-[15%] w-full static underline cursor-pointer text-2xl" onClick={e => take_test()}>
              Take Test
            </div>
            <div className="mt-[15%] w-full static underline cursor-pointer" onClick={e => hide_popover()}>
              Close
            </div>
          </div>
        </div>
      : null}


      
      <Cognito Logout={Logout} />

      <MongoDB />
    </main>

  )
}
