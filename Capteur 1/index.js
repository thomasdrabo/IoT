const axios = require('axios');

const capteurId = 'capteur1';
							
const TEMP_MIN = 150;
const TEMP_MAX = 300;

const PASCAL_MIN = 950;
const PASCAL_MAX = 1150;

const  codeList = [40,45,50]; //Sensor Ids
function randomNumber(min, max) {
return Math.trunc(Math.random() * (max - min) + min);
}
							
function toByte(string, length) {
let result = string;
while (result.length < length * 2) { result = '0' + result;
}
return result;
}	
							
function sendData(data, endpoint) {
  axios.post(endpoint, { data: data,});
}					
							
function start() {
  const codeValue = codeList[Math.floor(Math.random()*codeList.length)];
  const code = toByte((codeValue).toString(16), 1);

  switch (codeValue) {
    case 40:
      var ENDPOINT = 'http://localhost:5302/temp'; //Middleware Endpoint	
      var value = toByte(randomNumber(TEMP_MIN, TEMP_MAX).toString(16), 2);
	    var payload = code + value; console.log(payload); sendData(payload, ENDPOINT);
      break;
    case 45:
      var ENDPOINT = 'http://localhost:5302/pression'; 
      var value = toByte(randomNumber(PASCAL_MIN, PASCAL_MAX).toString(16), 2);
	    var payload = code + value; console.log(payload); sendData(payload, ENDPOINT);
      break
    case 50:
      var ENDPOINT = 'http://localhost:5302/mouv'; 
      var value = Math.random() < 0.5;
      console.log(value);
	    var payload = code + value; console.log(payload); sendData(payload, ENDPOINT);
      break;
    default:
      console.log('Invalid code');
      break;
  }	
}				
							
setInterval(() => start(), 2000);			