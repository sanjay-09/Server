import { Tweet } from "@prisma/client";
import { prisma } from "../Client/prisma";
import { GraphQLContext } from "../interfaces";


interface createTweetData{
    content:string
    imageUrl?:string
}

export const resolvers={
    createTweet:async(parent:any,{payload}:{payload:createTweetData},ctx:GraphQLContext)=>{
        console.log("createTweet");
         if(!ctx.user){
            
            throw new Error("User is not authenticated")

         }
        const tweet=await prisma.tweet.create({
            data:{
                content:payload.content,
                imageUrl:payload?.imageUrl ?? "",
                author:{
                    connect:{
                        id:ctx.user.id
                    }
                }
            }
         });
        
         return tweet;
    },
   
   

}
export const queryResolver={
    getAllTweets:async()=>{
        console.log("getAllTweet")
        return await prisma.tweet.findMany({
            orderBy:{
                createdAt:'desc'
                
            }


        })

    }

}
export const extraResolvers={
    Tweet:{
        author:(parent:Tweet)=>{
            return prisma.user.findUnique({
                where:{
                    id:parent?.authorID
                }
            })
        }
    }
}