"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require(".././modules/auth/index"));
const apiPrefix = "/api/v1";
const routes = (app) => {
    app.use(apiPrefix, index_1.default);
    return app;
};
exports.default = routes;
