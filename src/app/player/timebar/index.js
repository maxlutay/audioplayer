/* const Vue = require("vue/dist/vue.js"); */


//Vue.component("timebar",
module.exports = 
{
    template:`
    <div class="progress"  @click.capture.stop="time($event)">
        <div class="progress__current">{{playprogress}}</div>
        <div class="progress__load" :style="{width:loadprogress}">
        </div>
        <div class="progress__play" :style="{width:playprogress}"></div>
        <div class="progress__total">{{length}}</div>
    </div>`
    ,props: ["loadprogress"
            ,"playprogress"
            ,"length"
            ]
    ,methods:{
        time: function(event) {
            let rect = event.currentTarget.getBoundingClientRect();
            this.$emit("timeclick", event.x / rect.width);
        }
    }
}
//});
















