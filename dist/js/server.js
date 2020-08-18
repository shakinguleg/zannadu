let http = require("http");
let url = require('url');
let fs = require("fs");

http.createServer((req,res)=>{
    if(req.url==='./favicon.ico'){
        return;
    }
    console.log("有请求进入");

    let urlObj = url.parse(req.url, true)
    if(urlObj.pathname == '/home/featured'){
        res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});
        res.end(urlObj.query.cb + '({ "a": "123", "b": "456" })');
    }else {
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.end('错误');
      }
}).listen(3001, ()=>{console.log("开启服务器成功");})