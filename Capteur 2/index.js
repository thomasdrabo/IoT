const axios = require('axios');


const capteurId = 'capteur2';
const POURCENT_MIN = 0;
const POURCENT_MAX = 100;

//Sensor Ids
function randomNumber(min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
}

function toByte(string, length) {
  let result = string;
  while (result.length < length * 2) {
    result = '0' + result;
  }
  return result;
}

function sendData(data, endpoint) {
  axios.post(endpoint, { data: data, capteurId: capteurId});
}

function start() {
  const codeValue = 70;
  const code = toByte((codeValue).toString(16), 1);

  var ENDPOINT = 'http://localhost:5302/hygro'; //Middleware Endpoint	
  var value = toByte(randomNumber(POURCENT_MIN, POURCENT_MAX).toString(16), 2);
  var payload = code + value; console.log(payload); sendData(payload, ENDPOINT);
}

setInterval(() => start(), 5000);			