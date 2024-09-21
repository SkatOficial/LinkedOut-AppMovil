export function textValidaton(text:string): boolean{
  if(!text){
    return false
  }
  return true;
}

export function emailValidation(email: string): any {
  let validations:any = {
    allOk: true,
    errorMessage: "",
  };

  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  
  if (email.length<1){
    validations.allOk = false;
    validations.errorMessage = "este campo es obligatorio"
  }else if (!regex.test(email)){
    validations.allOk = false;
    validations.errorMessage = "email inválido"
  }
  
  return validations;
}

export function passwordValidation(password: string): any{
  let validations:any = {
    allOk: true,
    errorMessages: [],
  };
   const regexContNumber = /\d/;
   const regexContUpper = /[A-Z]+/;
   const regexContLower = /[a-z]+/;
   const regexContSymbols = /[!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]/;

   if(password.length < 8){
    validations.allOk = false;
    validations.errorMessages.push("-La contraseña debe tener al menos 8 caracteres.");
   }
   if(!regexContNumber.test(password)){
    validations.allOk = false;
    validations.errorMessages.push("-La contraseña debe contener al menos un número.");
   }
   if(!regexContUpper.test(password)){
    validations.allOk = false;
    validations.errorMessages.push("-La contraseña debe contener al menos una letra mayúscula.");
   }
   if(!regexContLower.test(password)){
    validations.allOk = false;
    validations.errorMessages.push("-La contraseña debe contener al menos una letra minúscula.");
   }
   if(!regexContSymbols.test(password)){
    validations.allOk = false;
    validations.errorMessages.push("-La contraseña debe contener al menos un símbolo especial.");
   }
  return validations;
}


