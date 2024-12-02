"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types = void 0;
exports.Types = `#graphql

  input CreateTweetData{
   content:String!
   imageUrl:String
  }

   type Tweet{
    id:String! 
  content:String!
  imageUrl:String
  author:User
   
   
   }
`;
