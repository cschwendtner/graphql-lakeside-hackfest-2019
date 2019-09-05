const { ApolloServer, gql, ApolloError } = require('apollo-server');
const { sqlitedb, initDb } = require('./sqlite-db');
// const DataLoader = require('dataloader');

const typeDefs = gql`

    type Query {  
        books: [Book]
        authors: [Author]
    }

    type Book {
        id: Int!
        title: String
        author: Author
    }

    type Author {
        id: Int!
        firstName: String
        lastName: String
    }
`;

const resolvers = {
    Query: {
        books: (_, __, { db }) => db.getBooks(),

        authors: (_, __, { db }) => db.getAuthors(),
    },

    Book: {
        author: (book, _, { db }) => db.getAuthorById(book.authorId),
        
        // author: (book, _, { authorsLoader }) => authorsLoader.load(book.authorId),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return {
            db: sqlitedb,
            // authorsLoader: new DataLoader(sqlitedb.getAuthorsByIds)
        }
    }
});

initDb().then(() => {

    server.listen().then(({ url }) => {
        console.log(`Server running at ${url}`);
    });

});

