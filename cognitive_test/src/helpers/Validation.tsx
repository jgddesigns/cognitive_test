function validate_username(value: any){
  if(value.length < 4){
    return false
  }
  return true
}


function validate_name(value: any){
  if(value.length < 2){
    return false
  }
  return true
}


function validate_email(value: any){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!re.test(value)){
      return false
    }
    return true
}


function validate_password(text: any){
  var num = false
  var letter = false

  for(var i=0; i<text.length; i++){
      if(isNaN(text[i])){
          console.log("letter")
          letter = true
      }else{
          console.log("number")
          num = true
      }    
  }

  return [letter, num, text.length]
}


function validate_confirm(value: any){
  if(value.length != 6){
    return false
  }
  return true
}




export const validate = {"username": validate_username, "name": validate_name, "email": validate_email, "password": validate_password, "confirm": validate_confirm}

