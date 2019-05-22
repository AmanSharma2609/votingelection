/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : service.js
Purpose   : common function for API calling.
*/

import base64 from 'base-64';
import utf8 from 'utf8';
export const items  = (method, body,url) => {
  const text = JSON.stringify(body)
  const bytes = utf8.encode(text);
  const encoded = base64.encode(bytes);
    const resultObjectlogin = {
      "data": encoded
    }
    let request = JSON.stringify(resultObjectlogin);
    const headers = new Headers()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')
   return fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: request, 
      })
      .then(response => response.json())
      .then(response =>{
        const data = JSON.parse(atob(response.res))
        return JSON.parse(atob(response.res));
      }, function (err){})
   
  }
  