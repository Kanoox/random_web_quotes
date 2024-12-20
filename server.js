const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // Extension du fichier
  const ext = path.extname(filePath);
  let contentType = 'text/html';

  // Définir le content type selon l'extension
  switch (ext) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
    default:
      contentType = 'text/html';
  }

  // Lire le fichier et le retourner au client
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page 404 si le fichier n'existe pas
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      } else {
        // Erreur serveur
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Succès : retourner le contenu du fichier
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
