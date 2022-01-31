const CracoLessPlugin = require('craco-less');

module.exports = {
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:3002',
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 "^/api": ''
    //             }
    //         }
    //     },
    // },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#15b2e5' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};