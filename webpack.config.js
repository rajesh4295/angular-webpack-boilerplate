'use strict';

const ENV = (process.env.NODE_ENV || 'development').trim();

console.log("ENVIRONMENT ===> ", ENV);

if (ENV === 'development') {
    module.exports = require('./config/webpack.config.dev');
} else {
    module.exports = require('./config/webpack.config.prod');
}
