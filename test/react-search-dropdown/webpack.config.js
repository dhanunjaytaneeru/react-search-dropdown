const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const pkg = require('./package.json');

const config = {

    // Tell webpack the root file of our server Application
    mode: "production",
    target: "web",
    entry: path.resolve(__dirname, "./src/SearchBox/index.js"),
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    caller: {
                        name: "web"
                    }
                }
            }, {
                test: /\.(scss)$/,
                use: [
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    stats: {
        colors: false,
        hash: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true,
        children: true
    },
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true
                    }
                }
            }),
            new TerserPlugin({
                // Use multi-process parallel running to improve the build speed Default number
                // of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Enable file caching
                cache: true,
                sourceMap: true
            })
        ],
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor_app",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    // Tell webpack where to put the output file that is generated

    output: {
        library: pkg.name,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        publicPath: '/dist/',
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        globalObject: 'this'
    },
    resolve: { 
        alias: { 
            'react': path.resolve(__dirname, './node_modules/react') ,
            'react-dom': path.resolve(__dirname, './node_modules/react-dom')
        } 
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React"
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM"
        }
    },
    plugins: [
        // extractSass,
        new CleanWebpackPlugin()
    ]
};

// console.log(JSON.stringify(merge.smart(config,baseConfig)));
module.exports = config;
