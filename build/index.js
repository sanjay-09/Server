"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("./user");
const jwt_1 = __importDefault(require("./services/jwt"));
const cors_1 = __importDefault(require("cors"));
const Tweet_1 = require("./Tweet");
const jwt = new jwt_1.default();
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use((0, cors_1.default)());
    const server = new server_1.ApolloServer({
        typeDefs: `
        ${user_1.user.types}
        ${Tweet_1.tweet.Types}
               type Query{
             ${user_1.user.queries}
             ${Tweet_1.tweet.queries}
           }
             type Mutation{
             ${Tweet_1.tweet.mutation}
    }
        `,
        resolvers: Object.assign(Object.assign({ Query: Object.assign(Object.assign({}, user_1.user.resolvers), Tweet_1.tweet.queryResolver), Mutation: Object.assign({}, Tweet_1.tweet.resolvers) }, Tweet_1.tweet.extraResolvers), user_1.user.extraResolvers)
    });
    yield server.start();
    app.use("/graphql", (0, express4_1.expressMiddleware)(server, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req, res }) {
            return {
                user: req.headers.authorization ? jwt.decodeToken(req.headers.authorization.split(" ")[1]) : ""
            };
        })
    }));
    app.listen(3003, () => {
        console.log(`server is listening on the port 3002`);
    });
});
start();
