"use strict";

const path = require("path");
const fs = require("fs");
const getPublicUrlOrPath = require("react-dev-utils/getPublicUrlOrPath");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === "development",
  require(resolveApp("package.json")).homepage,
  process.env.PUBLIC_URL
);

const buildPath = process.env.BUILD_PATH || "build";

const moduleFileExtensions = [
  "web.mjs",
  "mjs",
  "web.js",
  "js",
  "web.ts",
  "ts",
  "web.tsx",
  "tsx",
  "json",
  "web.jsx",
  "jsx",
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
  /* env 变量路径 */
  dotenv: resolveApp(".env"),
  /* app 根目录 */
  appPath: resolveApp("."),
  /* app 编译路径 */
  appBuild: resolveApp(buildPath),
  /* app 公共路径 */
  appPublic: resolveApp("public"),
  /* app html 路径 */
  appHtml: resolveApp("public/index.html"),
  /* app indexjs 路径 */
  appIndexJs: resolveModule(resolveApp, "src/index"),
  /* app package.json 路径 */
  appPackageJson: resolveApp("package.json"),
  /* app src 根目录路径 */
  appSrc: resolveApp("src"),
  /* app typescript 配置路径 */
  appTsConfig: resolveApp("tsconfig.json"),
  /* app javascript 配置路径 */
  appJsConfig: resolveApp("jsconfig.json"),
  /* app yarn.lock路径 用来判断使用使用了 yarn */
  yarnLockFile: resolveApp("yarn.lock"),
  testsSetup: resolveModule(resolveApp, "src/setupTests"),
  /* 代理配置路径 */
  proxySetup: resolveApp("config/setupProxy.js"),
  appNodeModules: resolveApp("node_modules"),
  appWebpackCache: resolveApp("node_modules/.cache"),
  appTsBuildInfoFile: resolveApp("node_modules/.cache/tsconfig.tsbuildinfo"),
  swSrc: resolveModule(resolveApp, "src/service-worker"),
  publicUrlOrPath,
};

module.exports.moduleFileExtensions = moduleFileExtensions;
