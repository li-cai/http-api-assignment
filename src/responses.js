const getXML = (obj) => {
  let responseXML = Object.keys(obj).reduce((prev, key) => `${prev}<${key}>${obj[key]}</${key}>`, '<response>');

  responseXML += '</response>';

  return responseXML;
};

const sendResponse = (request, response, status, obj, isXML) => {
  if (isXML) {
    response.writeHead(status, { 'Content-Type': 'text/xml' });
    response.write(getXML(obj));
  } else {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(obj));
  }

  response.end();
};

const success = (request, response, isXML) => {
  const responseObj = {
    message: 'This is a successful response',
  };

  sendResponse(request, response, 200, responseObj, isXML);
};

const badRequest = (request, response, isXML, query) => {
  const responseObj = {
    message: query.valid === 'true' ?
      'This request has the required parameters' :
      'Missing valid query parameter set to true',
    id: 'badRequest',
  };

  sendResponse(request, response, query.valid ? 200 : 400, responseObj, isXML);
};

const unauthorized = (request, response, isXML, query) => {
  const responseObj = {
    message: query.loggedIn === 'true' ?
      'You have successfully viewed the content' :
      'Missing loggedIn query parameter set to true',
    id: 'unauthorized',
  };

  sendResponse(request, response, query.valid ? 200 : 401, responseObj, isXML);
};

const forbidden = (request, response, isXML) => {
  const responseObj = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  sendResponse(request, response, 403, responseObj, isXML);
};

const internal = (request, response, isXML) => {
  const responseObj = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  sendResponse(request, response, 500, responseObj, isXML);
};

const notImplemented = (request, response, isXML) => {
  const responseObj = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  sendResponse(request, response, 501, responseObj, isXML);
};

const notFound = (request, response, isXML) => {
  const responseObj = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  sendResponse(request, response, 404, responseObj, isXML);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
