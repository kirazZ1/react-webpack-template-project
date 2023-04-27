# react-webpack-template-project

一个`React`整合`Webpack`的模版工程。目前已整合如下特性：

- `React18` + `TypeScript`，使用`SWC`作为编译器（`swc-loader`）

- `React HMR`（使用`react-refresh-webpack-plugin`）

- 构建进度条`WebpackBar`

- 别名`alias`配置

- `css`处理：开发阶段使用`style-loader`，生产阶段使用`mini-css-extract-plugin`进行处理，并使用`css-minimizer-webpack-plugin`进行`css`代码压缩

- 生产打包产物使用`compression-webpack-plugin`压缩为`gzip`

- 在`terser-webpack-plugin`中启用`swcMinify`

- 使用`thread-loader`给`swc-loader`单独分配进程（项目小的情况下构建时长会增加）

- `SplitChunks`: 

  - 提取`Webpack`运行时代码

  - 对`node_modules`中每个库都进行`SplitChunks`（这意味着加载页面时文件请求数会变得很多，配合`HTTP2`速度最佳，否则会造成性能劣化）