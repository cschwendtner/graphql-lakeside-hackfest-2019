const books = [
    { id: 11, title: 'Book1', authorId: 21 },
    { id: 12, title: 'Book2', authorId: 21 },
    { id: 13, title: 'Book3', authorId: 22 },
    { id: 14, title: 'Book4', authorId: 22 },
    { id: 15, title: 'Book5', authorId: 23 },
    { id: 16, title: 'Book6', authorId: 23 },
];

const authors = [
    { id: 21, firstName: 'Hugo', lastName: 'Meier' },
    { id: 22, firstName: 'Fritz', lastName: 'Müller' },
    { id: 23, firstName: 'Franz', lastName: 'Tisch' },
];

const magazines = [
    { id: 31, title: 'Magazine1', summary: "Summary of Magazine 1" },
    { id: 32, title: 'Magazine2', summary: "Summary of Magazine 2" },
    { id: 33, title: 'Magazine3', summary: "Summary of Magazine 3" },
];

exports.fakedb = {

    getBooks: (first, titleContains) => {
        let result = books;

        if (titleContains !== undefined) {
            result = result.filter(b => b.title.includes(titleContains));
        }

        if (first !== undefined) {
            result = result.slice(0, first);
        }
        return result;
    },

    getBookById: (id) => books.find(b => b.id === id),

    getAuthors: () => authors,

    getAuthorById: (id) => authors.find(a => a.id === id),

    getBooksByAuthorId: (authorId) => books.filter(b => b.authorId === authorId),

    getMagazines: () => magazines,

    getMagazineById: (id) => magazines.find(m => m.id === id),

    addAuthor: (firstName, lastName) => {
        const id = Math.max.apply(Math, authors.map(a => a.id)) + 1;
        const newAuthor = {
            id,
            firstName,
            lastName
        };
        authors.push(newAuthor);
        return newAuthor;
    }
}