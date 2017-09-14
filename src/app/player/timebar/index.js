/* const Vue = require("vue/dist/vue.js"); */


//Vue.component("timebar",
module.exports = 
{
    template:`
    <div class="progress"  
         @mousedown.capture.stop="wind"
        >
        <div class="progress__current">{{current + "=" +toPercent(played) + "/" + toPercent(loaded)}}</div>
        <div class="progress__load" :style="{width:toPercent(loaded)}">
        </div>
        <div class="progress__play" :style="{width:toPercent(played)}"></div>
        <div class="progress__total">{{length}}</div>
    </div>`
    ,props: ["loaded"
            ,"played"
            ,"length"
            ,"current"
            ]
    ,methods:{
        toPercent: (val)=> (Math.round(val*1000)/10 + "%")
        ,wind:function() {
            this.$root.$emit("wind");
        }
    }
}
//});
















