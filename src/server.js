import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@as-integrations/express4";
import cors from "cors";
import express from "express";
import { readFile } from "node:fs/promises";
import { authMiddleware, handleLogin } from "./auth/auth.js";
import {
    _QueryResolver,
    _QueryResolverQuery,
} from "./resolvers/_QueryResolver.js";
import { JobResolver, JobResolverQuery } from "./resolvers/JobResolver.js";
import {
    CompanyResolver,
    CompanyResolverQuery,
} from "./resolvers/CompanyResolver.js";
import { UserResolver, UserResolverQuery } from "./resolvers/UserResolver.js";
import { _MutationResolverMutation } from "./resolvers/_MutationResolver.js";

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefs = await readFile("./schema.graphql", "utf8");
const resolvers = {
    Query: {
        ..._QueryResolverQuery.Query,
        ...UserResolverQuery,
        ...JobResolverQuery,
        ...CompanyResolverQuery,
    },
    Mutation: {
        ..._MutationResolverMutation,
    },
    ..._QueryResolver,
    ...UserResolver,
    ...JobResolver,
    ...CompanyResolver,
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
});

await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer));

const PORT = 3001;
app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
