const Vue = require("vue/dist/vue.js");



Vue.component("player",{
    template: `
        <div class="player" @mouseenter="bold=true" @mouseleave="bold=false">
            <timebar class="player__timeline" :class="{player__timeline_hovered:bold}"  :load="toStrPercentage(load)" :play="toStrPercentage(play)"  @timeclick="start"></timebar>
            <div class="player__controls">
            </div>

            <audio class="player__core"></audio>
        </div>
    `
    ,components: {
        timebar: require("./timebar")        
    }
    ,data: function(){
        return {
            trackid:0
            ,length:"5:46"
            ,load: 0.5
            ,play:0.2
            ,albumid:0
            ,bold:false
        };
    }
    ,methods: {
        toStrPercentage: (num) => num*100 + '%'
        ,percentage: (val,base) => val/base
        ,start: () => {
            let player = document.querySelector("audio");
            let src;

        }
        ,start:function(percent) {
            console.log(percent);
            console.log("play");
        }
    }
});
