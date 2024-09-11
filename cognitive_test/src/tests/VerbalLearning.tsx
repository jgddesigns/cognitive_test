// Import AWS SDK and configure
'use client'
import AWS from 'aws-sdk';
import React, {useEffect} from 'react';
import {Button, ButtonGroup} from "@nextui-org/react"
import { addAbortListener } from 'events';



export default function VerbalLearning (props: any) {

    //FROM CHAT GPT (REMOVE DUPLICATES)
    const wordArray = [
        'hello', 'goodbye', 'please', 'thank you', 'sorry', 'yes', 'no', 'maybe', 'help', 'friend',
        'family', 'home', 'work', 'school', 'food', 'drink', 'eat', 'drink', 'sleep', 'play',
        'read', 'write', 'listen', 'talk', 'watch', 'buy', 'sell', 'happy', 'sad', 'angry',
        'love', 'hate', 'fun', 'boring', 'exciting', 'tired', 'busy', 'free', 'weekend', 'morning',
        'afternoon', 'evening', 'night', 'today', 'tomorrow', 'yesterday', 'now', 'later', 'early',
        'late', 'here', 'there', 'where', 'when', 'why', 'how', 'what', 'who', 'which', 'because',
        'but', 'and', 'or', 'if', 'because', 'maybe', 'always', 'never', 'sometimes', 'soon',
        'nowadays', 'often', 'rarely', 'together', 'alone', 'big', 'small', 'fast', 'slow', 'hot',
        'cold', 'happy', 'sad', 'angry', 'funny', 'serious', 'young', 'old', 'new', 'old', 'first',
        'last', 'next', 'previous', 'high', 'low', 'good', 'bad', 'better', 'worse', 'easy', 'difficult',
        'beautiful', 'ugly', 'clean', 'dirty', 'cheap', 'expensive', 'simple', 'complicated', 'early', 'late',
        'empty', 'full', 'hard', 'soft', 'light', 'heavy', 'long', 'short', 'quiet', 'loud',
        'smooth', 'rough', 'thick', 'thin', 'wide', 'narrow', 'safe', 'dangerous', 'strong', 'weak',
        'bright', 'dark', 'deep', 'shallow', 'happy', 'sad', 'wide', 'narrow', 'true', 'false',
        'free', 'busy', 'certain', 'uncertain', 'true', 'false', 'right', 'wrong', 'alive', 'dead',
        'calm', 'stormy', 'capable', 'incapable', 'clean', 'dirty', 'deep', 'shallow', 'empty', 'full',
        'excited', 'bored', 'friendly', 'unfriendly', 'healthy', 'unhealthy', 'innocent', 'guilty', 'known', 'unknown',
        'lucky', 'unlucky', 'mature', 'immature', 'nervous', 'calm', 'patient', 'impatient', 'polite', 'rude',
        'practical', 'impractical', 'proud', 'ashamed', 'quiet', 'loud', 'reasonable', 'unreasonable', 'rich', 'poor',
        'simple', 'complicated', 'successful', 'unsuccessful', 'tall', 'short', 'thick', 'thin', 'victorious', 'defeated',
        'warm', 'cold', 'wise', 'foolish', 'young', 'old', 'zealous', 'apathetic', 'independent', 'dependent',
        'efficient', 'inefficient', 'generous', 'stingy', 'honest', 'dishonest', 'just', 'unjust', 'kind', 'unkind',
        'modest', 'immodest', 'optimistic', 'pessimistic', 'reliable', 'unreliable', 'sincere', 'insincere', 'tolerant', 'intolerant',
        'unique', 'common', 'valuable', 'worthless', 'wild', 'tame', 'young', 'old', 'vibrant', 'dull',
        'fresh', 'stale', 'brave', 'cowardly', 'curious', 'indifferent', 'eager', 'reluctant', 'flexible', 'inflexible',
        'grateful', 'ungrateful', 'innovative', 'conventional', 'jovial', 'melancholic', 'keen', 'apathetic', 'loyal', 'disloyal',
        'meticulous', 'careless', 'noble', 'ignoble', 'observant', 'unobservant', 'patient', 'impatient', 'rational', 'irrational',
        'resourceful', 'unresourceful', 'sympathetic', 'unsympathetic', 'trustworthy', 'untrustworthy', 'adventurous', 'cautious', 'ethical', 'unethical',
        'modest', 'immodest', 'reliable', 'unreliable', 'sincere', 'insincere', 'tolerant', 'intolerant', 'unique', 'common',
        'valuable', 'worthless', 'wild', 'tame', 'youthful', 'aged', 'zestful', 'lethargic', 'apt', 'inept',
        'bold', 'timid', 'chaste', 'promiscuous', 'diligent', 'lazy', 'earnest', 'casual', 'flexible', 'rigid',
        'genuine', 'counterfeit', 'humble', 'arrogant', 'just', 'unjust', 'kind', 'unkind', 'modest', 'immodest',
        'noble', 'ignoble', 'observant', 'unobservant', 'patient', 'impatient', 'rational', 'irrational', 'resourceful', 'unresourceful',
        'sympathetic', 'unsympathetic', 'trustworthy', 'untrustworthy', 'adventurous', 'cautious', 'ethical', 'unethical', 'pragmatic', 'idealistic',
        'reserved', 'outgoing', 'thrifty', 'extravagant', 'understanding', 'incomprehensible', 'vivacious', 'dull', 'zealous', 'apathetic',
        'witty', 'humorless', 'affectionate', 'aloof', 'engaging', 'distant', 'forgiving', 'resentful', 'genuine', 'fake',
        'honest', 'deceptive', 'joyful', 'melancholic', 'lively', 'lifeless', 'optimistic', 'pessimistic', 'radiant', 'dreary',
        'serene', 'turbulent', 'tranquil', 'chaotic', 'upbeat', 'downbeat', 'vibrant', 'dull', 'wholesome', 'corrupt',
        'youthful', 'aged', 'zealous', 'apathetic', 'assertive', 'submissive', 'brave',
    ];

    const [OriginalWords, setOriginalWords] = React.useState([])
    const [EndWords, setEndWords] = React.useState([])
    const [MemoryWords, setMemoryWords] = React.useState([])
    const [KeptWords, setKeptWords] = React.useState([])
    const [NextWords, setNextWords] = React.useState([])
    const [DisplayWord, setDisplayWord] = React.useState("")
    const [OriginalSet, isOriginalSet] = React.useState(false)
    const [KeptSet, isKeptSet] = React.useState(false)
    const [NextSet, isNextSet] = React.useState(false)
    const [StartButton, setStartButton] = React.useState(true)
    const [StartPrompt, setStartPrompt] = React.useState(false)
    const [StartWords, setStartWords] = React.useState(false)
    const [StartTest, setStartTest] = React.useState(false)
    const [TimerDisplay, setTimerDisplay] = React.useState(0)
    const [EndCount, setEndCount] = React.useState(0)
    const [WordCount, setWordCount]= React.useState(12)
    const [NextWordCount, setNextWordCount]= React.useState(13)
    const [StartMemory, setStartMemory] = React.useState(false)
    const [YesWords, setYesWords] = React.useState([])
    const [NoWords, setNoWords] = React.useState([])
    const [Continue, setContinue] = React.useState(false)
    const [End, setEnd] = React.useState(false)
    const [YesString, setYesString] = React.useState("") 
    const [NoString, setNoString] = React.useState("") 
    const [OriginalString, setOriginalString] = React.useState("") 
    const [Correct, setCorrect] = React.useState(0)
    const [Score, setScore] = React.useState(0) 
    const [ScoreString, setScoreString] = React.useState("") 

    const list_length = 12

    useEffect(() => {
        if(!OriginalSet){
            original_words(wordArray, [], [], [])
        }   
    }, [OriginalSet])


    useEffect(() => {
        if(OriginalSet){
            kept_words(OriginalWords, null, [])
        }
    }, [OriginalSet])


    useEffect(() => {
        if(KeptSet){
            next_words(wordArray, KeptWords)
        }
    }, [KeptSet])


    useEffect(() => {
        while(StartTest && TimerDisplay > 0){
            var time = TimerDisplay - 1 
            const timeoutId = setTimeout(() => {
            setTimerDisplay(time)
            if(time < 1){
                setEndCount(3)
            } 
            }, 1000);
            if(TimerDisplay < 1){
                setEndCount(1)
            } 
            return () => clearTimeout(timeoutId);
        }
      }, [TimerDisplay]); 


    useEffect(() => {
        while(EndCount > 0){
            var time = EndCount - 1 
            const timeoutId = setTimeout(() => {
            setEndCount(time)
            }, 1000);
            if(time < 1){
                setStartTest(false)
                setStartWords(true)
            } 
            return () => clearTimeout(timeoutId);
        }
    }, [EndCount, StartWords]); 


    useEffect(() => {
        while(StartWords){
            var count = WordCount - 1
            const timeoutId = setTimeout(() => {
                if(count >= 0){
                    setDisplayWord(set_original_word())
                    setWordCount(count)
                }else{
                    setStartWords(false)
                    setContinue(true)
                }
            }, 3000);
            console.log(MemoryWords)

            return () => clearTimeout(timeoutId);
        }
    }, [StartWords, WordCount]); 


    function original_words(word_bank: any, original_arr:any, memory_arr: any, end_arr: any){
        var place = Math.floor(Math.random() * (word_bank.length + 1))

        if(original_arr.length < list_length){
            if(!original_arr.includes(word_bank[place]) && word_bank[place]){
                original_arr.push(word_bank[place])
                memory_arr.push(word_bank[place])
                end_arr.push(word_bank[place])
                word_bank.splice(place, 1)
            }
            original_words(word_bank, original_arr, memory_arr, end_arr)
        }else{
            toggle_original(original_arr, memory_arr, end_arr)
        }
    }


    function toggle_original(original_arr: any, memory_arr: any, end_arr: any){
        if(original_arr.length > 0){
            console.log("=====ORIGINAL WORDS ARRAY=====")
            console.log(original_arr)
            console.log("")
            setOriginalWords(original_arr)
            setMemoryWords(memory_arr)
            setEndWords(end_arr)
            isOriginalSet(true)
        }else{
            isOriginalSet(false)
        }
    }


    function kept_words(word_bank: any, count: any, arr: any){
        if(!count){
            count = Math.floor(list_length * .75) - (Math.floor(Math.random() * .6 * 10))
        }

        var place = Math.floor(Math.random() * (word_bank.length) + 1) - 1

        if(!arr.includes(word_bank[place])){
            arr.push(word_bank[place])
            word_bank.splice(place+1, 1)
            count--
        }
        count > 0 ? kept_words(word_bank, count, arr) : toggle_kept(arr)
    }


    function toggle_kept(arr: any){
        if(arr.length > 0){
            console.log("=====KEPT WORDS ARRAY=====")
            console.log(arr)
            console.log("")
            setKeptWords(arr)
            isKeptSet(true)
        }else{
            isKeptSet(false)
        }
    }


    function next_words(word_bank: any, arr: any){
        var place = Math.floor(Math.random() * (word_bank.length + 1))

        if(arr.length < list_length){
            if(!arr.includes(word_bank[place]) && word_bank[place]){
                arr.push(word_bank[place])
                word_bank.splice(place, 1)
            }
            next_words(word_bank, arr)
        }else{
            toggle_next(arr)
            console.log(arr)       
        }
    }


    function toggle_next(arr: any){
        if(arr.length > 0){
            console.log("=====NEXT WORDS ARRAY=====")
            console.log(arr)
            console.log("")
            setNextWords(arr)
            
            isNextSet(true)
        }else{
            isNextSet(false)
        }
    }


    function set_start(){
        setStartButton(false)
        toggle_prompt()
    }


    function toggle_prompt(){
        setStartPrompt(!StartPrompt)
    }


    function toggle_test(){
        setTimerDisplay(5)
        setStartPrompt(!StartPrompt)
        setStartTest(!StartTest)
    }


    function set_original_word(){
        var word_bank: any = []
        MemoryWords ? word_bank = MemoryWords : word_bank = []
        var place = (word_bank.length-1) - (Math.floor(Math.random() * word_bank.length)) 

        var display_word = word_bank[place]
        console.log("display_word")
        console.log(display_word)
        word_bank.splice(place, 1)
        setMemoryWords(word_bank)

        return display_word
    }


    function set_next_word(){
        var word_bank: any = []
        NextWords ? word_bank = NextWords : word_bank = []
        var place = (word_bank.length-1) - (Math.floor(Math.random() * word_bank.length)) 

        var display_word = word_bank[place]
        console.log("display_word")
        console.log(display_word)
        word_bank.splice(place, 1)
        setNextWords(word_bank)

        return display_word
    }


    function start_memory(){
        setContinue(false)
        setStartMemory(true)
        show_memory()
    }

    function yes_word(){
        var arr: any = []
        arr = YesWords
        arr.push(DisplayWord)
        setYesWords(arr)
        show_memory()
    }


    function no_word(){
        var arr: any = []
        arr = NoWords
        arr.push(DisplayWord)
        setNoWords(arr)
        show_memory()
    }


    function show_memory(){
        var count = NextWordCount - 1
        setDisplayWord(set_next_word())
        setNextWordCount(count)


        if(count < 1){
            setStartMemory(false)
            setEnd(true)
            build_results()
        } 
    }
    
    function build_results(){
        var yes_string: any = ""
        var no_string: any = ""
        var comma = ""
        var original_string: any = ""
        var end_string: any = ""
        var correct = 0
        var score = 0

        for(var i=0; i<YesWords.length; i++){
            i < (YesWords.length-1) ? comma = ", " : comma = ""
            yes_string = yes_string + YesWords[i] + comma
        }
    
        for(var j=0; j<NoWords.length; j++){
            j < (NoWords.length-1) ? comma = ", " : comma = ""
            no_string = no_string + NoWords[j] + comma
        }

        for(var k=0; k<EndWords.length; k++){
            k < (EndWords.length-1) ? comma = ", " : comma = ""
            end_string = "<span style='color:red'>" + EndWords[k] + comma + "</span>"
            for(var l=0; l<YesWords.length; l++){
                if(EndWords[k] == YesWords[l]){
                    end_string = "<span style='color:#4ade80'>" + EndWords[k] + comma + "</span>"
                    correct++
                    l = YesWords.length
                }
            }
            original_string = original_string + end_string 
        }

        original_string = "<div>" + original_string + "</div>"
        score = Math.round(correct / list_length * 100)

        setYesString(yes_string)
        setNoString(no_string)
        setOriginalString(original_string)
        setCorrect(correct)
        setScore(score)
        setScoreString(score + "% Correct")
    }


    function reset_all(){
        setOriginalWords([])
        setEndWords([])
        setMemoryWords([])
        setKeptWords([])
        setNextWords([])
        setDisplayWord("")
        isOriginalSet(false)
        isKeptSet(false)
        isNextSet(false)
        setStartButton(true)
        setStartPrompt(false)
        setStartWords(false)
        setStartTest(false)
        setTimerDisplay(0)
        setEndCount(0)
        setWordCount(list_length)
        setNextWordCount(list_length + 1)
        setStartMemory(false)
        setYesWords([])
        setNoWords([])
        setContinue(false)
        setEnd(false)
        setYesString("") 
        setNoString("") 
        setOriginalString("") 
        setCorrect(0)
        setScore(0) 
        setScoreString("") 
    }

  return(
    <div>
        <div className="row">
            TEST #1: VERBAL LEARNING 
        </div>
        <div className="row mt-12 text-sky-400">
            A series of {list_length} words will be shown on the screen for three seconds each. Afterward, {list_length} words will be shown again. While each is shown, decide if it was in the original sequence.
        </div>
        <div className="mt-[200px]">
            {StartButton ? 
                <Button color="primary" className="text-sky-400 mt-4" onClick={set_start}>Start</Button> 
            : null}
            <div className="row">
                {StartPrompt ? 
                    <div>
                        <div>This will start the exercise. Be prepared to memorize all {list_length} words.</div>
                        <div className="row">
                            <div className="col-md-8 mt-4">
                                <div className="col-md-4">
                                    <Button color="primary" className="text-sky-400" onClick={toggle_test}>Okay</Button>
                                </div>
                                <div className="col-md-4">
                                        <Button color="primary" className="text-sky-400" onClick={toggle_prompt}>No</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                : null}

                {StartTest ? 
                    <div>
                        <div>Test starting in:</div>
                        <div className="row mt-4">
                            {TimerDisplay > 0 ? TimerDisplay : null}
                            {EndCount > 0 ? <div className="text-green-400">Start!</div> : null}
                        </div>
                    </div>
                : null}

                {StartWords ? DisplayWord : null}

                {Continue ? 
                    <div>
                        <div className="row">First Section Over</div>
                        <div className="row col-md-4">
                            <Button color="primary" className="mt-[200px] text-sky-400 col" onClick={start_memory}>Continue?</Button>
                        </div>
                    </div>   
                : null}

                {StartMemory ? 
                    <div>
                        <div className="row mt-4">
                            {DisplayWord} 
                        </div>
                        <div className="row mt-4">
                            In Original Sequence?
                        </div>
                        <div className="row mt-8">
                            <div className="col-md-8">
                                <div className="col-md-4">
                                    <Button color="primary" onClick={yes_word}>Yes</Button>
                                </div>
                                <div className="col-md-4">
                                    <Button color="primary" onClick={no_word}>No</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                : null}

                {End ?
                    <div> 
                        <div className="text-green-400">Memory Section Over. Your Choices:</div> 

                        <div className="row mt-12 underline underline-offset-2">In Original List</div>
                        <div className="row mt-4 ml-[10%]">{YesString}</div>

                        <div className="row mt-8 underline underline-offset-2">Not In Original List</div>
                        <div className="row mt-2 ml-[10%]">{NoString}</div>

                        <div className="row mt-8 underline underline-offset-2">Original List</div>
                        {/* Add DOM Purify Library */}
                        <div className="row mt-2 ml-[10%]" dangerouslySetInnerHTML={{ __html: OriginalString}}/>

                        <div className="row mt-16 underline underline-offset-2">Score</div>
                        <div className="row mt-4 ml-[10%]">{Correct} out of {list_length}</div>
                        <div className="row mt-2 ml-[10%]">{ScoreString}</div>
                        <Button className="mt-12 bg-yellow-400 rounded px-10 h-12 text-red-600" onClick={reset_all}>
                         Reset
                        </Button>
                    </div>
                : null}

            </div>
        </div>

    </div>
  )

}

  