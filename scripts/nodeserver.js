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
        if ( !!process.argv[3] ){
            fs.accessSync(procParams.BASE = path.resolve(procParams.BASE + process.argv[3].trim())
            );
        };
    }else {
        fs.accessSync(procParams.BASE = path.resolve(procParams.BASE + process.argv[2].trim())
        );
        log(procParams.BASE);
    };
    if( process.argv[3] && /^\d{4,5}$/g.test(process.argv[3]) ){
        procParams.PORT = +process.argv[3];
    }
    
};
//possibility of more proc args and more complex algo wuld b nidid

log("running on port ", log.q(procParams.PORT,`'`), " in directory ", log.q(procParams.BASE,`'`), " with start file ", log.q(procParams.FILE,`'`) );




const mimes = {
    "html": fileSimple.bind(null,"text/html")
    ,"jpg": fileSimple.bind(null,"image/jpg")
    ,"jpeg":fileSimple.bind(null,"image/jpeg")
    ,"png": fileSimple.bind(null,"image/png")
    ,"js":  fileSimple.bind(null,"text/javascript")
    ,"css": fileSimple.bind(null,"text/css")
    ,"mp3": fileMedia.bind(null,"audio/mpeg")
};




const servercallback = (clReq,seRes) => {
    let filepath = path.join( procParams.BASE ,decodeURI(url.parse(clReq.url).pathname.slice(1)) || procParams.FILE );
    return new Promise(
        checkFile(filepath) //got function from factory
    ).then( (stat)  => sendFile(
                        Object.assign({path:filepath},stat)
                        ,seRes
                        ,clReq
                        )
    ).catch(err => 
        sendError(seRes,err)
    );
};

function checkFile(somepath) {
    let lstatobj = null;    
    return (resolve, reject) =>{
        fs.access(somepath,fs.constants.R_OK, err =>{            
            if( err ){             
                log(`no such file or not available: ${somepath}. Got: ${err}  ` );
                reject(err);
                return;//prevent to run rest of code
            };


            if( !(lstatobj = fs.lstatSync(somepath)).isFile() ){             
                reject(new Error(`"${somepath}" is not a filename`));
                return;//
             };    
            resolve(lstatobj);
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



function sendFile(stat,res,req){
    return new Promise((resolve,reject) => {
        const ext = path.extname(stat.path).slice(1);
        
        mimes[ext](stat,res,req);


        setImmediate(()=>{ //runs at the end of eventloop i.e. after i/o
            log("file sent: " + stat.path);
            resolve();
            return;
        });
    });
};



function fileSimple (ct,statsf,res,req) {

    const raw = fs.createReadStream(statsf.path);
    res.writeHead(200,{
        "Content-Type": ct
        ,"Content-Encoding": "gzip"
    });

    raw
    .pipe(zip.createGzip())
    .pipe(res);
};


function parseHttpRange (rangestr) {
    return  !rangestr   ? 
            []          :
            rangestr.trim()
                    .replace("bytes=","")
                    .split("-")
                    .map( s =>+s );
};

function fileMedia (ct,statsf,res,req) {
    let [frombyte, tobyte ] = parseHttpRange(req.headers.range );
    frombyte = frombyte || 0 ;
    tobyte   = tobyte   || statsf.size - 1 ;

    const raw = fs.createReadStream(statsf.path ,{start : frombyte 
                                                  ,end  : tobyte 
                                                  });
    res.writeHead(206,{
        "Content-Type": ct
        ,"Content-Range": `bytes ${frombyte}-${tobyte}/${statsf.size}`
        ,"Accept-Ranges":"bytes"
        ,"Content-Size": "" + tobyte - frombyte
    });


    raw
    .pipe(res);
    return;

};    

 



//http.createServer expects similar function:
//"""
//function (req, res){
//    //code
//}
//"""

http.createServer(servercallback).listen( procParams.PORT );






