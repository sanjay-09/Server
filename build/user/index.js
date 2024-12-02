"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const types_1 = require("./types");
const resolvers_1 = require("./resolvers");
const query_1 = require("./query");
const resolvers_2 = require("./resolvers");
exports.user = {
    types: types_1.types,
    resolvers: resolvers_1.resolvers,
    queries: query_1.queries,
    extraResolvers: resolvers_2.extraResolvers
};
