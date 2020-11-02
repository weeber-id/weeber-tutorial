"use strict";
exports.__esModule = true;
exports.defaultErrorHandler = void 0;
function defaultErrorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send({
        message: 'Something Went Wrong!'
    });
}
exports.defaultErrorHandler = defaultErrorHandler;
