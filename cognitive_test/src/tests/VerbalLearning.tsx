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

    const [OriginalWords, setOriginalWords] = React.useState(null)
    const [KeptWords, setKeptWords] = React.useState(null)
    const [NextWords, setNextWords] = React.useState(null)

    const [OriginalSet, isOriginalSet] = React.useState(false)
    const [KeptSet, isKeptSet] = React.useState(false)
    const [NextSet, isNextSet] = React.useState(false)

    useEffect(() => {
        if(!OriginalSet){
            original_words(wordArray, [])
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


    function original_words(word_bank: any, arr:any){
        var place = Math.floor(Math.random() * (word_bank.length + 1))

        if(arr.length < 12){
            arr.push(word_bank[place])
            word_bank.splice(place, 1)
            original_words(word_bank, arr)
        }else{
            toggle_original(arr)
        }
    }


    function toggle_original(arr: any){
        if(arr.length > 0){
            console.log("=====ORIGINAL WORDS ARRAY=====")
            console.log(arr)
            console.log("")
            setOriginalWords(arr)
            isOriginalSet(true)
        }else{
            isOriginalSet(false)
        }
    }


    function kept_words(word_bank: any, count: any, arr: any){
        if(!count){
            count = 8 - (Math.floor(Math.random() * .6 * 10))
        }

        var place = Math.floor(Math.random() * (word_bank.length) + 1) - 1

        arr.push(word_bank[place])
        word_bank.splice(place+1, 1)
        count--
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

        if(arr.length < 12){
            arr.push(word_bank[place])
            word_bank.splice(place, 1)
            next_words(word_bank, arr)
        }else{
            console.log(arr)
            shuffle_next(arr, [])
            
        }
    }

    function shuffle_next(word_bank: any, arr: any){
        var place = (word_bank.length-1) - (Math.floor(Math.random() * word_bank.length)) 


        if(arr.length < 12){
            arr.push(word_bank[place])
            word_bank.splice(place, 1)
            shuffle_next(word_bank, arr)
        }else{
            toggle_next(arr)
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
    
      
  return(
    <div>
        <div className="row">
            TEST #1: VERBAL LEARNING TEST
        </div>
        <div className="row mt-12 text-sky-400">
            A series of twelve words will be shown on the screen for three seconds each. Afterward, twelve words will be shown again. While each is shown, decide if it was in the original sequence.
        </div>
    </div>
  )

}

  