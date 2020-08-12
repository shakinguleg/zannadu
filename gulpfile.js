//1. 根据参数导入相关构建模块
const mode = process.argv[2];

switch (mode) {
    case "build":
        require("./gulpfile-build");
        break;
    case "dev":
        require("./gulpfile-dev");
        break;
}