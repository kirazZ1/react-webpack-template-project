# react-webpack-template-project

一个`React`整合`Webpack`的模版工程。目前已整合如下特性：

- `React18` + `TypeScript`，使用SWC作为编译器（`swc-loader`）

- `React HMR`（使用`react-refresh-webpack-plugin`）

- 构建进度条`WebpackBar`

- 别名`alias`配置

- 生产打包产物使用`CompressionPlugin`压缩为`gzip`

- 在`TerserPlugin`中启用`swcMinify`

- 使用`thread-loader`给`swc-loader`单独分配进程（项目小的情况下构建时长会增加）

- `SplitChunks`: 提取`Webpack`运行时代码