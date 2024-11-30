require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const loadModel = require('../loadModel');
 
const init = async () => {

    const portVar = process.env.PORT || 8080;
    const server = Hapi.server({
        port: portVar,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });
    
    const model = await loadModel();
    
    server.app.model = model;
    
    server.route(routes);
    
    server.ext('onPreResponse', function (request, h) {
        const response = request.response;
        if (response.isBoom && response.output.statusCode === 413)
            return h.response({
                "status": "fail",
                "message": "Payload content length greater than maximum allowed: 1000000"
            }).code(413);
        return h.continue;
    });
    
    await server.start();
    console.log(`Server berjalan pada: ${server.info.uri}`);
    
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();