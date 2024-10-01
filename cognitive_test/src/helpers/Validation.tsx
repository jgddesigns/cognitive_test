// Checks for an acceptable username string
// @param 'value': The string entered in the username field
// @return boolean: False if less than 4 characters in length, true if otherwise
function validate_username(value: any){
  if(value.length < 4){
    return false
  }
  return true
}

// Checks for an acceptable name string
// @param 'value': The string entered in the name field
// @return boolean: False if less than 2 characters in length, true if otherwise
function validate_name(value: any){
  if(value.length < 2){
    return false
  }
  return true
}

// Checks for an acceptable email string
// @param 'value': The string entered in the email field
// @return boolean: False if the string does not meet regex settings (example@email.com), true if otherwise
function validate_email(value: any){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!re.test(value)){
      return false
    }
    return true
}

// Checks for an acceptable password string
// @param 'value': The string entered in the password field
// @return boolean: False if less than 4 characters in length, true if otherwise
function validate_password(value: any){
  var num = false
  var letter = false

  for(var i=0; i<value.length; i++){
      if(isNaN(value[i])){
          letter = true
      }else{
          num = true
      }    
  }

  return [letter, num, value.length]
}


function validate_confirm(value: any){
  if(value.length != 6){
    return false
  }
  return true
}




export const validate = {"username": validate_username, "name": validate_name, "email": validate_email, "password": validate_password, "confirm": validate_confirm}

