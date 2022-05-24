const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, 'utf-8');

rl.write('Hello! Write your text, please... \n');

rl.on('line', (text) => {
  if (text === 'exit') rl.close();
  writeStream.write(`${text}\n`);
});

rl.on('SIGINT', () => {
  rl.close();
});

rl.on('close', () => {
  rl.write('Goodbye!');
  process.exit();
});
