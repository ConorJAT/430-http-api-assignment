const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': responseHandler.success,
    '/badRequest': responseHandler.badRequest,
    '/unauthorized': responseHandler.unauthorized,
    '/forbidden': responseHandler.forbidden,
    '/internal': responseHandler.internalError,
    '/notImplemented': responseHandler.notImplemented,
    notFound: responseHandler.notFound,
  },
  HEAD: {
    '/success': responseHandler.successMeta,
    '/badRequest': responseHandler.badRequestMeta,
    '/unauthorized': responseHandler.unauthorizedMeta,
    '/forbidden': responseHandler.forbiddenMeta,
    '/internal': responseHandler.internalErrorMeta,
    '/notImplemented': responseHandler.notImplementedMeta,
    notFound: responseHandler.notFoundMeta,
  },
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);

  // Is the client asking for XML or JSON?
  const acceptedHeaders = request.headers.accept.split(',');

  // Are there any parameters present in URL?
  const params = query.parse(parsedURL.query);

  // Is the client sending a 'GET' or 'HEAD' request?
  const methodHandler = urlStruct[request.method];
  if (!methodHandler) {
    urlStruct.HEAD.notFound(request, response, acceptedHeaders);
  }

  const handlerFunc = methodHandler[parsedURL.pathname];
  if (handlerFunc) {
    handlerFunc(request, response, acceptedHeaders, params);
  } else {
    urlStruct.GET.notFound(request, response, acceptedHeaders);
  }
};

http.createServer(onRequest).listen(port, () => { console.log(`Listening on 127.0.0.1:${port}`); });
