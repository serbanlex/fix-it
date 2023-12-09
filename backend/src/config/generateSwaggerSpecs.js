const swaggerAutogen = require('swagger-autogen')();
const fs = require('fs');

const swaggerSpecsFilePath = 'src/config/swaggerSpecs.json';

const lastModified = fs.statSync(swaggerSpecsFilePath).mtime;

const now = Date.now();
const currentTime = now - lastModified;

if (currentTime < 1000) {
    console.log('Swagger specs are up to date');
    return;
}


const doc = {
    info: {
        version: '0.1.0',      // by default: '1.0.0'
        title: 'Fix-It API',        // by default: 'REST API'
        description: '',  // by default: ''
    },
    host: '',      // by default: 'localhost:3000'
    basePath: '/',  // by default: '/'
    schemes: [],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    tags: [        // by default: empty Array
        {
            name: '',         // Tag name
            description: '',  // Tag description
        },
        // { ... }
    ],
    securityDefinitions: {},  // by default: empty object
    definitions: {},          // by default: empty object (Swagger 2.0)
    components: {}            // by default: empty object (OpenAPI 3.x)
};

// output file should be in this directory
const endpointsFiles = ['src/presentation/routes/*.js'];

console.log('Generating Swagger specs... ');

swaggerAutogen(swaggerSpecsFilePath, endpointsFiles, doc);