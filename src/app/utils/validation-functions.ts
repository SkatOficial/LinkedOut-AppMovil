export function textValidaton(text:string): boolean{
  if(!text){
    return false
  }
  return true;
}

export function emailValidation(email: string): boolean {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  
  if (regex.test(email)){
    return true;
  }
  
  return false;
}

export function Passwordvalidation(password: string): any{
  let validations:any = {
    allOk: true,
    minLength : true,
    containsNumber:true,
    containsUpper: true,
    containsLower: true,
    containsSymbols:true,
    errorMessages: [],
  };
   const regexContNumber = /\d/;
   const regexContUpper = /[A-Z]+/;
   const regexContLower = /[a-z]+/;
   const regexContSymbols = /[!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]/;

   if(password.length < 8){
    validations.allOk = false;
    validations.minLength = false;
    validations.errorMessages.push("-La contraseña debe tener al menos 8 caracteres.");
   }
   if(!regexContNumber.test(password)){
    validations.allOk = false;
    validations.containsNumber = false;
    validations.errorMessages.push("-La contraseña debe contener al menos un número.");
   }
   if(!regexContUpper.test(password)){
    validations.allOk = false;
    validations.containsUpper = false;
    validations.errorMessages.push("-La contraseña debe contener al menos una letra mayúscula.");
   }
   if(!regexContLower.test(password)){
    validations.allOk = false;
    validations.containsLower = false;
    validations.errorMessages.push("-La contraseña debe contener al menos una letra minúscula.");
   }
   if(!regexContSymbols.test(password)){
    validations.allOk = false;
    validations.containsSymbols = false;
    validations.errorMessages.push("-La contraseña debe contener al menos un símbolo especial.");
   }
  return validations;
}

