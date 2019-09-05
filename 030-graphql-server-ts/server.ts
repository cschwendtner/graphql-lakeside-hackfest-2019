import { ApolloServer, gql } from 'apollo-server';
import { resolvers } from './resolvers';
import fs from 'fs';

const typeDefs = gql`${fs.readFileSync(__dirname.concat('./../schema.graphql'), 'utf8')}`;

const server = new ApolloServer({ 
    typeDefs, 
    resolvers
});

server.listen().then(({ url }) => {
    console.log(`Server running at ${url}`);
});