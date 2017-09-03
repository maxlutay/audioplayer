const util = require("util");
const process = require("process");
const spawn = require("child_process").spawn;


//node ./scripts/pyserver.js 14000 childfoldername
//node ./scripts/pyserver.js 5000
//node ./scripts/pyserver.js childfoldername
//node ./scripts/pyserver.js
//are valid calls

// where '5000'(8000 is default) is a port
// 'childfoldername'("" is default) is child folder to serve from

util.log(">>>",process.argv,"<<<<<<<<");

let secondisport = !!process.argv[2] && /^\d{4,5}$/g.test(process.argv[2]);

let pyserver = spawn( "python"
    ,["-m","http.server", +
    secondisport ? process.argv[2] : 8000 ]
    ,{
      cwd: ((secondisport ? process.argv[3]  : process.argv[2]) || "").trim(),
      env: process.env,
      stdio: ["ignore",process.stdout, process.stdout]
    }
);
