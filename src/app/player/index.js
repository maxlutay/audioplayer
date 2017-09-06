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
            <div class="player__controls player__controls_left">
                <prev event="prev" 
                      @prev="track=(track < 1 ? 
                              list.length - 1 :
                                        track-1)">
                </prev>

                <pause event="pausetoggle" 
                       @pausetoggle="pause=!pause" >a
                </pause>
                <next  event="next"
                       @next="track=(track > list.length - 2 ? 
                                                            0 :
                                                     track + 1 )">
                </next>
            </div>
            <div class="player__track">
            </div>
            <div class="player__controls player__controls_right">
                <mix event="mixtoggl"></mix>
                <repeat event="repeattoggl"></repeat>
                <volume event="mute"></volume>
            </div>
            <audio class="player__core"></audio>
        </div>
    `
    ,components: {
        timebar:require("./timebar")
        ,prev:  require("./control")
        /* ,play:  require("./control") */
        ,pause: require("./control")
        ,next:  require("./control")
        ,mix:   require("./control")
        ,repeat:require("./control")
        ,volume:require("./control")

    }
/*     ,props: [
        ""
    ] */
    ,data: function(){
        return {
            track:0
            ,tracklength:"0:00"//should be data structure time
            ,loadprogress: 0.2
            ,playprogress:0
            ,albumid:0
            ,bold:false
            ,pause:true
            ,list:["1000","5231","4589","9145"]
        };
    }
    ,methods: {
        toStrPercentage: (num) => (num*100).toFixed(2) + "%"
        ,percentage: (val,base) => val/base
        ,start:function(percent/* ,id */) {
            this.pause = false;            
            this.playprogress = percent;
  //          this.track = !!id ? this.track : id;

            console.log(`playing from ${percent} track ${this.track}`);
            //link percent to time
        }
        ,load:function(url) {
            console.log(`loading ${url}`);
        }

        
        ,log:(...arg) => console.log.call(null,arg.join())
    }
});
