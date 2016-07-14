var env = process.argv.length > 2 ? process.argv[2] : '-env-dev';

switch (env) {
    case '-w':
    case '-env-prod':
    case '-env-production':
        module.exports = require('./config/webpack.prod');
        break;
    case '-env-dev':
    case '-env-development':
    default:
        module.exports = require('./config/webpack.dev');
}