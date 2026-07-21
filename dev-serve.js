const http=require("http"),fs=require("fs"),path=require("path");
const root=__dirname,port=+(process.argv[2]||8123);
const MIME={".html":"text/html",".js":"text/javascript",".png":"image/png",".mp3":"audio/mpeg",".json":"application/json",".md":"text/plain"};
http.createServer((req,res)=>{
const u=decodeURIComponent(req.url.split("?")[0]);
let f=path.normalize(path.join(root,u==="/"?"index.html":u));
if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);res.end();return;}
const type=MIME[path.extname(f).toLowerCase()]||"application/octet-stream";
const size=fs.statSync(f).size,range=req.headers.range;
if(range){
const m=range.match(/bytes=(\d*)-(\d*)/);
const a=m&&m[1]?+m[1]:0,b=m&&m[2]?+m[2]:size-1;
res.writeHead(206,{"Content-Type":type,"Content-Range":"bytes "+a+"-"+b+"/"+size,"Accept-Ranges":"bytes","Content-Length":b-a+1});
fs.createReadStream(f,{start:a,end:b}).pipe(res);
}else{
res.writeHead(200,{"Content-Type":type,"Content-Length":size,"Accept-Ranges":"bytes"});
fs.createReadStream(f).pipe(res);
}
}).listen(port,()=>console.log("serving "+root+" on http://localhost:"+port));
