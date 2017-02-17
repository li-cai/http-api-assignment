const http = require('http');
const url = require('url');

const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
};

const onRequest = (request, response) => {
  console.log(request.url);

  const acceptedTypes = request.headers.accept.split(',');

  const isXML = acceptedTypes.length > 0 && acceptedTypes[0] === 'text/xml';

  const parsedUrl = url.parse(request.url, true);
  const handler = urlStruct[parsedUrl.pathname];

  if (handler) {
    handler(request, response, isXML, parsedUrl.query);
  } else {
    responseHandler.notFound(request, response, isXML, parsedUrl.query);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1:${port}`);
