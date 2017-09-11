//system
const http = require("http");
const url = require("url");

//

//custom
require("./params");
const log = require("./logger");
const filecallback = require("./static");
const apicallback = require("./api");
//


const routes = {
    "file":filecallback
    ,"api": apicallback
}



const router = (clReq, seRes) => {

    return  (routes[decodeURI(url.parse(clReq.url)
        .pathname
        .slice(1)
        .split("/")[0]
    )]|| filecallback).call(null,clReq,seRes); 
};




log("running on port ", log.q(global.procParams.PORT,`'`), " in directory ", log.q(global.procParams.BASE,`'`), " with start file ", log.q(global.procParams.FILE,`'`) );



//http.createServer expects similar function:
//"""
//function (req, res){
//    //code
//}
//"""

http.createServer(router).listen( global.procParams.PORT );






