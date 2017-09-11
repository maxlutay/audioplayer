const process = require("process");
const fs = require("fs");
const path = require("path");

/** 
 *
 * please, require only once
 * !! uses global !!
 * 
 */

const defaultParams = {
    PORT: 8000
    ,BASE: process.cwd()
    ,FILE: "index.html"
};



global.procParams = Object.assign(defaultParams);


//log(">>>",process.argv,"<<<<<<<<");


if( !!process.argv[2] ){
    if( /^\d{4,5}$/g.test(process.argv[2]) ){
        global.procParams.PORT = +process.argv[2];
        if ( !!process.argv[3] ){
            fs.accessSync(global.procParams.BASE = path.resolve(global.procParams.BASE + process.argv[3].trim())
            );
        };
    }else {
        fs.accessSync(global.procParams.BASE = path.resolve(global.procParams.BASE + process.argv[2].trim())
        );
        log(global.procParams.BASE);
    };
    if( process.argv[3] && /^\d{4,5}$/g.test(process.argv[3]) ){
        global.procParams.PORT = +process.argv[3];
    }
    
};
//possibility of more proc args and more complex algo wuld b nidid




