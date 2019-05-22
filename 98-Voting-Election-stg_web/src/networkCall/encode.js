/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : encode.js
Purpose   : To encode the parameter to a base 64
*/

import base64 from 'base-64';
import utf8 from 'utf8';
export const encode = (parameter) =>{
    const inputdatalogin = parameter
    const text = JSON.stringify(inputdatalogin)
    const bytes = utf8.encode(text);
    const encoded = base64.encode(bytes);
    global.encodedData = encode
}