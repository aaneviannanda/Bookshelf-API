const {
    // import variabel handler
    addListBookHandler,
    getAllListBookHandler,
    getListBookByIdHandler,
    editListBookByIdHandler,
    deleteListBookByIdHandler,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addListBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllListBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getListBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editListBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteListBookByIdHandler,
    },
];

module.exports = routes;
