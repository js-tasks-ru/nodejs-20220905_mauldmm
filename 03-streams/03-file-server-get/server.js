const http = require('node:http');
const path = require('node:path');
const fs = require('node:fs');
const constants = require('node:constants');

const server = new http.Server();

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      if (!pathname || (pathname.split('/').length > 1)) {
        res.statusCode = 400;
        res.end('Bad Request');
        break;
      }

      fs.access(filepath, constants.F_OK, (err) => {
        if (err) {
          res.statusCode = 404;
          res.end('Not Found');
        } else {
          const stream = fs.createReadStream(filepath);
          stream.pipe(res);

          stream.on('error', (err) => {
            res.statusCode = 500;
            res.end('Internal Server Error');
          });

          stream.on('aborted', () => {
            stream.destroy();
          });
        }
      });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
