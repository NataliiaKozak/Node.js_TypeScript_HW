const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'myFolder');

fs.mkdir(pathToFolder, (error) => {
  if (error) {
    console.error('Error: ', error);
    return;
  }
  console.log('Folder created');
  fs.rmdir(pathToFolder, (error) => {
    if (error) {
      console.error('Error: ', error);
      return;
    }
    console.log('Folder deleted');
  });
});
