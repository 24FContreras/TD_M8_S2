class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ExistentResourceError extends Error {
  constructor(message) {
    super(message);
    this.name = "ExistentResourceError";
    this.statusCode = 400;
  }
}

module.exports = { NotFoundError, ExistentResourceError };
