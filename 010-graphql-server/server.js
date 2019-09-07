const { ApolloServer, gql } = require('apollo-server');
const { fakedb } = require('./fake-db');

const typeDefs = gql`
    type Query {
        hello: String
        books(first: Int): [Book]
        book(id: Int!): Book
        authors: [Author]
    }

    type Book {
        id: Int!
        title: String
        author: Author
    }

    """ this is an author type """
    type Author {
        id: Int!
        firstName: String
        lastName: String
    }

    #type Mutation {
    #    createAuthor(...)
    #}
`;

const resolvers = {
    Query: {
        hello: () => "world",

        books: (_, { first }, { db }) => db.getBooks(first),

        book: (_, { id }, { db }) => db.getBookById(id),

        authors: (_, __, { db }) => db.getAuthors()
    },

    Book: {

        author: (book, _, { db }) =>  {
            // throw new Error("some error");
            return db.getAuthorById(book.authorId);
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return {
            db: fakedb
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`Server is listening at ${url}`);
});

