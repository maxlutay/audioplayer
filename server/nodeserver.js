//system
const http = require("http");
const url = require("url");

//

//custom
const procParams = require("./params")();
const log = require("./logger");
const filecallback = require("./static");
const apicallback = require("./api");
//


const routes = {
    "file":filecallback
    ,"api": apicallback
    //,"db": dbcallback
}



const router = (clReq, seRes) => {

    return  ( routes [decodeURI(
        url.parse(clReq.url).pathname.slice(1).split("/")[0]
                    )] 
            || filecallback ).call(null,clReq,seRes); 
};




log("running on port ", log.q(procParams.PORT,`'`), " in directory ", log.q(procParams.BASE,`'`), " with start file ", log.q(procParams.FILE,`'`) );



//http.createServer expects similar function:
//"""
//function (req, res){
//    //code
//}
//"""

http.createServer(router).listen( procParams.PORT );






