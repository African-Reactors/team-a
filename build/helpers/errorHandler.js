"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (error, statusCode, response) => {
    console.log(error);
    return response.status(statusCode).json({
        success: false,
        error
    });
};
