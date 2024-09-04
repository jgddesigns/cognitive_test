var ratings = {attention: "", decisiveness: "", speed: ""}
var stats = {time_interval: "", interval_answers: [], interval_average: ""} 


function calculate_attention(interval: any, answers: any, time: any, proficiency: any){
  var periods: any = time
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

  if(interval == "seconds"){
    periods = time * 60
  }

  for(let i=0; i<answers.length; i++){
    total = total + answers[i]
  }

  interval_avg = Math.round(total/periods)

  deviation = interval_avg - Math.round(interval_avg * .2)
  bonus_range = Math.round(proficiency * 1.2)
  penalty_range = Math.round(proficiency * .5)

  for(let j=0; j<answers.length; j++){
    answers[j] >= deviation ? score++ : null
  }

  if(total >= bonus_range){
    score++
    bonus = true
  } 

  if(total < penalty_range){
    score--
    penalty = true
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


  return {"interval": interval, "answers": answers, "time": time, "periods": periods, "interval_avg": interval_avg, "total": total, "deviation": deviation, "bonus_range": bonus_range, "bonus": bonus, "penalty_range": penalty_range, "penalty": penalty, "score": score, "rating": rating, "attributes": {"strong": strong, "average": average, "poor": poor}, "proficiency": proficiency}
}


function calculate_decisiveness(answers: any, proficiency: any){
  var high = .9
  var low = .7
  var score = 0 
  var percentage = 0
  var rating = "poor"

  for(let i=0; i<answers.length; i++){
    score = score + answers[i]
  }

  percentage = Math.round((score/proficiency) * 100) / 100 

  if(percentage >= high){
    rating = "strong"
  }

  if(percentage >= low && percentage < high){
    rating = "average"
  } 
  
  return {"answers": answers, "score": score, "percentage": percentage, "rating": rating, "proficiency": proficiency}
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

export const analysis = {"attention": calculate_attention, "decisiveness": calculate_decisiveness, "speed": calculate_speed}