const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = '';
  let contentType = 'text/html';

  if (req.url === '/') {
    filePath = path.join(__dirname, 'index.html');
  } else if (req.url === '/about') {
    filePath = path.join(__dirname, 'about.html');
  } else {
    filePath = path.join(__dirname, '404.html');
    res.statusCode = 404; // important
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
    } else {
      res.writeHead(res.statusCode || 200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(8000, () => {
  console.log('Server running at http://localhost:8000');
});
