const path = require('path');
const fs = require('fs');

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
  if (err) throw err;
});

// Template to index.html
fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, data) => {
  let result = data;

  fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, (err, files) => {
    files.forEach((file) => {
      if (path.extname(path.join(__dirname, 'components', file.name)) == '.html') {
        fs.readFile(path.join(__dirname, 'components', file.name), 'utf-8', (err, data) => {

          result = result.split(`{{${file.name.split('.')[0]}}}`).join(data);
          fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), result, (err) => {
            if (err) throw err;
          })
  
        })
      }
    })
  })
})

//All styles to style.css
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
    if (err) throw err;
  })

  files.forEach((file) => {
    fs.readFile(path.join(__dirname, 'styles', file.name), 'utf-8', (err, data) => {

      fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, (err) => {
        if (err) throw err;
      })

    })
  })
})

//Assets to Project-dist/assets
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true}, (err) => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, dirs) => {
  dirs.forEach(dir => {

    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dir.name), {recursive: true}, (err) => {
      if (err) throw err;

      fs.readdir(path.join(__dirname, 'project-dist', 'assets', dir.name), {withFileTypes: true}, (err, files) => {
        files.forEach(file => {
          fs.unlink(path.join(__dirname, 'project-dist', 'assets', dir.name, file.name), (err) => {
            if (err) throw err;
          })
        })
    
        fs.readdir(path.join(__dirname, 'assets', dir.name), {withFileTypes: true}, (err, files) => {
          files.forEach(file => {
            fs.copyFile(path.join(__dirname, 'assets', dir.name, file.name), path.join(__dirname, 'project-dist', 'assets', dir.name, file.name), (err) => {
              if (err) throw err;
            })
          })
        })
      })
    })
  })
})