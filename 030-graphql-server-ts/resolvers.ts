import { QueryResolvers, BookResolvers } from './graphql';

export const Query: QueryResolvers = {
    book: (root, args, context) => {
        return {
            id: 11,
            title: "the title",
            authorId: 21
        }
    }
};

export const Book: BookResolvers = {
    author: (book, args, context) => {
        return {
            id: 21,
            firstName: "firstName of the author",
            lastName: "lastName of the author"
        };
    }
};

export const resolvers = {
    Query,
    Book
};