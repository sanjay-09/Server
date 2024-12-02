import {Types} from "./types"
import { mutation } from "./mutation"
import { resolvers } from "./resolvers"
import { extraResolvers } from "./resolvers"
import { queries } from "./queries"
import { queryResolver } from "./resolvers"

export const tweet={
    Types,
    mutation,
    resolvers,
    extraResolvers,
    queryResolver,
    queries
}