"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (res, message, status, data) => {
    res.status(status).send({
        message,
        data
    });
};
