
const sqlite = require('sqlite');

exports.initDb = async () => {
    console.log('initializing database');
    
    await sqlite.open(':memory:');
    
    await sqlite.run(`
        CREATE TABLE Author (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            firstName TEXT,
            lastName TEXT
        )
    `);

    await sqlite.run(`
        CREATE TABLE Book (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            title TEXT, 
            authorId INTEGER,
            FOREIGN KEY(authorId) REFERENCES Author(id)
        )
    `);

    await sqlite.run('INSERT INTO Author (firstName, lastName) values ("Hugo", "Meier")');
    await sqlite.run('INSERT INTO Author (firstName, lastName) values ("Fritz", "Müller")');
    await sqlite.run('INSERT INTO Author (firstName, lastName) values ("Franz", "Tisch")');
    
    await sqlite.run('INSERT INTO Book (title, authorId) values ("Book1", 1)');
    await sqlite.run('INSERT INTO Book (title, authorId) values ("Book2", 1)');
    await sqlite.run('INSERT INTO Book (title, authorId) values ("Book3", 2)');
    
    console.log('inserted data');

    let rows = await sqlite.all('SELECT * FROM Author');
    console.log(rows);

    rows = await sqlite.all('SELECT * FROM Book');
    console.log(rows);
}

exports.sqlitedb = {
    getBooks: () => {
        const stmt = 'SELECT * FROM Book';
        console.log(stmt);
        return sqlite.all(stmt);
    },

    getAuthors: () => {
        const stmt = 'SELECT * FROM Author';
        console.log(stmt);
        return sqlite.all(stmt);
    },

    getBookById: (id) => {
        const stmt = 'SELECT * FROM Book where id = ?';
        console.log(stmt);
        return sqlite.get(stmt, [ id ]);
    },

    getAuthorById: (id) => {
        const stmt = 'SELECT * FROM Author where id = ?';
        console.log(stmt);
        return sqlite.get(stmt, [ id ]);
    },

    // getAuthorsByIds: async (ids) => {
    //     const stmt = `SELECT * FROM Author where ID in (${ids.map(id => '?').join(',')})`;
    //     console.log(stmt);
    //     const authors = await sqlite.all(stmt, ids);
    //     return ids.map(id => authors.find(a => a.id === id));
    // },

}