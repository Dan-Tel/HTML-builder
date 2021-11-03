const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      if (file.isFile()) {
        let fileInfo = file.name.split('.');

        fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
          console.log(`${fileInfo[0]} - ${fileInfo[1]} - ${stats.size / 1024}kb`);
        })
      }
    })
  }
});