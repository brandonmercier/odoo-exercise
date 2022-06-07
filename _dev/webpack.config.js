const path = require( 'path' );

module.exports = {
    mode: 'production',
    watch: true,
    entry: {
        "main": '/js/main.js'
    },
    output: {
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        modules: [ path.resolve(__dirname, 'node_modules'), 'node_modules' ]
    },
    performance: {
        hints: false
    }
};