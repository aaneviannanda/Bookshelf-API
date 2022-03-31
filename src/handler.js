// Import Library / variabel
const { nanoid } = require('nanoid');
const books = require('./data/books');
// Handler untuk menambahkan list buku
const addListBookHandler = (request, h) => {
    const {
        // variabel body request
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const newListBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newListBook);

    const isSuccess = books.filter((addListBook) => addListBook.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};
// Handler untuk menampilkan seluruh list buku di dalam route
const getAllListBookHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    if (!name && !reading && !finished) {
        const response = h.response({
            status: 'success',
            data: {
                books: books.map((getAllListBook) => ({
                    id: getAllListBook.id,
                    name: getAllListBook.name,
                    publisher: getAllListBook.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }

    if (name) {
        const filterBooksName = books.filter((filterBook) => {
            const nameRegex = new RegExp(name, 'gi');
            return nameRegex.test(filterBook.name);
        });

        const response = h.response({
            status: 'success',
            data: {
                books: filterBooksName.map((getAllListBook) => ({
                    id: getAllListBook.id,
                    name: getAllListBook.name,
                    publisher: getAllListBook.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }

    if (reading) {
        const filterBooksReading = books.filter((filterBook) => Number(filterBook.reading) === Number(reading));
        const response = h.response({
            status: 'success',
            data: {
                books: filterBooksReading.map((getAllListBook) => ({
                    id: getAllListBook.id,
                    name: getAllListBook.name,
                    publisher: getAllListBook.publisher,
                })),
            },
        });
        response.code(200);
        return response;
    }

    const filterBooksFinished = books.filter((filterBook) => Number(filterBook.finished) === Number(finished));
    const response = h.response({
        status: 'success',
        data: {
            books: filterBooksFinished.map((getAllListBook) => ({
                id: getAllListBook.id,
                name: getAllListBook.name,
                publisher: getAllListBook.publisher,
            })),
        },
    });
    response.code(200);
    return response;
};
// Handler untuk menampilkan detail buku berdasarkan id
const getListBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((getListBookById) => getListBookById.id === id)[0];
    if (book) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};
// Hanndler untuk mengubah data buku berdasarkan id
const editListBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const {
        // variabel body request
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((editListBookById) => editListBookById.id === id);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            insertedAt,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};
// Handler untuk menghapus buku dari list
const deleteListBookByIdHandler = (request, h) => {
    const { id } = request.params;
    const index = books.findIndex((deleteListBookById) => deleteListBookById.id === id);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};
// Export Variabel
module.exports = {
    addListBookHandler,
    getAllListBookHandler,
    getListBookByIdHandler,
    editListBookByIdHandler,
    deleteListBookByIdHandler,
};
