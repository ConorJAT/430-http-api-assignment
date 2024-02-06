const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    'GET': {
        '/': htmlHandler.getIndex,
        '/style.css': htmlHandler.getCSS,
        '/success': responseHandler.success,
        '/badRequest': responseHandler.badRequest,
        '/unauthorized': responseHandler.unauthorized,
        '/forbidden': responseHandler.forbidden,
        '/internal': responseHandler.internalError,
        '/notImplemented': responseHandler.notImplemented,
        NotFound: responseHandler.notFound
    },
    'HEAD': {
        '/success': responseHandler.successMeta,
        '/badRequest': responseHandler.badRequestMeta,
        '/unauthorized': responseHandler.unauthorizedMeta,
        '/forbidden': responseHandler.forbiddenMeta,
        '/internal': responseHandler.internalErrorMeta,
        '/notImplemented': responseHandler.notImplementedMeta,
        NotFound: responseHandler.notFoundMeta
    }
};

const onRequest = (request, response) => {

};

http.createServer(onRequest).listen(port, () => { console.log(`Listening on 127.0.0.1:${port}`); });