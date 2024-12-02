import { User } from "@prisma/client";
import { prisma } from "../Client/prisma";
import { GraphQLContext } from "../interfaces";
import JWT from "../services/jwt";
const jwt=new JWT();
type GoogleAuthToken = {
    iss: string; // Issuer
    azp: string; // Authorized party
    aud: string; // Audience
    sub: string; // Subject (unique identifier)
    email: string; // User's email address
    email_verified: 'true' | 'false'; // Email verification status as a string
    nbf: string; // Not Before (time in seconds since epoch)
    name: string; // Full name
    picture: string; // URL to the user's profile picture
    given_name: string; // First name
    family_name: string; // Last name
    iat: string; // Issued At (time in seconds since epoch)
    exp: string; // Expiration time (time in seconds since epoch)
    jti: string; // JWT ID
    alg: string; // Algorithm used to sign the token
    kid: string; // Key ID
    typ: string;
}

export const resolvers={
    getJWTTokenFromGoogleToken:async(parent:any,{token}:{token:string})=>{
       try{
        if(!token){
            return null;
        }
       const data=await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
       const responsedata:GoogleAuthToken=await data.json();
       const isUserPresent=await prisma.user.findUnique({
        where:{
            email:responsedata.email!
        }
       })
       if(!isUserPresent){
        await prisma.user.create({
            data:{
            
           name:responsedata.name,
             email:responsedata.email,
            profileImage:responsedata.picture
            }
        })
       }
       const user=await prisma.user.findUnique({
        where:{
            email:responsedata.email!
        }
       })
       
       const jwtToken=jwt.generateJWTToken(user!);
    
       return jwtToken;


       }
       catch(err){
        return null;
       }
    },
    getCurrentUser:async(parent:any,args:any,ctx:GraphQLContext)=>{
        if(!ctx.user){
            return null

        }
        const user=await prisma.user.findUnique({
              where:{
                email:ctx.user.email
              }
        })

        return user;
    },
    getUserById:async(parent:any,{id}:{id:string},ctx:GraphQLContext)=>{
        if(!ctx.user){
            throw new Error("user is not unauthenticated");
            
        }
        const user=await prisma.user.findUnique({
            where:{
                id:id
            }
        })
        console.log("user",user);
        return user;
    }
}

export const extraResolvers={
    User:{
        tweet:(parent:User)=>{
            return prisma.tweet.findMany({
                where:{
                    authorID:parent.id
                }
            })
        }

    }
}