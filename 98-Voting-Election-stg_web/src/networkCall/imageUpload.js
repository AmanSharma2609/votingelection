/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : imageUpload.js
Purpose   : Servicee to upload the image.
*/

export const ImageUpload  = ( votingCode, token, category_type,category_type_id, file , url) => {
 const options =new FormData();
   options.append('votingElection_code', votingCode)
   options.append('token_id', token)
   options.append('category_type',category_type)
   options.append('category_type_id', category_type_id);
   options.append('image_name', file);
   return fetch('https://stgvecapi.apnaneta.com/political_party/image_upload', {
     method: "POST", 
     mode: 'cors',
      headers: {
      },
      body: options
      })
      .then(response =>{
        return response 
      }, function (err)
      {})
  }
  