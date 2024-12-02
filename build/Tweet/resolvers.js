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
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraResolvers = exports.queryResolver = exports.resolvers = void 0;
const prisma_1 = require("../Client/prisma");
exports.resolvers = {
    createTweet: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { payload }, ctx) {
        var _b;
        console.log("createTweet");
        if (!ctx.user) {
            throw new Error("User is not authenticated");
        }
        const tweet = yield prisma_1.prisma.tweet.create({
            data: {
                content: payload.content,
                imageUrl: (_b = payload === null || payload === void 0 ? void 0 : payload.imageUrl) !== null && _b !== void 0 ? _b : "",
                author: {
                    connect: {
                        id: ctx.user.id
                    }
                }
            }
        });
        return tweet;
    }),
};
exports.queryResolver = {
    getAllTweets: () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("getAllTweet");
        return yield prisma_1.prisma.tweet.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    })
};
exports.extraResolvers = {
    Tweet: {
        author: (parent) => {
            return prisma_1.prisma.user.findUnique({
                where: {
                    id: parent === null || parent === void 0 ? void 0 : parent.authorID
                }
            });
        }
    }
};
