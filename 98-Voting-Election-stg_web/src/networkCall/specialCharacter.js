/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : specialCharacter.js
Purpose   : To remove the special charcter from input string
*/

export const  specialCharacterCheck = (inputString) => {
    var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/
        regex.test(inputString) 
        if(regex.test(inputString) === false) {
            return false
        }
        else{
            return true
        }
}