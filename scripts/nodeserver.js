const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const zip = require("zlib");
const process = require("process");
const log = require("./logger");


const defaultParams = {
    PORT: 8000
    ,BASE: process.cwd()
    ,FILE: "index.html"
};
let procParams = Object.assign(defaultParams);


//log(">>>",process.argv,"<<<<<<<<");


if( !!process.argv[2] ){
    if( /^\d{4,5}$/g.test(process.argv[2]) ){
        procParams.PORT = +process.argv[2];
    }else {
        fs.accessSync(procParams.BASE = 
            path.resolve(procParams.BASE + process.argv[2].trim())
        );
    };
    if( process.argv[3] && /^\d{4,5}$/g.test(process.argv[3]) ){
        procParams.PORT = +process.argv[3];
    }
    
};
//possibility of more proc args and more complex algo wuld b nidid

log("running on port ", log.q(procParams.PORT,`'`), " in directory ", log.q(procParams.BASE,`'`), " with start file ", log.q(procParams.FILE,`'`) );



const mimeFns = {
    "text": (ext) => ext != "js" ? "text/" + ext : "text/javascript"
    ,"image": (ext) => "image/" + ext
    ,undefined: () => undefined
};

const mimeTypes = {
    "html": "text"
    ,"jpg": "image"
    ,"jpeg":"image"
    ,"png": "image"
    ,"js":"text"
    ,"css":"text"
};




const servercallback = (clReq,seRes) => {
    let filepath = path.join( procParams.BASE ,url.parse(clReq.url).pathname.slice(1) || procParams.FILE );
    return new Promise(
        checkFile(filepath) //got function from factory
    ).then( ()  => 
        sendFile(seRes,filepath)
    ).catch(err => 
        sendError(seRes,err)
    );
};

function checkFile(somepath) {    
    return (resolve, reject) =>{
        fs.access(somepath,fs.constants.R_OK, err =>{
            if( err ){             
                log(`no such file or not available: ${somepath}. Got: ${err}  ` );
                reject(err);
                return;//prevent to run rest of code
            };
            if( !fs.lstatSync(somepath).isFile() ){             
                reject(new Error(`"${somepath}" is not a filename`));
                return;//
             };    
            resolve();
        });        
    };
};


function sendError(res,err){
    log(`got: ${err}`);
    res.writeHead(404,{"Content-Type": "text/plain"});
    res.write(`fatal error\n${err}`);
    if(!res.finished){ 
        res.end(); 
    };
};


function sendFile(res,filepath){
    return new Promise((resolve,reject) => {

        const ext = path.extname(filepath).slice(1);
        res.writeHead(200,{
            "Content-Type": mimeFns[mimeTypes[ext]](ext) || "text/plain",
            "Content-Encoding": "gzip"
        });

        const raw = fs.createReadStream(filepath);
        raw.pipe(zip.createGzip()).pipe(res);
        
        setImmediate(()=>{ //runs at the end of eventloop i.e. after i/o
            log("file sent: " + filepath);
            resolve();
            return;
        });
    });
};


//http.createServer expects similar function:
//"""
//function (req, res){
//    //code
//}
//"""

http.createServer(servercallback).listen( procParams.PORT );






