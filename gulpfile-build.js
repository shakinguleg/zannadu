console.log("启动生产版------------");
// 1. 导入所需模块
const { task, src, dest, watch, series, parallel } = require("gulp"); //结构解析gulp
const load = require('gulp-load-plugins')(); // 批量导入gulp的其他插件
const del = require('del');//node的del删除模块

console.log(load.imagemin);

//2. 生成哈希值、压缩并导出文件命令
task("css", async () => {
    src('./css/*.css')
        .pipe(load.rev())//给文件生成哈希值
        .pipe(load.minifyCss())//压缩css文件
        .pipe(dest("./dist/css"))
        .pipe(load.rev.manifest())//保存生成的哈希值为json格式
        .pipe(dest("./rev/css"))
})

// sass
task("sass", async () => {
    src('./sass/*.scss')
        .pipe(load.sass()) //转化成css文件
        .pipe(load.rev())//给文件生成哈希值
        .pipe(load.minifyCss())//压缩css文件
        .pipe(dest("./dist/css"))
        .pipe(load.rev.manifest())//保存生成的哈希值为json格式
        .pipe(dest("./rev/css"))
})


task("js", async () => {
    src('./js/*.js')
        .pipe(load.rev())
        .pipe(load.babel({ presets: ['@babel/env'] }))
        .pipe(load.uglify())
        .pipe(dest("./dist/js"))
        .pipe(load.rev.manifest())
        .pipe(dest("./rev/js"))
})

task("img", async () => {
    src('./img/*.*')
        .pipe(dest('./dist/img'))
})

// 额外读取保存哈希值的json文件并替换路径
task("html", async () => {
    src(['./rev/**/*.json', "./html/*.html"]) //读取文件
        .pipe(load.revCollector({ replaceReved: true }))//替换路径
        .pipe(load.minifyHtml())
        .pipe(dest("./dist/"))
})

// 3.删除文件命令, 删除完以后才能执行其他, 所以需要同步执行
task('del', async () => {
    await del('./dist')
})


// 4. 启动服务,并控制自动刷新
task('connect', async () => {
    load.connect.server({
        root: './dist',
        livereload: true,
        port: 3001
    })
})

// 5. 组织构建生产包命令(删除-四种文件导出-启动服务)
task('build', series('del', 'sass','css', 'js', 'img', 'html', 'connect'))

