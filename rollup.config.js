import clean from 'rollup-plugin-clean';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {babel} from '@rollup/plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import {terser} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'

const pkg = require('./package.json');

const now = new Date();
const banner = () => {
    return '/*!\n' +
        ' * ' + (pkg.title || pkg.name) + ' v' + pkg.version + '\n' +
        ' * Copyright (c) 2021-' + now.getFullYear() + ' ' + pkg.author.name + '\n' +
        ' * License: ' + pkg.license + '\n' +
        ' */';
};

const cleanPlugin = clean();
const resolvePlugin = nodeResolve();
const babelPlugin = babel({
    babelrc: false,
    babelHelpers: 'bundled',
    presets: [['@babel/preset-env', {modules: false}]]
});
const cleanupPlugin = cleanup({
    comments: 'some'
});

const config = [
    {
        input: 'src/luni-masonry.js',
        output: {
            banner: banner(),
            file: pkg.module,
            format: 'es'
        },
        plugins: [
            cleanPlugin,
            resolvePlugin,
            babelPlugin,
            cleanupPlugin
        ]
    },
    {
        input: 'src/luni-masonry.js',
        output: {
            banner: banner(),
            file: pkg.main,
            format: 'umd',
            name: 'luni-masonry'
        },
        plugins: [
            cleanPlugin,
            resolvePlugin,
            babelPlugin,
            cleanupPlugin
        ]
    },
    {
        input: 'src/luni-masonry.js',
        output: {
            banner: banner(),
            file: pkg.browser,
            format: 'umd',
            name: 'luni-masonry'
        },
        plugins: [
            cleanPlugin,
            resolvePlugin,
            babelPlugin,
            cleanupPlugin,
            terser({
                output: {
                    comments: 'all'
                }
            }),
            copy({
                targets: [
                    { src: 'src/luni-masonry.css', dest: 'dist' }
                ]
            })
        ]
    }
];

export default config;
