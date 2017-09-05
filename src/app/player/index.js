const Vue = require("vue/dist/vue.js");



Vue.component("player",{
    template: `
        <div class="player" 
            @mouseenter="bold=true" 
            @mouseleave="bold=false"
            >
            <timebar class="player__timeline" 
                    :class="{player__timeline_hovered:bold}"
                    :loadprogress="toStrPercentage(loadprogress)"
                    :playprogress="toStrPercentage(playprogress)"
                    :length="tracklength"
                    @timeclick="start"
                    >
            </timebar>
            <div class="player__controls">
            </div>
            <audio class="player__core"></audio>
        </div>
    `
    ,components: {
        timebar: require("./timebar")        
    }
    ,props: [
        ""
    ]
    ,data: function(){
        return {
            trackid:0
            ,tracklength:"0:00"//should be data structure time
            ,loadprogress: 0
            ,playprogress:0
            ,albumid:0
            ,bold:false
        };
    }
    ,methods: {
        toStrPercentage: (num) => (num*100).toFixed(2) + "%"
        ,percentage: (val,base) => val/base
        ,start:function(percent) {
            this.playprogress = percent;
            console.log(`playing from ${percent}`);
            //link percent to time
        }
        ,load:function(url) {
            console.log(`loading ${url}`);
        }
    }
});
