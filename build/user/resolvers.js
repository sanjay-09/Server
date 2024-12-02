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
exports.extraResolvers = exports.resolvers = void 0;
const prisma_1 = require("../Client/prisma");
const jwt_1 = __importDefault(require("../services/jwt"));
const jwt = new jwt_1.default();
exports.resolvers = {
    getJWTTokenFromGoogleToken: (parent_1, _a) => __awaiter(void 0, [parent_1, _a], void 0, function* (parent, { token }) {
        try {
            if (!token) {
                return null;
            }
            const data = yield fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
            const responsedata = yield data.json();
            const isUserPresent = yield prisma_1.prisma.user.findUnique({
                where: {
                    email: responsedata.email
                }
            });
            if (!isUserPresent) {
                yield prisma_1.prisma.user.create({
                    data: {
                        name: responsedata.name,
                        email: responsedata.email,
                        profileImage: responsedata.picture
                    }
                });
            }
            const user = yield prisma_1.prisma.user.findUnique({
                where: {
                    email: responsedata.email
                }
            });
            const jwtToken = jwt.generateJWTToken(user);
            return jwtToken;
        }
        catch (err) {
            return null;
        }
    }),
    getCurrentUser: (parent, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ctx.user) {
            return null;
        }
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                email: ctx.user.email
            }
        });
        return user;
    }),
    getUserById: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { id }, ctx) {
        if (!ctx.user) {
            throw new Error("user is not unauthenticated");
        }
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: id
            }
        });
        console.log("user", user);
        return user;
    })
};
exports.extraResolvers = {
    User: {
        tweet: (parent) => {
            return prisma_1.prisma.tweet.findMany({
                where: {
                    authorID: parent.id
                }
            });
        }
    }
};
