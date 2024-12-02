export const types=`#graphql
  type User{
   id:ID!
   name:String!
   email:String!
   profileImage:String!
   tweet:[Tweet]
  
  }

`;