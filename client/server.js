const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

// Route prefixes mapped to actual folders
const routeMap = {
  '/src': path.join(__dirname, 'src'),
  '/': path.join(__dirname, 'app'),  // default route
};

const server = http.createServer((req, res) => {
  let urlPath = req.url === '/' ? '/index.html' : req.url;

  let baseDir, relativePath;

  if (urlPath.startsWith('/src')) {
    baseDir = routeMap['/src'];
    relativePath = urlPath.slice('/src'.length) || '/index.js'; // strip /dist prefix
  } else {
    baseDir = routeMap['/'];
    relativePath = urlPath;
  }

  const filePath = path.join(baseDir, relativePath);

  // Security check: avoid directory traversal
  if (!filePath.startsWith(baseDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }


  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath);
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
