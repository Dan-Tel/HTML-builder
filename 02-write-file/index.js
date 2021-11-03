const fs = require('fs');
const path = require('path');
const { stdin } = process;

let stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

console.log('Привет! Введите слова:');

stdin.on('data', (data) => {
  let stringify = data.toString();

  if (stringify.trim() == 'exit') {
    process.exit();
  }

  stream.write(stringify);
})

process.on('exit', () => {
  console.log('Программа завершается');
})

process.on('SIGINT', () => {
  process.exit();
});