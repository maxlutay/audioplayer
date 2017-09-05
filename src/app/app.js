const Vue = require("vue/dist/vue.js");
require("./topping");
require("./player");
require("./feed");


var app = new Vue({
    el: ".app"
    ,data: {
        text: "audioplayer"
        ,logged: false
        ,logindata: {}
        ,cache: {}

    }
});

