import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@as-integrations/express4";
import cors from "cors";
import express from "express";
import { readFile } from "node:fs/promises";
import { authMiddleware, handleLogin } from "./auth/auth.js";
import { _QueryResolver } from "./resolvers/_QueryResolver.js";

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefs = await readFile("./schema.graphql", "utf8");
const resolvers = {
    ..._QueryResolver,
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
});
// apolloServer.applyMiddleware({ app });

await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer));

const PORT = 3001;
app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
