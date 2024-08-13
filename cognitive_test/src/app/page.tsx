'use client'
import React, {useEffect} from 'react'
import './globals.css'
import VerbalLearning from "../tests/VerbalLearning"
import ReactionTime from "../tests/ReactionTime"
import NumberVigilance from '@/tests/NumberVigilance'
import ChoiceReaction from '@/tests/ChoiceReaction'
import MemoryScanning from '@/tests/MemoryScanning'
import PictureRecognition from '@/tests/PictureRecognition'
import DigitVigilance from '@/tests/DigitVigilance'
import WorkingMemory from '@/tests/WorkingMemory'
import MotorFunction from '@/tests/MotorFunction'
import WordRecognition from '@/tests/WordRecognition'
import Tests from '@/screens/Tests'
import Login from '@/login/Login'
import Signup from '@/login/Signup'
import MainPage from '@/screens/MainPage'
import Profile from '@/login/Profile'
import Connect from '@/database/Connect'


export default function Home() {

  const main_class = ["flex min-h-screen flex-col items-center justify-between p-24"
, "flex min-h-screen flex-col items-center justify-between p-24 h-[100%] w-[100%]  relative"]
  const [MainClass, setMainClass] = React.useState(main_class[0])

  const link_class = ["text-blue-600 cursor-pointer", "text-gray-600 font-bold underline cursor-pointer", "text-gray-400"]
  const [HomeClass, setHomeClass] = React.useState(link_class[1])
  const [TestClass, setTestClass] = React.useState(link_class[0])
  const [SignupClass, setSignupClass] = React.useState(link_class[0])
  const [LoginClass, setLoginClass] = React.useState(link_class[0])
  const [ProfileClass, setProfileClass] = React.useState(link_class[0])

  const classes = [setHomeClass, setTestClass, setSignupClass, setLoginClass, setProfileClass]

  const [ShowHome, setShowHome] = React.useState(true)
  const [ShowTestInfo, setShowTestInfo] = React.useState(false)
  const [ShowSignup, setShowSignup] = React.useState(false)
  const [ShowLogin, setShowLogin] = React.useState(false)
  const [ShowProfile, setShowProfile] = React.useState(false)

  const screens = [setShowHome, setShowTestInfo, setShowSignup, setShowLogin, setShowProfile]

  const [LoggedIn, setLoggedIn] = React.useState(false)
  const [ShowPopover, setShowPopover] = React.useState(false)
  const [ShowChoiceReaction, setShowChoiceReaction] = React.useState(false)
  const [ShowDigitVigilance, setShowDigitVigilance] = React.useState(false)
  const [ShowMemoryScanning, setShowMemoryScanning] = React.useState(false)
  const [ShowMotorFunction, setShowMotorFunction] = React.useState(false)
  const [ShowNumberVigilance, setShowNumberVigilance] = React.useState(false)
  const [ShowPictureRecognition, setShowPictureRecognition] = React.useState(false)
  const [ShowReactionTime, setShowReactionTime] = React.useState(false)
  const [ShowVerbalLearning, setShowVerbalLearning] = React.useState(false)
  const [ShowWordRecognition, setShowWordRecognition] = React.useState(false)
  const [ShowWorkingMemory, setShowWorkingMemory,] = React.useState(false)
  const [ProfileDisabled, setProfileDisabled] = React.useState(true)
  const [LoginDisabled, setLoginDisabled] = React.useState(true)
  const [Username, setUsername] = React.useState("")

  //placeholder only. will improve security.
  const [Password, setPassword] = React.useState("")
  const [TestID, setTestID] = React.useState(0)
  const [TestTitle, setTestTitle] = React.useState("")
  const [PopoverMessage, setPopoverMessage] = React.useState("")


  useEffect(() => {

    LoggedIn ? link_handler(4) : link_handler(0)

  }, [LoggedIn])

  function toggle_login(condition: any){
    setLoggedIn(condition)
    if(!condition){
      setUsername("")
      setPassword("")
    } 
  }

  function link_handler(place: any){
    clear_tests()
    setTestID(0)
    set_classes(place)
    set_screens(place)
  }

  function hide_popover(){
    setShowPopover(false)
    setMainClass(main_class[0])
    setPopoverMessage("")
    setTestTitle("")
  }

  function set_classes(link: any){
    for(var i=0; i < classes.length; i++){
      i != link ? classes[i](link_class[0]) : classes[i](link_class[1])
    }
  }

  function set_screens(link: any){
    for(var i=0; i < screens.length; i++){
      i != link ? screens[i](false) : screens[i](true)
    }
  }

  function clear_tests(){
    var test_types = [        
      setShowChoiceReaction, setShowDigitVigilance, setShowMemoryScanning, setShowMotorFunction, setShowNumberVigilance, setShowPictureRecognition,setShowReactionTime, setShowVerbalLearning, setShowWordRecognition,setShowWorkingMemory
    ]

    for(var i=0; i<test_types.length; i++){
      test_types[i](false)
    }
  }

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
        setShowVerbalLearning(true)
        break
      case 9:
        setShowWordRecognition(true)
        break
      case 10:
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
          <Connect/>
        </div>

        <div className="mt-24">
          {/* HOME */}
          {ShowHome ? 
            <MainPage/>  
          : null}

          {/* TEST INFO */}
          {ShowTestInfo ?
            <Tests setMainClass={setMainClass} main_class={main_class} setShowPopover={setShowPopover} setPopoverMessage={setPopoverMessage} setTestTitle={setTestTitle} setTestID={setTestID}/>
          : null}

          {ShowChoiceReaction ?
            <ChoiceReaction/>
          : null}

          {ShowDigitVigilance ?
            <DigitVigilance/>
          : null}

          {ShowMemoryScanning ?
            <MemoryScanning/>
          : null}
        
          {ShowMotorFunction ?
            <MotorFunction/>
          : null}

          {ShowNumberVigilance ?
            <NumberVigilance/>        
          :null}

          {ShowPictureRecognition ?
            <PictureRecognition/>        
          :null}

          {ShowReactionTime ?
            <ReactionTime/>        
          :null}

          {ShowVerbalLearning ?
            <VerbalLearning/>        
          :null}

          {ShowWordRecognition ?
            <WordRecognition/>        
          :null}

          {ShowWorkingMemory ?
            <WorkingMemory/>        
          :null}


          {/* SIGNUP */}
          {ShowSignup ?
            <Signup/>
          : null}

          {/* LOGIN */}
          {ShowLogin ?
            <Login setLoggedIn={setLoggedIn} setUsername={setUsername} setPassword={setPassword}/>
          : null}

          {/* PROFILE */}
          {ShowProfile ?
            <Profile LoggedIn={LoggedIn} Username={Username} Password={Password}/>
          : null}

        </div>
      </div>


      {ShowPopover ?
        <div className="w-full h-full flex justify-center items-center absolute top-0 z-2 bg-black opacity-65">
        </div>
      : null}

      {ShowPopover ?
        <div className="h-[50%] w-[30%] z-99 absolute top-[10%] left-[35%] bg-blue-400 rounded-2xl text-white">
          <div className="p-12 grid grid-auto-rows">
            <div className="text-3xl">
                {TestTitle}
            </div>
            <div className="mt-[15%] text-xl">
                {PopoverMessage}
            </div>
            <div className="w-full absolute bottom-48 underline cursor-pointer text-2xl" onClick={e => take_test()}>
              Take Test
            </div>
            <div className="w-full absolute bottom-12 underline cursor-pointer" onClick={e => hide_popover()}>
              Close
            </div>
          </div>
        </div>
      : null}


      


    </main>

  )
}
