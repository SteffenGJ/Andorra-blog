class NoAccountError extends Error {
  constructor(message) {
    super(message);
    this.name = "NoAccountError";
    this.status = 403;
  }
}

class NotGrantedAccessError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotGrantedAccessError";
    this.status = 403;
  }
}

module.exports = { NoAccountError, NotGrantedAccessError };
