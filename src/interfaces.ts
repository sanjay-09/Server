export type JWTUser={
    id:string,
    email:string
}
export type GraphQLContext={
    user?:JWTUser
}