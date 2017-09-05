/* const Vue = require("vue/dist/vue.js"); */


//Vue.component("timebar",
module.exports = 
{
    template:`
    <div class="progress"  @click.capture.stop="time($event)">
        <div class="progress__load" :style="{width:load}">
        </div>
        <div class="progress__play" :style="{width:play}"></div>
    </div>
`
    ,props: ['load'
            ,'play']
    ,methods:{
        time: function(event) {
            let rect = event.currentTarget.getBoundingClientRect();
            this.$emit("timeclick",event.x/rect.width);
        }
    }
}
//});
















