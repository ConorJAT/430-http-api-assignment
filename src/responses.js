// Base function for all content writing.
const respond = (resquest, response, status, header, object) => {
    response.writeHead(status, header);
    response.write(object);
    response.end();
};

// Base function for head (meta content) only writing.
const respondMeta = (request, response, status, header) => {
    response.writeHead(status, header);
    response.end();
};

// Success - Writes content for code 200 (success).
const success = (request, response, headers) => {
    if (headers[0] === 'text/xml') {
        const xmlString = '<response><message>This is a successful response!</message></response>';
        return respond(request, response, 200, 'text/xml', xmlString);
    }

    const json = { 'message': 'This is a successful response!' };
    return respond(request, response, 200, 'application/json', JSON.stringify(json));
};

// SuccessMeta - Writes head for code 200.
const successMeta = (request, response, headers) => {
    if (headers[0] === 'text/xml') {
        return respondMeta(request, response, 200, 'text/xml');
    }

    return respondMeta(request, response, 200, 'application/json');
};

// BadRequest - Writes content for code 400 (bad request) if valid does not exist/equal true.
const badRequest = (request, response, headers, params) => {
    if (!params.valid || !params.valid !== 'true') {
        if (headers[0] === 'text/xml') {
            let xmlString = '<response><message>Missing valid query parameter set to true!</message>';
            xmlString +='<id>badRequest</id></response>';
            return respond(request, response, 400, 'text/xml', xmlString);
        }

        const json = { 'message': 'Missing valid query parameter set to true!', 'id': 'badRequest' };
        return respond(request, response, 400, 'application/json', JSON.stringify(json));
    }

    if (headers[0] === 'text/xml') {
        const xmlString = '<response><message>Request has the required parameters!</message></response>';
        return respond(request, response, 200, 'text/xml', xmlString);
    }

    const json = { 'message': 'Request has the required parameters!' };
    return respond(request, response, 200, 'application/json', JSON.stringify(json));
};

// BadRequest - Writes head for code 400 if valid does not exist/equal true.
const badRequestMeta = (request, response, headers, params) => {
    if (!params.valid || !params.valid !== 'true') {
        if (headers[0] === 'text/xml') {
            return respondMeta(request, response, 400, 'text/xml');
        }

        return respondMeta(request, response, 400, 'application/json');
    }

    if (headers[0] === 'text/xml') {
        return respondMeta(request, response, 200, 'text/xml');
    }

    return respondMeta(request, response, 200, 'application/json');
};

// Unauthorized - Writes content for code 401 (unauthorized) if loggedIn does not exist/equal yes.
const unauthorized = (request, response, headers, params) => {
    if (!params.loggedIn || !params.loggedIN !== 'yes') {
        if (headers[0] === 'text/xml') {
            let xmlString = '<response><message>Missing loggedIn query parameter set to yes!</message>';
            xmlString +='<id>unauthroized</id></response>';
            return respond(request, response, 401, 'text/xml', xmlString);
        }

        const json = { 'message': 'Missing loggedIn query parameter set to yes!', 'id': 'unauthorized' };
        return respond(request, response, 401, 'application/json', JSON.stringify(json));
    }

    if (headers[0] === 'text/xml') {
        const xmlString = '<response><message>Request has the required parameters!</message></response>';
        return respond(request, response, 200, 'text/xml', xmlString);
    }

    const json = { 'message': 'Request has the required parameters!' };
    return respond(request, response, 200, 'application/json', JSON.stringify(json));
};

// UnauthorizedMeta - Writes head for code 401 if loggedIn does not exist/equal yes.
const unauthorizedMeta = (request, response, headers, params) => {
    if (!params.loggedIn || !params.loggedIN !== 'yes') {
        if (headers[0] === 'text/xml') {
            return respondMeta(request, response, 401, 'text/xml');
        }

        return respondMeta(request, response, 401, 'application/json');
    }

    if (headers[0] === 'text/xml') {
        return respondMeta(request, response, 200, 'text/xml');
    }

    return respondMeta(request, response, 200, 'application/json');
};

// Forbidden - Writes content for code 403 (forbidden).
const forbidden = (request, response, headers) => {
    if (headers[0] === 'text/xml') {
        let xmlString = '<response><message>You do not have access to this content!</message>';
        xmlString += '<id>forbidden</id></response>';
        return respond(request, response, 403, 'text/xml', xmlString);
    }

    const json = { 'message': 'You do not have access to this content!', 'id': 'forbidden' };
    return respond(request, response, 403, 'application/json', JSON.stringify(json));
};

// ForbiddenMeta - Writes head for code 403.
const forbiddenMeta = (request, response, headers) => {
    if (headers[0] === 'text/xml') {
        return respondMeta(request, response, 403, 'text/xml');
    }

    return respondMeta(request, response, 403, 'application/json');
};

// InternalError - Writes content for code 500 (server error).
const internalError = (request, response, headers) => {
    if (headers[0] === 'text/xml') {
        let xmlString = '<response><message>Internal server error. Something went wrong!</message>';
        xmlString += '<id>internalError</id></response>';
        return respond(request, response, 500, 'text/xml', xmlString);
    }

    const json = { 'message': 'Internal server error. Something went wrong!', 'id': 'internalError' };
    return respond(request, response, 500, 'application/json', JSON.stringify(json));
};

// InternalErrorMeta - Writes head for code 500.
const internalErrorMeta = (request, response, headers) => {
    if (headers[0] === 'text/xml') {
        return respondMeta(request, response, 500, 'text/xml');
    }

    return respondMeta(request, response, 500, 'application/json');
};

// NotImplemented - Writes content for code 501 (not implemented).
const notImplemented = (request, response, headers) => {
    if (headers[0] === 'text/xml') {
        let xmlString = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content!</message>';
        xmlString += '<id>notImplemented</id></response>';
        return respond(request, response, 501, 'text/xml', xmlString);
    }

    const json = { 'message': 'A get request for this page has not been implemented yet. Check again later for updated content!', 'id': 'notImplemented' };
    return respond(request, response, 501, 'application/json', JSON.stringify(json));
};

// NotImplementedMeta - Writes head for code 501.
const notImplementedMeta = (request, response, headers) => {
    if (headers[0] === 'text/xml') {
        return respondMeta(request, response, 501, 'text/xml');
    }

    return respondMeta(request, response, 501, 'application/json');
};

// NotFound - Writes content for code 404 (not found).
const notFound = (request, response, headers) => {
    if (headers[0] === 'text/xml') {
        let xmlString = '<response><message>The page you are looking for was not found!</message>';
        xmlString += '<id>notFound</id></response>';
        return respond(request, response, 404, 'text/xml', xmlString);
    }

    const json = { 'message': 'The page you are looking for was not found!', 'id': 'notFound' };
    return respond(request, response, 404, 'application/json', JSON.stringify(json));
};

// NotFoundMeta - Writes head for code 404.
const notFoundMeta = (request, response, headers) => {
    if (headers[0] === 'text/xml') {
        return respondMeta(request, response, 404, 'text/xml');
    }

    return respondMeta(request, response, 404, 'application/json');
};

module.exports = { 
    success, 
    successMeta, 
    badRequest, 
    badRequestMeta,
    unauthorized,
    unauthorizedMeta, 
    forbidden, 
    forbiddenMeta,
    internalError,
    internalErrorMeta,
    notImplemented,
    notImplementedMeta,
    notFound,
    notFoundMeta
};