const fs = require('fs');
const path = require('path');

let stream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let result = '';
stream.on('data', (chunk) => {
  result += chunk;
})

stream.on('end', () => {
  console.log(result);
})