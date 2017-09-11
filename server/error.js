const log = require("./logger.js");



function sendError(res,err){
    log(`got: ${err}`);
    res.writeHead(404,{"Content-Type": "text/plain"});
    res.write(`fatal error\n${err}`);
    if(!res.finished){ 
        res.end(); 
    };
};


module.exports = sendError;