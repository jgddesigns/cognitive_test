import { arrayBuffer } from "stream/consumers"

var ratings = {attention: "", decisiveness: "", speed: ""}
var stats = {time_interval: "", interval_answers: [], interval_average: ""} 


function create_answers(answers: any, time: any){
  var temp_answers: any = []
  var temp_arr: any = []
  var length = Math.round(answers.length/time)
  for(var i=0; i < length; i++){
    temp_answers = []
    for(var  j=0; j < time; j++){
      temp_answers.push(answers[j])
    }
    temp_arr.push(temp_answers)
    answers.splice(0, time)
  }

  if(answers.length > 0){
    for(var k=0; k < answers.length; k++){
      temp_arr[length - 1].push(answers[k])
    }
  }
  console.log(temp_arr)
  return temp_arr
}

function get_average(answers: any){
  var total_avg = 0
  var temp_avg = 0
  var test_arr = []
  for(var i=0; i < answers.length; i++){
    temp_avg = 0
    for(var j=0; j < answers[i].length; j++){
      temp_avg += answers[i][j]
    }
    test_arr.push(temp_avg/answers[i].length)
    total_avg += temp_avg/answers[i].length
  }

  total_avg = total_avg/answers.length

  console.log("total avg")
  console.log(test_arr)
  console.log(total_avg)
  return total_avg
}

//used to indicate the consistency of a user's answers. an average is established based on all responses given. then the responses are divided into intervals. interval averages are then calculated and compared against the overall average. the more interval averages that are greater or equal to the overall average, the stronger the attention rating. 
function calculate_attention(interval: any, answers: any, time: any, proficiency: any, greater=true){
  var periods: any = answers.length/time
  var interval_avg: any = null
  var total: any = null
  var deviation: any = null
  var bonus_range: any = null
  var bonus = false
  var penalty_range: any = null
  var penalty = false
  var score: any = 0
  var strong: any = 0
  var average: any = 0
  var poor: any = 0
  var rating: any = null
  // var interval_arr: any = []
  !Array.isArray(answers[0]) ? answers = create_answers(answers, time) : null
  var interval_arr: any = answers
  var temp_answers = answers

  if(interval == "seconds"){
    periods = time * 60
  }

  if(interval == "sections" || interval == "minutes" || interval == "time"){
    periods = time
  }

  if(!Array.isArray(answers[0])){
    for(let i=0; i<answers.length; i++){
      total = total + answers[i]
    }
  }else{
    for(let i=0; i<answers.length; i++){
      for(let j=0; j<answers[i].length; j++){
        total = total + answers[i][j]
      }
    }    
  }


  // interval_avg = Math.round((total/periods) * 100) / 100
  interval_avg = get_average(answers)

  greater ? deviation = Math.round((interval_avg - (interval_avg * .2)) * 100) / 100 : deviation = Math.round((interval_avg + (interval_avg * .2)) * 100) / 100
  bonus_range = Math.round(proficiency * 1.2)
  penalty_range = Math.round(proficiency * .5)

  // if(!Array.isArray(answers[0]) && interval == "sections"){
  //   for(let j=0; j<periods; j++){
  //     let temp_arr = []
  //     for(let k=0; k<time; k++){
  //       temp_arr.push(answers[k])
  //       temp_answers.push(answers[k])
  //     }
  //     answers.splice(0, time)
  //     interval_arr.push(temp_arr)
  //   }
  // }else{
  //   interval_arr = answers
  // }

  if(Array.isArray(interval_arr[0])){
    for(let j=0; j<interval_arr.length; j++){
      let sum = 0
      for(let k=0; k<interval_arr[j].length; k++){
        // j == interval_arr.length - 1 ? console.log(interval_arr) : null
        sum = sum + interval_arr[j][k]
      }
      console.log("sum")
      console.log(sum)
      greater ? sum/interval_arr[j].length >= deviation ? score++ : null : sum/interval_arr[j].length <= deviation ? score++ : null    
    }
  }else{
    for(let i=0; i<interval_arr.length; i++){
      greater ? interval_arr[i] >= deviation ? score++ : null : interval_arr[i] <= deviation ? score++ : null
    }
  }

    console.log(score)

  if(greater){
    if(total >= bonus_range){
      score++ 
      bonus = true
    } 
    if(total < penalty_range){
      score-- 
      penalty = true
    }
  }else{
    if(total >= bonus_range){
      score-- 
      penalty = true
    } 
    if(total < penalty_range){
      score++ 
      bonus = true
    }
  }




  strong = Math.round(periods * .8)
  average = Math.round(periods * .6)
  poor = Math.round(periods * .4)

  if(score >= strong){
    rating = "strong"
  }

  if(score >= average && score < strong){
    rating = "average"
  }

  if(score < average){
    rating = "poor"
  }


  return {"interval": interval, "answers": temp_answers, "sections": interval_arr, "time": time, "periods": periods, "interval_avg": interval_avg, "total": total, "deviation": deviation, "bonus_range": bonus_range, "bonus": bonus, "penalty_range": penalty_range, "penalty": penalty, "score": score, "rating": rating, "attributes": {"strong": strong, "average": average, "poor": poor}, "proficiency": proficiency}
}


function calculate_decisiveness(answers: any){
  var high = .9
  var low = .7
  var total = 0 
  var percentage = 0
  var rating = "poor"

  for(let i=0; i<answers.length; i++){
    total = total + answers[i]
  }

  percentage = Math.round((total/answers.length) * 100) / 100 

  if(percentage >= high){
    rating = "strong"
  }

  if(percentage >= low && percentage < high){
    rating = "average"
  } 
  
  return {"answers": answers, "total": total, "percentage": percentage, "rating": rating}
}


function calculate_speed(answers: any, high: any, low: any, time: any = null){
  var score = 0
  var average = 0
  var rating = "poor"

  for(let i=0; i<answers.length; i++){
    score = score + answers[i]
  }

  if(time){
    average = Math.round((answers.length/time) * 100) / 100
  }else{
    average = Math.round((score/answers.length) * 100) / 100
  }

  if(average <= low){
    rating = "strong"
  }

  if(average >= low && average < high){
    rating = "average"
  } 

  return {"answers": answers, "high": high, "low": low, "score": score, "average": average, "rating": rating}
}

export const analysis = {"create_answers": create_answers, "attention": calculate_attention, "decisiveness": calculate_decisiveness, "speed": calculate_speed}