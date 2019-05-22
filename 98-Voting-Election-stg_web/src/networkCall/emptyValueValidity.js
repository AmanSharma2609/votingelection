/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : emptyValueValidity.js
Purpose   : To check weather the input value is empty or not
*/

// Check validity function.

const checkValidity = (required) => {
    if(required.trim() === ''){
        return false
      }
      else{
        return true
      }
}
export default checkValidity