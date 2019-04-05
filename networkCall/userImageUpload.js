/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : imageUploadFunction.js
Purpose   : User Image upload function
*/

export const userImageUpload  = ( votingCode, token, userId, file ) => {
 const options =new FormData();
   options.append('votingElection_code', votingCode)
   options.append('token_id', token)
   options.append('user_id',userId)
   options.append("firstimg", file);
   return fetch('https://devvecapi.apnaneta.com/user/upload_image', {
     method: "POST", 
     mode: "cors",
      headers: {
      },
      body: options
      })
      .then(response =>{
        return response 
      }, function (err){})
  }
  