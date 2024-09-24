
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

  return temp_arr
}


function get_average(answers: any, time_value=0, base_level: any = null){
  var total_avg = 0
  var temp_avg = 0
  var test_arr = []
  var length = 0
  for(var i=0; i < answers.length; i++){
    temp_avg = 0
    for(var j=0; j < answers[i].length; j++){
      temp_avg += answers[i][j]
      length++
    }
    test_arr.push(temp_avg/answers[i].length)
    total_avg += temp_avg/answers[i].length
  }

  !Array.isArray(answers) ? total_avg = Math.round(answers / Math.round(time_value/60)) : !Array.isArray(answers[0]) ? total_avg = total_avg/answers.length : total_avg = total_avg/answers[0].length

  total_avg < base_level ? total_avg = base_level : null

  return total_avg
}


function duplicate_answers(answers: any, interval: any = null){
  var temp_data: any = []
  for(var i =0; i<answers.length; i++){
    temp_data.push(answers[i])
  }
  interval ? temp_data = answers : null

  return temp_data
}


//used to indicate the consistency of a user's answers. an average is established based on all responses given. then the responses are divided into intervals. interval averages are then calculated and compared against the overall average. the more interval averages that are greater or equal to the overall average, the stronger the attention rating. 
function calculate_attention(interval: any, answers: any, time: any, proficiency: any, greater=true, possible: any = null){
  console.log(answers)
  var periods: any = Math.round(answers.length/time)
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
  var original_answers: any = interval == "time" ? duplicate_answers(answers, true) : duplicate_answers(answers)

  !Array.isArray(answers[0]) && interval != "time" ? answers = create_answers(answers, time) : null
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

  interval == "time" ? total = answers : null

  interval_avg = interval == "time" ? get_average(answers, time, Math.round(Math.round(proficiency/time) * .5)) : get_average(answers, 0, .5)

  greater ? deviation = Math.round((interval_avg - (interval_avg * .2)) * 100) / 100 : deviation = Math.round((interval_avg + (interval_avg * .2)) * 100) / 100
  bonus_range = Math.round(possible ? possible * 1.2 : proficiency * 1.2)
  penalty_range = Math.round(proficiency * .5)

  if(Array.isArray(interval_arr[0])){
    for(let j=0; j<interval_arr.length; j++){
      let sum = 0
      for(let k=0; k<interval_arr[j].length; k++){
        sum = sum + interval_arr[j][k]
      }
      greater ? sum/interval_arr[j].length >= deviation ? score++ : null : sum/interval_arr[j].length <= deviation ? score++ : null    
    }
  }else{
    for(let i=0; i<interval_arr.length; i++){
      greater ? interval_arr[i] >= deviation ? score++ : null : interval_arr[i] <= deviation ? score++ : null
    }
  }

  console.log("score")
  console.log(score)

  console.log("bonus range")
  console.log(bonus_range)

  score = interval == "time" ? answers : score

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

  strong = interval != "time" ? periods >= 5 ? Math.round(periods * .8) : 3 : Math.round(Math.round(time/60) * Math.round(possible / Math.round(time/60)) * .9) 
  average = interval != "time" ? periods >= 5 ? Math.round(periods * .6) : 2 : Math.round(strong * .75)
  poor = interval != "time" ? periods >= 5 ? Math.round(periods * .4) : 1 : Math.round(strong * .5)

  if(score >= strong){
    rating = "strong"
  }

  if(score >= average && score < strong){
    rating = "average"
  }

  if(score < average){
    rating = "poor"
  }

  return {"interval": interval, "answers": temp_answers, "sections": interval_arr, "time": time, "periods": periods, "interval_avg": interval_avg, "total": total, "deviation": deviation, "bonus_range": bonus_range, "bonus": bonus, "penalty_range": penalty_range, "penalty": penalty, "score": score, "rating": rating, "attributes": {"strong": strong, "average": average, "poor": poor}, "proficiency": proficiency, "original_answers": original_answers, "possible": possible}
}


function calculate_decisiveness(answers: any, time_value: any = null, per_minute: any = null, possible: any = null){
  var high = .9
  var low = .7
  var total = 0 
  var percentage = 0
  var rating = "poor"

  for(let i=0; i<answers.length; i++){
    total = total + answers[i]
  }

  time_value ? total = answers : null

  percentage = !time_value ? Math.round((total/answers.length) * 100) / 100 : total/((Math.round(time_value/60) * per_minute)) 

  time_value ? answers = possible ? possible : Math.round(time_value/60) * per_minute : answers = answers.length

  if(percentage >= high){
    rating = "strong"
  }

  if(percentage >= low && percentage < high){
    rating = "average"
  } 
  
  return {"answers": answers, "total": total, "percentage": percentage, "rating": rating, "time_value": time_value, "per_minute": per_minute, "possible": possible, "attributes": {"strong": high, "average": low + .01, "poor": low}}
}


//not needed in:
//digit vigilance, number vigilance
//times: array of answer times. length is total number of test questions/sections.
//measure: the measuring point of if an answer is fast or slow
//sections: is there a running clock or an answer based timer?
function calculate_speed(times: any, measure: any, sections=true, per_minute: any = null, possible: any = null){
  console.log(times)
  var score = 0
  var proficiency = sections ? Math.round(times.length * .7) : Math.round(measure/60) * per_minute
  var bonus_range = Math.round(proficiency * 1.2)
  var bonus = false
  var penalty_range = Math.round(proficiency * .5)
  var penalty = false
  var low = sections ? Math.round(times.length * .5) : Math.round(measure / 60) * Math.round(per_minute * .5) 
  var high = sections ? Math.round(times.length * .9) : Math.round(measure / 60) * Math.round(per_minute * .9) 
  var rating = "poor"

  if(sections){
    for(var i=0; i<times.length; i++){
      times[i] <= measure ? score++ : null
    }
  }else{
    for(var i=0; i<times.length; i++){
      score = score + times[i] 
    }
  }

  !sections ? score = times : null

  if(score >= bonus_range){
    sections ? score++ : score += Math.ceil(proficiency * .05)
    bonus = true
  }

  if(score <= penalty_range){
    sections ? score-- : score -= Math.ceil(proficiency * .05)
    penalty = true
  }

  if(score >= high){
    rating = "strong"
  }

  if(score > low && score < high){
    rating = "average"
  } 

  return {"answers": times, "bonus": bonus, "bonus_range": bonus_range, "penalty": penalty, "penalty_range": penalty_range, "high": high, "low": low, "score": score, "proficiency": proficiency, "rating": rating, "measure": measure, "possible": possible, "per_minute": per_minute}
}

export const analysis = {"attention": calculate_attention, "decisiveness": calculate_decisiveness, "speed": calculate_speed}