// this file isn't tranpiled, so must use CommonJS and ES5

// register babel to transile before our tests run.
require('babel-register')();

// disable webpack features that Mocha doesn't understand.
require.extensions['.css'] = function() {};
