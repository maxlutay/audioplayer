/* const Vue = require("vue/dist/vue.js"); */


//Vue.component("timebar",
module.exports = 
{
    template:`
    <div class="progress"  
         @mousedown.capture.stop="deciding=true"
         @mousemove.capture.stop="check($event)" 
         @mouseup.capture.stop="pick($event)" 
         ref="progressbar"
        >
        <div class="progress__current">{{toPercent(played) + "/" + toPercent(loaded)}}</div>
        <div class="progress__load" :style="{width:toPercent(loaded)}">
        </div>
        <div class="progress__play" :style="{width:toPercent(played)}"></div>
        <div class="progress__total">{{length}}</div>
    </div>`
    ,data:function() {
        return {
            deciding: false
            ,barwidth:-1
        };
    }
    ,props: ["loaded"
            ,"played"
            ,"length"
            ]
    ,beforeUpdate: function() {
        this.barwidth = this.$refs.progressbar.getBoundingClientRect().width;
        //console.log();
    }
    ,methods:{
        toPercent: (val)=> Math.round(val*100,0) + "%"
        ,pick: function(event) {
            this.deciding = false;
            this.$emit("timeset", event.x / this.barwidth );
        }
        ,check: function(event) {
            this.$emit("timetmp", event.x / this.barwidth );
        }

    }
}
//});
















