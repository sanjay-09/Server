"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweet = void 0;
const types_1 = require("./types");
const mutation_1 = require("./mutation");
const resolvers_1 = require("./resolvers");
const resolvers_2 = require("./resolvers");
const queries_1 = require("./queries");
const resolvers_3 = require("./resolvers");
exports.tweet = {
    Types: types_1.Types,
    mutation: mutation_1.mutation,
    resolvers: resolvers_1.resolvers,
    extraResolvers: resolvers_2.extraResolvers,
    queryResolver: resolvers_3.queryResolver,
    queries: queries_1.queries
};
