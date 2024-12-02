import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from "body-parser"
import { user } from "./user";
import { GraphQLContext, JWTUser } from "./interfaces";
import JWT from "./services/jwt";
import cors from 'cors';
import { tweet } from "./Tweet";

const jwt=new JWT();

const start=async()=>{
    const app=express();
    app.use(bodyParser.json());
    app.use(cors());
    const server = new ApolloServer<GraphQLContext>({
        typeDefs:`
        ${user.types}
        ${tweet.Types}
               type Query{
             ${user.queries}
             ${tweet.queries}
           }
             type Mutation{
             ${tweet.mutation}
    }
        `,
        resolvers:{
            Query:{
               ...user.resolvers,
               ...tweet.queryResolver
            },
            Mutation:{
              ...tweet.resolvers
            },
            ...tweet.extraResolvers,
            ...user.extraResolvers
        }
      });
      await server.start();

      app.use("/graphql",expressMiddleware(server,{
        context:async({req,res})=>{
            return{
                user:req.headers.authorization?jwt.decodeToken(req.headers.authorization.split(" ")[1]):""
            }
        }

      }));

    app.listen(3003,()=>{
        console.log(`server is listening on the port 3002`)
    })

}
start();
