const process = require("process");
const fs = require("fs");
const path = require("path");
//const log = require("./logger");
/** 
 *
 * please, require only once
 * 
 */

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
        //log(procParams.BASE);
    };
    if( process.argv[3] && /^\d{4,5}$/g.test(process.argv[3]) ){
        procParams.PORT = +process.argv[3];
    }
    
};
//possibility of more proc args and more complex algo wuld b nidid

module.exports = () => procParams;


