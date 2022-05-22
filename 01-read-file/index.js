const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8',
);

let allData = '';
readStream.on('data', (chunk) => {
  allData += chunk;
});

readStream.on('end', () => {
  console.log(allData);
});
