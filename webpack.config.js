const path = require('path');

module.exports = {
    entry: ['./js/barba.js', './js/kursor.js', './js/alpine.js'],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js',
    },

    mode: 'production'
}