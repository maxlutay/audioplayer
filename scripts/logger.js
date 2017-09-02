const logger = (...rest) =>{
    console.log.apply(null,[logger.timestamp()].concat(rest) );
};


logger.timestamp = () =>{
    const date = new Date();
    return `${date.toLocaleString()}\'${date.getMilliseconds()} - `;
};


logger.return = (...rest) =>{
    console.log.apply(null,[logger.timestamp()].concat(rest));
    return rest.length === 1 ? rest[0] : rest;
};



module.exports = logger;