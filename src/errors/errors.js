class HttpError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

class BadRequest extends HttpError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFound extends HttpError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

exports.HttpError = HttpError;
exports.BadRequest = BadRequest;
exports.NotFound = NotFound;
