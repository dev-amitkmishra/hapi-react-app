'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const init = async () => {

    const server = Hapi.server({
        port: 3010,
        host: 'localhost'
    });

    await server.register(Inert);

    server.route({
        method: 'GET',
        path:'/',
        handler: (request, h) => {
            return 'App created with Hapi for React-SSR!';
        }
    });
    server.route({
        method: 'GET',
        path: '/app/{path*}',
        handler: {
            directory: {
                path: path.join(__dirname, '../client/react-ssr-app/build/'),
                listing: false,
                index: true
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/static/{path*}',
        handler: {
            directory: {
                path: path.join(__dirname, '../client/react-ssr-app/build/static'),
                listing: false,
                index: true
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();