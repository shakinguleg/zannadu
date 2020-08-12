console.log("启动开发版------------");
// 1. 导入所需模块
const { task, src, dest, watch, series, parallel } = require("gulp"); //结构解析gulp
const load = require('gulp-load-plugins')(); // 批量导入gulp的其他插件
const del = require('del');//node的del删除模块

//2. 导出文件命令

//2.1 导出html文件命令
task("html", async () => {
    src("./html/*.html")
        .pipe(dest("./dist/"))
        .pipe(load.connect.reload())
})

//2.2 导出css文件命令
// task("css", async () => {
//     src('./css/*.css')
//         .pipe(dest("./dist/css"))
//         .pipe(load.connect.reload())
// })

//导出css文件命令
task("sass", async () => {
    src('./sass/*.scss')
        .pipe(load.sass())
        .pipe(dest("./dist/css"))
        .pipe(load.connect.reload())
})





//2.3 导出js文件命令
task("js", async () => {
    src('./js/*.js')
        .pipe(dest("./dist/js"))
        .pipe(load.connect.reload())
})

// 2.4 导出img文件命令
task("img", async () => {
    src('./img/*.*')
        .pipe(dest('./dist/img'))
        .pipe(load.connect.reload())
})

// 3.删除文件命令, 删除完以后才能执行其他, 所以需要同步执行
task('del', async () => {
    await del('./dist')
})


// 4. 监听文件变化
task('watch', async () => {
    //series为串行任务, 发生错误后不可执行后续任务
    watch('./html/*.html', series('html'));
    watch('./sass/*.scss', series('sass'));
    watch('./js/*.js', series('js'));
    watch('./img/*.*', series('img'));
})

// 5. 启动服务,并控制自动刷新
task('connect', async () => {
    load.connect.server({
        root: './dist',
        // ip:'10.20.158.12' 默认localhost:8080
        livereload: true,//控制自动刷新, 通过connect.reload执行刷新动作
        port: 3000
    })
})

// 6. 组织构建开发包命令(删除-四种文件导出-启动服务-监听文件变化)
task('dev', series('del', 'html', 'sass', 'js', 'img', 'connect', 'watch'))

