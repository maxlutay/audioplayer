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
        ,wind:{
            state: false
            ,x:0
        }
        ,title:"mUsic"

    }
    ,methods:{
        onmm:function(e) {
            if(this.wind.state){
               this.wind.x = e.x;
            };
        }
        ,onmu:function() {
            this.wind.state = false;
        }
    }
});


//wind 
app.$on("wind",function(){ 
    this.wind.state = true;
 });