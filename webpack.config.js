const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './client/index.tsx',
    output: {
      filename: 'bundle.js',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'public')
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/,  // Regla para manejar archivos CSS
                use: ['style-loader', 'css-loader'],
            }
            ,
            {
                test: /\.s[ac]ss$/i,  // Regla para manejar archivos .scss o .sass
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
            ,
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
            umd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom'
        }
    }
};