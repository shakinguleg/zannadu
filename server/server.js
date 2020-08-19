let http = require("http");
let url = require('url');
let fs = require("fs");

http.createServer((req, res) => {
    if (req.url === './favicon.ico') {
        return;
    }
    console.log("有请求进入");

    let urlObj = url.parse(req.url, true)
    if (urlObj.pathname == '/home/featured') {
        fs.readFile("./data/home/featured.json", "utf-8", function (err, data) {
            if (err) {
                throw err;
            }
            res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
            res.end(urlObj.query.getFeatured + '(' + data + ')');
        }
        )
    } 
    else {
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.end('错误');
    }
}).listen(3001, () => { console.log("开启服务器成功"); })