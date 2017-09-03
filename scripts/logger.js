const logger = (...rest) =>{
    console.log.apply(null,[logger.stamp()].concat(rest) );
};


logger.stamp = () =>{
    const date = new Date();
    return `${date.toLocaleString()}\'${date.getMilliseconds()}\t- `;
};


logger.ret = (...rest) =>{
    console.log.apply(null,[logger.stamp()].concat(rest));
    return rest.length === 1 ? rest[0] : rest;
};

logger.q = (str,quo = `"`) => `${quo}${str}${quo}`;


module.exports = logger;