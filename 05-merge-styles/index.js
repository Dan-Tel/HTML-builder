const path = require('path');
const fs = require('fs');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  files.forEach(file => {
    if (path.extname(path.join(__dirname, 'styles', file.name)) == '.css') {
      let stream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
      stream.on('data', (chunk) => {
        fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), chunk, (err) => {
          if (err) throw err;
        });
      })
    }
  })
})

// node 05-merge-styles