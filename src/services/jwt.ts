import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWTUser } from "../interfaces";


const JWT_SECRET="ascnvdsvhbsdkv123ef"
class JWT{



    generateJWTToken(user:User){
        const payload:JWTUser={
            id:user.id,
            email:user.email
        }
        return jwt.sign(payload,JWT_SECRET);

    }
    decodeToken(token:string){
        try{
            return jwt.verify(token,JWT_SECRET);

        }
        catch(err){
            return null;
        }
    }
}
export default JWT;